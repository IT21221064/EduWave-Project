const express = require("express");
const connectDB = require("./config/DB");
const dotenv = require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT ;



const courseRoute = require("./routes/CourseRoute");


connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use((req, res, next) => {
    req.setTimeout(10000); 
    next();
  });
app.use(bodyParser.json({ limit: '500mb' }));



app.use("/api/course", courseRoute);




app.listen(port, () => console.log(`Server started on port ${port}`));