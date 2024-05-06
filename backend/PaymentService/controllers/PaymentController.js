const Payment = require("../models/PaymentModel");

// Controller for handling payment creation
exports.createPayment = async (req, res) => {
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
    } = req.body;

    // Create a new payment instance
    const payment = new Payment({
      paymentID,
      userID,
      amount,
      currency,
      paymentMethod,
      courseID,
      transactionID,
      additionalDetails,
    });

    // Save the payment instance to the database
    await payment.save();

    // Return a success response
    return res.status(201).json({ success: true, data: payment });
  } catch (error) {
    // Handle errors
    console.error("Error creating payment:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller for retrieving all payments
exports.getAllPayments = async (req, res) => {
  try {
    // Fetch all payments from the database
    const payments = await Payment.find();

    // Return the payments
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    // Handle errors
    console.error("Error fetching payments:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller for retrieving a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the payment by ID from the database
    const payment = await Payment.findById(id);

    // If the payment is not found, return a 404 error
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, error: "Payment not found" });
    }

    // Return the payment
    return res.status(200).json({ success: true, data: payment });
  } catch (error) {
    // Handle errors
    console.error("Error fetching payment:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
