const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

// Route for creating a new payment
router.post("/add", paymentController.createPayment);

// Route for retrieving all payments
router.get("/", paymentController.getAllPayments);

// Route for retrieving a single payment by ID
router.get("/:id", paymentController.getPaymentById);

module.exports = router;
