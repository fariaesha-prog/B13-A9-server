import express from "express";

import verifyJWT from "../middleware/verifyJWT.js";

import {
  addTutor,
  getAllTutors,
  getHomeTutors,
  getSingleTutor,
  updateTutor,
  deleteTutor,
  searchTutors,
  getMyTutors
} from "../controllers/tutorController.js";

const router = express.Router();

router.get("/", getAllTutors);

router.get("/home", getHomeTutors);

router.get("/search", searchTutors);

router.get("/my-tutors", verifyJWT, getMyTutors);

router.get("/:id", getSingleTutor);

router.post("/", verifyJWT, addTutor);

router.put("/:id", verifyJWT, updateTutor);

router.patch("/:id", verifyJWT, updateTutor);

router.delete("/:id", verifyJWT, deleteTutor);

export default router;