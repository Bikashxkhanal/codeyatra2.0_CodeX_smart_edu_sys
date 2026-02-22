import mongoose, { Schema } from "mongoose";


const collaborationSchema = new Schema({
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
   collaborators : [
        {
            type : Schema.Types.ObjectId,
            ref : "User",
        }
   ]


}, { timestamps: true,})


export const collaborationModel = mongoose.model("Collaboration", collaborationSchema);