const Course = require("../models/Course");
const cloudinary = require("../utils/cloudinary");

const addCourse = async (req, res) => {
  try {
    const { id, name, description, price, isavailable, file, owner } = req.body;

    // Check if the file exists
    if (file) {
      // Upload file to cloudinary
      const uploadRes = await cloudinary.uploader.upload(file, {
        upload_preset: "EduWave"
      });

      if (uploadRes) {
        // Create a new course instance with uploaded file details
        const course = new Course({
          id,
          name,
          description,
          price,
          isavailable,
          file: uploadRes,
          owner
        });

        // Save the course to the database
        const savedCourse = await course.save();
        res.status(200).json({ message: "Course added successfully.", data: savedCourse });
      }
    } else {
      // If file is not provided
      res.status(400).json({ message: "File is required for course." });
    }
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server Error - Unable to add course" });
  }
};

const getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Unable to get courses" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully.", data: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server Error - Unable to update course" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server Error - Unable to delete course" });
  }
};

module.exports = {
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse
};
