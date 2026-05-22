import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tutorId: String,

  tutorName: String,

  studentName: String,

  studentEmail: String,

  phone: String,

  sessionToken: String,

  bookingStatus: {
    type: String,
    default: "active"
  },

  bookedAt: {
    type: Date,
    default: Date.now
  },

  sessionDate: Date
});

export default mongoose.model("Booking", bookingSchema);