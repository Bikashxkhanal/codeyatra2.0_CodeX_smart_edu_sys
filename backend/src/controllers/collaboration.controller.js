import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { collaborationModel } from "../models/collaboration.model";
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
const getACollaboration = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const collaboration = await collaborationModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    { $unwind: "$ownerDetails" },
    {
      $project: {
        title: 1,
        discription: 1,
        collaborators: 1,
        "ownerDetails.username": 1,
        "ownerDetails.fullName": 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  if (!collaboration.length) throw new ApiError(404, "Collaboration not found");

  return res
    .status(200)
    .json(new ApiResponse(200, collaboration[0], "Collaboration fetched successfully"));
});

//receives const { page = 1, limit = 10 } = req.query, must return all the collaborations based on the query, order by the latest createdTime
const getAllCollaboration = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const collaborations = await collaborationModel
    .find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("owner", "username fullName");

  const total = await collaborationModel.countDocuments();

  return res.status(200).json(
    new ApiResponse(
      200,
      { collaborations, page, limit, totalPages: Math.ceil(total / limit) },
      "Collaborations fetched successfully"
    )
  );
});

//receives const { page = 1, limit = 10 } = req.query, must return all the collaboration based on the query, check the logged in user, if admin no collaboration, if teacher or students, get all the collaboration, order by the latest createdTime
const getAllOwnerCollaboration = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  if (req.user.role === "admin") {
    return res
      .status(200)
      .json(new ApiResponse(200, { collaborations: [] }, "Admins have no collaborations"));
  }

  const collaborations = await collaborationModel
    .find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("owner", "username fullName");

  const total = await collaborationModel.countDocuments({ owner: req.user._id });

  return res.status(200).json(
    new ApiResponse(
      200,
      { collaborations, page, limit, totalPages: Math.ceil(total / limit) },
      "Owner collaborations fetched successfully"
    )
  );
});

export {
  createCollaboration,
  deleteCollaborattion,
  updateCollaboration,
  getACollaboration,
  getAllCollaboration,
  getAllOwnerCollaboration,
};