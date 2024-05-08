import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PaymentDetails = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5006/api/payment/${id}`)
      .then((response) => {
        setPayment(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!payment) {
    return <div>Payment not found</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">Payment Details</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Order Information</h5>
              <p className="card-text">
                <strong>Order ID:</strong> {payment.paymentID}
              </p>
              <p className="card-text">
                <strong>Paid Date:</strong>{" "}
                {new Date(payment.timestamp).toLocaleDateString()}
              </p>
              <p className="card-text">
                <strong>Price:</strong> {payment.amount} {payment.currency}
              </p>
              <p className="card-text">
                <strong>Status:</strong> {payment.status}
              </p>
              <p className="card-text">
                <strong>Billing Address:</strong> {payment.billingAddress}
              </p>
              <p className="card-text">
                <strong>Billing City:</strong> {payment.billingCity}
              </p>
              <p className="card-text">
                <strong>Billing Country:</strong> {payment.billingCountry}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Payment Information</h5>
              <p className="card-text">
                <strong>Payment Method:</strong> {payment.paymentMethod}
              </p>
              <p className="card-text">
                <strong>Course ID:</strong> {payment.courseID}
              </p>
              <p className="card-text">
                <strong>Created At:</strong> {payment.createdAt}
              </p>
              <p className="card-text">
                <strong>Transaction ID:</strong> {payment.transactionID}
              </p>
              <p className="card-text">
                <strong>Updated At:</strong> {payment.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
