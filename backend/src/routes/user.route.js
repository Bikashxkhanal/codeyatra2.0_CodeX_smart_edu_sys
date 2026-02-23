import { Router } from "express";
import { loginUser, registerUser, getCurrentUser, logoutUser, getCounts, getAllUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter =new Router();

//route for logging into the system
userRouter.route('/login').post(loginUser);

//protected routes
userRouter.route('/logout').post(verifyJWT, logoutUser);
userRouter.route('/register').post( registerUser);
userRouter.route('/me').get(verifyJWT, getCurrentUser);
userRouter.route('/stats').get(verifyJWT, getCounts);
userRouter.route('/all').get(verifyJWT, getAllUser);



export default userRouter;