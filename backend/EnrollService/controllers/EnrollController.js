const express = require("express");
const router = express.Router();
const Enroll = require("../models/EnrollModel");

const addEnroll = async (req, res) => {
    try {
        const { user, course } = req.body;

        const existingEnroll = await Enroll.findOne({ user, course });
        if (existingEnroll) {
            return res.status(400).json({ message: "Enrollment with this user and email already exists" });
        }

        const enrollItem = new Enroll({
            user,
            course,
            // You can add more fields here if needed based on your EnrollModel
        });
        await enrollItem.save();
        res.status(200).json({ message: "Enrollment added successfully." });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Enrollment with this user and email already exists" });
        }
        console.error("Error adding Enrollment:", error);
        res.status(500).json({ message: "Server Error - Unable to add Enrollment" });
    }
};

const getEnrolls = async (req, res) => {
    try {
      const Enrolls = await Enroll.find();
      res.json(Enrolls);
    } catch (error) {
      //console.error(error);
      res.status(500).json({ message: "Unable to retrieve enrolls" });
    }
  };

const deleteEnroll = async (req, res) => {
    try {
      const deletedCourse = await Enroll.findById(req.params.id);
  
      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      await deletedCourse.deleteOne(); 
      res.json({ message: "Course removed" });

    } catch (error) {
      //console.error(error);
      res.status(500).json({ message: "Server Error - Unable to delete course" });
    }
  };

module.exports = {
    addEnroll,
    deleteEnroll,
    getEnrolls,
};
