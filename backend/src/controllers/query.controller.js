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

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const skip = (page - 1) * limit;
    const sortOption = sort === "asc" ? 1 : -1;

    const queries = await QueryModel.aggregate([

        //  Sortring first
        { $sort: { createdAt: sortOption } },

        // Lookup Owner of the query
        {
            $lookup: {
                from: "users", // collection name in MongoDB
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        { $unwind: "$owner" },

        // Lookup Responses of the query
        {
            $lookup: {
                from: "queryresponses",
                localField: "_id",
                foreignField: "query",
                as: "responses"
            }
        },

        // looking  Response Owners 
        {
            $lookup: {
                from: "users",
                localField: "responses.owner",
                foreignField: "_id",
                as: "responseOwners"
            }
        },

        // Adding response owner details manually
        {
            $addFields: {
                responses: {
                    $map: {
                        input: "$responses",
                        as: "response",
                        in: {
                            _id: "$$response._id",
                            discription: "$$response.discription",
                            createdAt: "$$response.createdAt",
                            owner: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$responseOwners",
                                            as: "ro",
                                            cond: { $eq: ["$$ro._id", "$$response.owner"] }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            }
        },

  
        {
            $project: {
                responseOwners: 0
            }
        },

        //for Pagination + Count
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
        }, "All queries fetched successfully")
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