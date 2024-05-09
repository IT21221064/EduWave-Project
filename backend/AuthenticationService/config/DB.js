require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(
        process.env.MONGO_URI
    )
        .then(() => {
            console.log(`mongoDB Connected`);
        })
        .catch(error => {
            console.error(`Error connectiong to MongoDB` + error);
            process.exit(1);
        })
}

module.exports = connectDB;