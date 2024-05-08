// PaymentDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

const PaymentDetails = () => {
  const { id } = useParams(); // Access route parameter 'id' using useParams
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch payment details by ID from the API
    axios
      .get(`http://localhost:5006/api/payment/${id}`)
      .then((response) => {
        setPayment(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
        setLoading(false);
      });
  }, [id]); // Use `id` obtained from useParams as the dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!payment) {
    return <div>Payment not found</div>;
  }

  return (
    <div>
      <h1>Payment Details</h1>
      <div>
        <strong>Order ID:</strong> {payment.paymentID}
      </div>
      <div>
        <strong>Paid Date:</strong>{" "}
        {new Date(payment.timestamp).toLocaleDateString()}
      </div>
      <div>
        <strong>Price:</strong> {payment.amount} {payment.currency}
      </div>
      <div>
        <strong>Status:</strong> {payment.status}
      </div>
      {/* Other payment details */}
      <div>
        <strong>Billing Address:</strong> {payment.billingAddress}
      </div>
      <div>
        <strong>Billing City:</strong> {payment.billingCity}
      </div>
      <div>
        <strong>Billing Country:</strong> {payment.billingCountry}
      </div>
      {/* Render other payment details as needed */}
    </div>
  );
};

export default PaymentDetails;
