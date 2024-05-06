const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
});

const Enroll = mongoose.model("Enroll", EnrollSchema);
module.exports = Enroll;