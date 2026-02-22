import mongoose, {Schema} from "mongoose";

const queryResponseSchema = new Schema(
    {
        owner : {
            type : Schema.Types.ObjectId,
            required : true,
        }, 
        discription : {
              type : String, 
        required  : true
        }

    },

     {timestamps : true}
)


export const QueryResponseModel = mongoose.model("QueryResponse", queryResponseSchema);
