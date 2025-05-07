import mongoose from "mongoose";

const studentPaymentSchema= new mongoose.Schema({
    sid:{
        type:String,
        required:true,
        trim:true
    },
    s_name:{
        type:String,
        required:true,
        trim:true
    },
    month:{
        type:String,
        required:true,
        enum:["January","February","March","April","May","June","July","August","September","October","November","December"]
    },
    year:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    }
    
})

const StudentPayment = mongoose.model("studentPayment", studentPaymentSchema);
export default StudentPayment;
