import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { collaborationModel } from "../models/collaboration.model.js";
import mongoose from "mongoose";
import {UserModel} from '../models/user.model.js'

//takes title and description from the req.body and req.user._id (the logged in userId)
const createCollaboration = asyncHandler(async (req, res) => {
  const { title, discription } = req.body;

  if (!title || !discription) {
    throw new ApiError(400, "Title and description are required");
  }

  const collaboration = await collaborationModel.create({
    owner: req.user._id,
    title,
    discription,
    collaborators: [],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { collaboration }, "Collaboration created successfully!"));
});

//receives collaboration id from req.params
const deleteCollaborattion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const collaboration = await collaborationModel.findById(id);

  if (!collaboration) {
    throw new ApiError(404, "Collaboration not found");
  }

  // Only owner can delete
  if (collaboration.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this collaboration");
  }

  await collaboration.remove();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Collaboration deleted successfully"));
});

//receives collaboration id from req.params, and title or description any one or both req.body, and userid from req.user._id
const updateCollaboration = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, discription } = req.body;

  const collaboration = await collaborationModel.findById(id);
  if (!collaboration) {
    throw new ApiError(404, "Collaboration not found");
  }

  // Only owner can update
  if (collaboration.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this collaboration");
  }

  if (title) collaboration.title = title;
  if (discription) collaboration.discription = discription;

  await collaboration.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { collaboration }, "Collaboration updated successfully"));
});

//receives collaboration id from req.params, and returns the collaboration details with author with owner details: username and fullName only

// const getACollaboration = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // 1. Validation Guard
//   // This prevents the BSONError crash by checking the string format first
//   if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//     throw new ApiError(400, "Invalid Collaboration ID format");
//   }

//   const collaboration = await collaborationModel.aggregate([
//     { 
//       // Safe to convert now that we validated above
//       $match: { _id: new mongoose.Types.ObjectId(id) } 
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "owner",
//         foreignField: "_id",
//         as: "ownerDetails",
//       },
//     },
//     { 
//       // Preserve document even if owner is missing from users collection
//       $unwind: {
//         path: "$ownerDetails",
//         preserveNullAndEmptyArrays: true
//       } 
//     },
//     {
//       $project: {
//         title: 1,
//         discription: 1,
//         collaborators: 1,
//         // Flattening the owner structure for a cleaner API response
//         owner: {
//           username: "$ownerDetails.username",
//           fullName: "$ownerDetails.fullName",
//         },
//         createdAt: 1,
//         updatedAt: 1,
//       },
//     },
//   ]);

//   // 2. Result Check
//   if (!collaboration || collaboration.length === 0) {
//     throw new ApiError(404, "Collaboration not found");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, collaboration[0], "Collaboration fetched successfully"));
// });


const getAllCollaboration = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = Math.max(1, parseInt(page));
  limit = Math.max(1, parseInt(limit));
  const skip = (page - 1) * limit;

  const result = await collaborationModel.aggregate([
    // 1. DATA GUARD: Ignore documents with malformed owner IDs to prevent BSONError
    {
      $match: {
        owner: { $type: "objectId" } 
      }
    },

    // 2. Sort by latest
    { $sort: { createdAt: -1 } },

    // 3. Simple Lookup
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails"
      }
    },

    // 4. Flatten the ownerDetails array
    { 
      $unwind: {
        path: "$ownerDetails",
        preserveNullAndEmptyArrays: true 
      }
    },

    // 5. Project ONLY title, description, and owner info
    {
      $project: {
        _id: 1,
        title: 1,
        discription: 1,
        createdAt: 1,
        owner: {
          fullName: "$ownerDetails.fullName",
          username: "$ownerDetails.username"
        }
      }
    },

    // 6. Pagination
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: limit }]
      }
    }
  ]);

  const total = result[0]?.metadata[0]?.total || 0;
  const collaborations = result[0]?.data || [];

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        collaborations,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      "Collaborations fetched successfully"
    )
  );
});
const getAllOwnerCollaboration = asyncHandler(async (req, res) => {

  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;

  const skip = (page - 1) * limit;

 //admin doesnot have any collaboration 
  if (req.user.role === "admin") {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          collaborations: [],
          page,
          limit,
          totalPages: 0,
          total: 0
        },
        "Admins have no collaborations"
      )
    );
  }

  const result = await collaborationModel.aggregate([

    // Matching  owner
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id)
      }
    },

    // Sorting by latest first
    { $sort: { createdAt: -1 } },

    // Lookuup owner
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner"
      }
    },
    { $unwind: "$owner" },

    // Projecting only required fields
    {
      $project: {
        title: 1,
        description: 1,
        createdAt: 1,
        owner: {
          _id: "$owner._id",
          username: "$owner.username",
          fullName: "$owner.fullName"
        }
      }
    },

    // pagination
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $skip: skip },
          { $limit: limit }
        ]
      }
    }

  ]);

  const total = result[0].metadata[0]?.total || 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        collaborations: result[0].data,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total
      },
      "Owner collaborations fetched successfully"
    )
  );
});

export {
  createCollaboration,
  deleteCollaborattion,
  updateCollaboration,
//   getACollaboration,
  getAllCollaboration,
  getAllOwnerCollaboration,
};