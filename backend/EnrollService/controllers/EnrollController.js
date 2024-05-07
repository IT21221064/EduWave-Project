const express = require("express");
const router = express.Router();
const Enroll = require("../models/EnrollModel");

// Controller function to add an enrollment
const addEnroll = async (req, res) => {
    try {
        const { userid, course } = req.body; // Assuming userId is provided in the request body

        if (!userid || !course) {
            return res.status(400).json({ message: "Both userid and course are required." });
        }

        // Create a new enrollment document
        const enrollItem = new Enroll({
            userid, // Assigning the userId to the userid field
            course,
            // You can add more fields here if needed based on your EnrollModel
        });

        // Save the enrollment to the database
        await enrollItem.save();
        
        res.status(200).json({ message: "Enrollment added successfully." });

    } catch (error) {
        console.error("Error adding Enrollment:", error);
        res.status(500).json({ message: "Server Error - Unable to add Enrollment" });
    }
};

// Controller function to get all enrollments
const getEnrolls = async (req, res) => {
    try {
        const enrolls = await Enroll.find(); // Populate the userid field with user details, only returning the 'name' field
        res.status(200).json(enrolls);
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller function to get all enrollments for a user
const getEnrollsByUser = async (req, res) => {
  try {

      // Find all enrollments for the specified user
      const userEnrolls = await Enroll.find({ userid : req.params.id});

      if (!userEnrolls) {
          return res.status(404).json({ message: "No enrollments found for the user." });
      }

      // Return the enrollments
      res.status(200).json(userEnrolls);
  } catch (error) {
      console.error("Error fetching user enrollments:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


// Controller function to delete an enrollment
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


// Export the controller functions
module.exports = {
    addEnroll,
    getEnrolls,
    getEnrollsByUser,
    deleteEnroll
};
