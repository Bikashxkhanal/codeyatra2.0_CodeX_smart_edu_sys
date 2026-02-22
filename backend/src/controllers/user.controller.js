import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { UserModel } from "../models/user.model.js";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    // console.log(user, "From access and refresh token");
    // console.log(user);

    const accessToken = await user.generateAccessToken();
   
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    
    throw new ApiError(500, "Cannot generate refresh and access token");
  }
};

//only admin can create user
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validates the details
  //checks all required field are added or not
  //create an user object
  //save the entry in db
  //check the entry
  //return the rrquired data, filtering the data that should not be send like (password,  refresh token ) etc

  //input from fronted
  const { fullName, username, email, password , role} = req.body;
  if (fullName === "") throw new ApiError(400, "Full name is required");

  //validation part
  if (
    [fullName, username, email, password, role]?.some((entry) => entry.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check the user existance
  const existedUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  console.log(existedUser);
  

  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  if(role === 'admin'){ //currently hardcoded 
    throw new ApiError(400, "Cannot create user");
  }


    await UserModel.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    role,
  });


  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User created successfully"));
});


const loginUser = asyncHandler(async (req, res) => {
  //user data from fronted req-> body == data
  //username or email login
  //validates data
  //check the user existance in the db
  //if user exist check password
  //if valid , create an access token and refresh token ,
  //pass the access & refresh token with the user and save the refresh token in the db
  //send  cookies
  //grant login with response


  const { email, password } = req.body;
  if (!email || !password ) {
    throw new ApiError(400, "Email and password both required");
  }
  

  const user = await UserModel.findOne({
    email
  });


  if (!user) {
    throw new ApiError(404, "No user of such detail");
  }
  const status = await user.isPasswordCorrect(password);

  if (status === false) {
    throw new ApiError(401, "Invalid user credintials");
  }

  console.log(status);
  

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );


  const loggedUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log(loggedUser);
  

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "User loggedin successfully!"
      )
    );
});



const logoutUser = asyncHandler(async (req, res) => {
  await UserModel.findByIdAndUpdate(req.user?._id, {
    $set: {
      refreshToken: undefined,
    },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req?.cookies?.refreshToken || req?.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorised request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedToken) {
    throw new ApiError(401, "Invalid request token");
  }

  const user = await UserModel.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "Invalid request token");
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "refresh token is expired");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user?._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token generated successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userId: req?.user?._id },
        "User retrieved successfully"
      )
    );
});


export {
    registerUser, 
    loginUser, 
    getCurrentUser,
    logoutUser, 
    refreshAccessToken,

}