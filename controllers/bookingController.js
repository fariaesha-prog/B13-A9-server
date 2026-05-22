import Booking from "../models/Booking.js";
import Tutor from "../models/Tutor.js";

// BOOK SESSION
export const bookSession = async (req, res) => {
  try {
    const {
      tutorId,
      studentName,
      studentEmail,
      phone,
      sessionDate
    } = req.body;

    const tutor =
      await Tutor.findById(tutorId);

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found"
      });
    }

    // prevent booking if slot 0
    if (tutor.totalSlot <= 0) {
      return res.status(400).json({
        message:
          "This session is fully booked. You can’t join at the moment."
      });
    }

    // prevent booking before date
    if (
      new Date() <
      new Date(tutor.sessionStartDate)
    ) {
      return res.status(400).json({
        message:
          "Booking is not available yet for this tutor"
      });
    }

    // decrease slot
    tutor.totalSlot -= 1;

    await tutor.save();

    // generate token
    const sessionToken =
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

    const booking =
      await Booking.create({
        tutorId,
        tutorName: tutor.tutorName,
        studentName,
        studentEmail,
        phone,
        sessionDate,
        sessionToken
      });

    res.status(201).json({
      success: true,
      message: "Booking successful",
      booking
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CANCEL BOOKING
export const cancelBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.bookingStatus =
      "cancelled";

    await booking.save();

    res.json({
      success: true,
      message:
        "Booking cancelled successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// USER BOOKINGS
export const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find({
        studentEmail: req.user.email
      });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};