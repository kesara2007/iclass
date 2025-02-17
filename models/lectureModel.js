import mongoose from "mongoose";

const lectureSchema= new mongoose.Schema({
    lid:{
        type:String,
        requierd:true,
        unique:true
    },
    lec_name:{
        type:String,
        requierd:true,

    },
    lec_address:{
        type:String,
        requierd:true
    },
    lec_qualification:{
        type:String,
        requierd:true
    },
    lec_tpNo:{
        type:String,
        requierd:true
    },
    lec_accNo:{
        type:String,
        requierd:true
    }
    

})

const Lecturer= mongoose.model("Lecture",lectureSchema)

export default Lecturer