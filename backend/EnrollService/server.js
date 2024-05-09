const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

const EnrollRoutes = require("./routes/EnrollRoutes");

//1) Middlewares
app.use(cors());
app.use(express.json());

//2) Route
app.use("/enroll",EnrollRoutes );

//3)MONGO DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT;
const backend = app.listen(port, () =>
  console.log(`server is running ${port}`)
);
