import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true
    },
    password : String,
    role : String, //orgainzer , participant
    events : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Event"
        }
    ]
})
export const User = mongoose.model("User" , userSchema)