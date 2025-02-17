import mongoose from "mongoose";

const subjectSchema= new mongoose.Schema({
    subid:{
        type:String,
        requierd:true,
        unique:true
    },
    sub_name:{
        type:String,
        requierd:true,

    },
    fee:{
        type:Number,
        requierd:true
    }
    
    

})

const Subject= mongoose.model("Subject",subjectSchema)

export default Subject