import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { QueryModel } from "../models/query.model.js";
import { QueryResponseModel } from "../models/queryResponse.model.js";


const createQuery = asyncHandler(async (req, res) => {

    const { title, discription } = req.body;

    if (!title || !discription) {
        throw new ApiError(400, "Title and description are required");
    }

    const query = await QueryModel.create({
        owner: req.user._id,
        title,
        discription,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, query, "Query created successfully"));
});



const getAllQuery = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, sort = "desc" } = req.query;

    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));

    const skip = (page - 1) * limit;
    const sortOption = sort === "asc" ? 1 : -1;

    const result = await QueryModel.aggregate([
        // 1. Sort by newest first
        { $sort: { createdAt: sortOption } },

        // 2. Join with Users collection
        {
            $lookup: {
                from: "users", // Double check this name in MongoDB Compass
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails"
            }
        },

        // 3. Convert ownerDetails array to object
        { 
            $unwind: {
                path: "$ownerDetails",
                preserveNullAndEmptyArrays: true // Prevents query from vanishing if user is deleted
            }
        },

        // 4. Select only needed fields
        {
            $project: {
                title: 1,
                discription: 1,
                createdAt: 1,
                owner: {
                    fullName: "$ownerDetails.fullName",
                    username: "$ownerDetails.username",
                    role: "$ownerDetails.role"
                }
            }
        },

        // 5. Facet for Metadata and Data
        {
            $facet: {
                metadata: [{ $count: "total" }],
                data: [{ $skip: skip }, { $limit: limit }]
            }
        }
    ]);

    const total = result[0]?.metadata[0]?.total || 0;
    const queries = result[0]?.data || [];

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                queries
            },
            "Queries fetched successfully"
        )
    );
});


const getAllCurrentUserQuery = asyncHandler(async (req, res) => {

    let { page = 1, limit = 10, sort = "desc" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const skip = (page - 1) * limit;
    const sortOption = sort === "asc" ? 1 : -1;

    const queries = await QueryModel.aggregate([

        {
            $match: {
                owner: new mongoose.Types.ObjectId(req.user._id)
            }
        },

        { $sort: { createdAt: sortOption } },

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

    const total = queries[0].metadata[0]?.total || 0;

    return res.status(200).json(
        new ApiResponse(200, {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: queries[0].data
        }, "User queries fetched successfully")
    );
});


const addAResponse = asyncHandler(async (req, res) => {

    const { queryId } = req.params;
    const { discription } = req.body;

    if (!mongoose.Types.ObjectId.isValid(queryId)) {
        throw new ApiError(400, "Invalid Query ID");
    }

    if (!discription) {
        throw new ApiError(400, "Response description is required");
    }

    const query = await QueryModel.findById(queryId);

    if (!query) {
        throw new ApiError(404, "Query not found");
    }

   
    const response = await QueryResponseModel.create({
        owner: req.user._id,
        discription,
        query: queryId
    });


    if (!query.responseders.includes(req.user._id)) {
        query.responseders.push(req.user._id);
        await query.save();
    }

    return res
        .status(201)
        .json(new ApiResponse(201, response, "Response added successfully"));
});



export {
    createQuery,
    getAllQuery,
    getAllCurrentUserQuery,
    addAResponse
};