const express = require("express");
const connectDB = require("./config/DB");
const dotenv = require("dotenv").config();

const port = process.env.PORT ;

const courseRoute = require("./routes/CourseRoute");


connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/course", courseRoute);




app.listen(port, () => console.log(`Server started on port ${port}`));