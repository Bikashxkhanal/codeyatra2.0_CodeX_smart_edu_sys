import mongoose, { Schema } from "mongoose";


const collaborationSchema = new Schema({
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
   collaborators : [
        {
            type : Schema.Types.ObjectId
        }
   ]


}, { timestamps: true,})


export const collaborationModel = mongoose.model("Collaboration", collaborationSchema);