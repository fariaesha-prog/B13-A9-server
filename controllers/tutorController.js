import Tutor from "../models/Tutor.js";

// ADD TUTOR
export const addTutor = async (req, res) => {
  try {
    const tutor = await Tutor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tutor added successfully",
      tutor
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL TUTORS
export const getAllTutors = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = {
      tutorName: {
        $regex: search,
        $options: "i",
      },
    };

    const tutors = await Tutor.find(query);

    res.json(tutors);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// HOMEPAGE TUTORS LIMIT 6
export const getHomeTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find().limit(6);

    res.json(tutors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// SINGLE TUTOR
export const getSingleTutor = async (req, res) => {
  try {
    const tutor =
      await Tutor.findById(req.params.id);

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found"
      });
    }

    res.json(tutor);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE TUTOR
export const updateTutor = async (req, res) => {
  try {
    const updatedTutor =
      await Tutor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      message: "Tutor updated successfully",
      updatedTutor
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE TUTOR
export const deleteTutor = async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Tutor deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// SEARCH + FILTER
export const searchTutors = async (req, res) => {
  try {
    const {
      tutorName,
      startDate,
      endDate
    } = req.query;

    let query = {};

    // regex search
    if (tutorName) {
      query.tutorName = {
        $regex: tutorName,
        $options: "i"
      };
    }

    // date filter
    if (startDate && endDate) {
      query.sessionStartDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const tutors = await Tutor.find(query);

    res.json(tutors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// MY TUTORS
export const getMyTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find({
      tutorEmail: req.user.email
    });

    res.json(tutors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};