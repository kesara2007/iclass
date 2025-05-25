import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
});

export default mongoose.model("School", schoolSchema);
