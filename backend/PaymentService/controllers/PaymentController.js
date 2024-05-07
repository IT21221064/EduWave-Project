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
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;
    console.log("Received merchant_id:", merchant_id);
    console.log("Received order_id:", order_id);
    console.log("Received payhere_amount:", payhere_amount);
    console.log("Received payhere_currency:", payhere_currency);
    console.log("Received status_code:", status_code);
    console.log("Received md5sig:", md5sig);

    const localMd5Sig = md5(`${merchant_id}`).toUpperCase();
    console.log("Generated Hash: " + localMd5Sig);
    console.log("Generated fHash: " + md5sig);

    // Update database with payment status
    await Payment.updateOne({ paymentID: order_id }, { status: "success" });
    res.json({ success: true }); // Send a success response
  } catch (error) {
    console.error("Error handling payment notification:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.handleReturn = (req, res) => {
  res.send("success");
};

exports.handleCancel = (req, res) => {
  res.send("cancel");
};
