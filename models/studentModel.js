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
    }


})

const Student= mongoose.model("Student",studentSchema)

export default Student