const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
    userid: {
        type: String,
        // ref: 'Learner',
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    state: {
        type: String
    },
});

const Enroll = mongoose.model("Enroll", EnrollSchema);
module.exports = Enroll;