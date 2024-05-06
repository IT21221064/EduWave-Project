const express = require("express");
const router = express.Router();


const {addEnroll, deleteEnroll, getEnrolls} = require("../controllers/EnrollController");


router.post("/", addEnroll);
router.delete("/:id", deleteEnroll);
router.get("/", getEnrolls);


module.exports = router;
