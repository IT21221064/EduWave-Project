const express = require("express");
const router = express.Router();


const {addEnroll, deleteEnroll, getEnrolls,getEnrollsByUser} = require("../controllers/EnrollController");


router.post("/", addEnroll);
router.delete("/:id", deleteEnroll);
router.get("/", getEnrolls);
router.get("/:id", getEnrollsByUser);


module.exports = router;
