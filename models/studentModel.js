import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
    sid:{
        type:String,
        requierd:true,
        unique:true
    },
    s_name:{
        type:String,
        requierd:true,

    },
    s_image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    },
    s_address:{
        type:String,
        requierd:true
    },
    s_age:{
        type:Number,
        requierd:true
    },
    s_dob:{
        type:Date,
        requierd:true
    },
    s_school:{
        type:String,
        requierd:true
    },
    parent_name:{
        type:String,
        requierd:true
    },
    tp_no:{
        type:String,
        requierd:true
    },
    watsapp_no:{
        type:String,
        requierd:true
    },
    isActive:{
        type:Boolean,
        
    }


})

const Student= mongoose.model("Student",studentSchema)

export default Student