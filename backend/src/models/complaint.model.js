import mongoose, {Schema, Types} from "mongoose";

const ComplaintSchema = new Schema(
    {
        owner : {
             type : Schema.Types.ObjectId,
            ref : "User",
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
    status : {
        type : String, 
        enum : ['resolved', 'onprogress', 'pending'],
        default : 'pending', 
    },

    responseBy : {
         type : Schema.Types.ObjectId,
            ref : "User",
    },

    response : {
        type : String,
    }
    }
    , {
        timestamps : true,
    }
)


export const ComplaintModel = mongoose.model("Complaint", ComplaintSchema);