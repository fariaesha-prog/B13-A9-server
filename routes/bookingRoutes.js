import express from "express";

import verifyJWT from "../middleware/verifyJWT.js";

import {
  bookSession,
  cancelBooking,
  getMyBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post(
  "/",
  verifyJWT,
  bookSession
);

router.get(
  "/my-bookings",
  verifyJWT,
  getMyBookings
);

router.patch(
  "/cancel/:id",
  verifyJWT,
  cancelBooking
);

export default router;