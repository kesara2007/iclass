import mongoose from "mongoose";

const classroomSchema= new mongoose.Schema({
    classid:{
        type:String,
        requierd:true,
        unique:true
    },
    class_name:{
        type:String,
        requierd:true,

    },
    lec_name:{
        type:String,
        requierd:true
    },
    no_of_students_allocated:{
        type:Number,
        requierd:true
    }
    
    

})

const ClassRoom= mongoose.model("ClassRoom",classroomSchema)
export default ClassRoom