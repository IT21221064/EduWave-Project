// PaymentController.js

const md5 = require("md5");
const Payment = require("../models/PaymentModel");

exports.createPayment = async (req, res) => {
  debugger;
  try {
    const {
      paymentID,
      userID,
      amount,
      currency,
      paymentMethod,
      courseID,
      transactionID,
      additionalDetails,
      billingFirstName,
      billingLastName,
      billingPhone,
      billingEmail,
      billingAddress,
      billingCity,
      billingCountry,
    } = req.body;

    const payment = new Payment({
      paymentID,
      userID,
      amount,
      currency,
      paymentMethod,
      courseID,
      transactionID,
      additionalDetails,
      billingFirstName,
      billingLastName,
      billingPhone,
      billingEmail,
      billingAddress,
      billingCity,
      billingCountry,
    });

    await payment.save();

    return res.status(201).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, error: "Payment not found" });
    }
    return res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching payment:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.handleNotify = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the payment by paymentID instead of _id
    const payment = await Payment.findOne({ paymentID: id });

    // If payment is not found, return a 404 response
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, error: "Payment not found" });
    }

    // Update the status of the found payment to "success"
    payment.status = "success";

    // Save the updated payment object
    await payment.save();

    // Return success response with updated payment data
    return res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.handleReturn = (req, res) => {
  res.send("success");
};

exports.handleCancel = (req, res) => {
  res.send("cancel");
};
