const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentID: {
    type: String,
    unique: true,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  courseID: {
    type: String,
  },
  transactionID: {
    type: String,
  },
  additionalDetails: {
    type: String,
  },
  billingFirstName: {
    type: String,
    required: true,
  },
  billingLastName: {
    type: String,
    required: true,
  },
  billingPhone: {
    type: String,
    required: true,
  },
  billingEmail: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  billingCity: {
    type: String,
    required: true,
  },
  billingCountry: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
