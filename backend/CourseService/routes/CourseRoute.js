const express = require("express");
const router = express.Router();
const {
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/CourseController");

router.post("/", addCourse);
router.get("/", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
