const express = require("express");
const router = express.Router();
const Enroll = require("../models/EnrollModel");


const addEnroll = async (req, res) => {
    try {
        const { userid, course } = req.body; 

        if (!userid || !course) {
            return res.status(400).json({ message: "Both userid and course are required." });
        }

        // Check if the enrollment already exists for the provided userid and course
        const existingEnrollment = await Enroll.findOne({ userid, course });

        if (existingEnrollment) {
            return res.status(400).json({ message: "You are already enrolled in this course." });
        }

        const enrollItem = new Enroll({
            userid, 
            course,
        });

        await enrollItem.save();
        
        res.status(200).json({ message: "Enrollment added successfully." });

    } catch (error) {
        console.error("Error adding Enrollment:", error);
        res.status(500).json({ message: "Server Error - Unable to add Enrollment" });
    }
};



const getEnrolls = async (req, res) => {
    try {
        const enrolls = await Enroll.find(); 
        res.status(200).json(enrolls);
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getEnrollsByUser = async (req, res) => {
  try {

      const userEnrolls = await Enroll.find({ userid : req.params.id});

      if (!userEnrolls) {
          return res.status(404).json({ message: "No enrollments found for the user." });
      }

      res.status(200).json(userEnrolls);
  } catch (error) {
      console.error("Error fetching user enrollments:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteEnroll = async (req, res) => {
  try {

      const deletedEnroll = await Enroll.findById(req.params.id);
      
      if (!deletedEnroll) {

          console.error(`Enrollment with ID not found.`);
          return res.status(404).json({ message: "Enrollment not found" });
      }
      await deletedEnroll.deleteOne(); 

      res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
      console.error("Error deleting enrollment:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateEnroll = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedEnroll = await Enroll.findByIdAndUpdate(req.params.id, updateData, {
        new: true
      });
  
      if (!updatedEnroll) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
  
      res.status(200).json({ message: "Enrollment updated successfully", enrollment: updatedEnroll });
    } catch (error) {
      console.error("Error updating enrollment:", error);
      res.status(500).json({ message: "Server Error - Unable to update enrollment" });
    }
  };
  
  


module.exports = {
    addEnroll,
    getEnrolls,
    getEnrollsByUser,
    deleteEnroll,
    updateEnroll
};
