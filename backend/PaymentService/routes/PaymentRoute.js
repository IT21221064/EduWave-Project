const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

// Route for creating a new payment
router.post("/add", paymentController.createPayment);

// Route for retrieving all payments
router.get("/", paymentController.getAllPayments);

// Route for retrieving a single payment by ID
router.get("/:id", paymentController.getPaymentById);

// Route for handling payment notification
router.put("/notify/:id", paymentController.handleNotify);

// Route for handling return URL
router.get("/return", paymentController.handleReturn);

// Route for handling cancel URL
router.get("/cancel", paymentController.handleCancel);

module.exports = router;
