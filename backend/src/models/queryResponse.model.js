import mongoose, {Schema} from "mongoose";

const queryResponseSchema = new Schema(
    {
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true,
        }, 
        discription : {
              type : String, 
        required  : true
        },

        query : {
    type : Schema.Types.ObjectId,
    ref : "Query",
    required : true
}

    },

     {timestamps : true}
)


export const QueryResponseModel = mongoose.model("QueryResponse", queryResponseSchema);
