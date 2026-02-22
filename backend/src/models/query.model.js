import mongoose, {Schema} from "mongoose";

const querySchema = new Schema(
    {
        owner : {
            type : Schema.Types.ObjectId,
            required : true,
        }, 
         title : {
        type : String, 
        required : true,
    },

     discription :   {
        type : String, 
        required  : true
    }, 

    responseders : [
        {
            type : Schema.Types.ObjectId,
        }
    ]
    } 
    ,{
        timestamps : true,
    }
)

export const QueryModel = mongoose.model("Query", querySchema);