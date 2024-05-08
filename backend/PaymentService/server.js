const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/PaymentRoute");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.error("DB CONNECTION ERROR", err));

// Routes
app.use("/api/payment", router);

const port = process.env.PORT || 5006;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
