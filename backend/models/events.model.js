import mongoose from "mongoose";
const eventSchema = mongoose.Schema({
    title : String,
    description : String,
    image_url : String,
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status : String,
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
}, { timestamps: true })

export const Event = mongoose.model("Event" , eventSchema);