import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: "user"
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
})


const User= mongoose.model("Users", userSchema);

export default User