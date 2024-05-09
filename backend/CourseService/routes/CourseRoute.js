const express = require("express");
const router = express.Router();
const {
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    getCourseById
} = require("../controllers/CourseController");

router.post("/", addCourse);
router.get("/", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/:id", getCourseById);

module.exports = router;
