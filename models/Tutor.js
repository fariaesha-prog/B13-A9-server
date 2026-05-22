import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  tutorName: String,

  tutorEmail: String,

  tutorPhoto: String,

  subject: String,

  availableDays: [String],

  startTime: String,

  endTime: String,

  hourlyFee: Number,

  totalSlot: Number,

  sessionStartDate: Date,

  institution: String,

  experience: String,

  location: String,

  teachingMode: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Tutor", tutorSchema);