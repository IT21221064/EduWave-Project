
require('dotenv').config(); //require and directly invoke the config method

const express = require('express');
const mongoose = require('mongoose');
const NotificationRoutes = require('./routes/NotificationRoute');
const connectDB = require("./config/DB");

const PORT = process.env.PORT;
//express app
const app = express(); //invokes the function
connectDB();
//middleware
app.use(express.json()); //if the request has a body or data then it passes and attaches to req object

app.use((req, res, next) => {
  // next is used to move to the next piece of middleware
  console.log(req.path, req.method);
  next();
}); //this function will fire for every request

//routes
app.use('/api/Notification', NotificationRoutes);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
