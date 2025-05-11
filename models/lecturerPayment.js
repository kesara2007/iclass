import mongoose from "mongoose";

const lecturerPaymentSchema = new mongoose.Schema({
  lid: {
    type: String,
    required: true,
    trim: true
  },
  l_name: {
    type: String,
    required: true,
    trim: true
  },
  subid: {  
    type: String,
    required: true,
    trim: true
  },
  month: {
    type: String,
    required: true,
    enum: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
  },
  year: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {  
    type: Date,
    required: true,
    default: Date.now  
  }
});

export default mongoose.model("LecturerPayment", lecturerPaymentSchema);