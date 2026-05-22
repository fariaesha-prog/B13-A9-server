import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  photoURL: {
    type: String
  },

  password: {
    type: String
  },

  role: {
    type: String,
    default: "student"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);