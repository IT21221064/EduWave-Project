import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faEye } from "@fortawesome/free-solid-svg-icons"; // Import the eye icon
import "./GetAllPayments.css"; // Import CSS file

const GetAllPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5006/api/payment/")
      .then((response) => {
        setPayments(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
      });
  }, []);

  return (
    <div className="admin-payment-list-container">
      <div className="admin-payment-list-main-card">
        <h1>Admin Payments Page</h1>
        <br />
        <div className="admin-payment-list-card">
          <table className="admin-payment-list-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Paid Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.paymentID}</td>
                  <td>{new Date(payment.timestamp).toLocaleDateString()}</td>
                  <td>
                    {payment.amount} {payment.currency}
                  </td>
                  <td>
                    {payment.status}
                    {"    "}
                    {payment.status === "success" && (
                      <div className="dot dot-success"></div>
                    )}
                    {payment.status === "fail" && (
                      <div className="dot dot-fail"></div>
                    )}
                    {payment.status === "pending" && (
                      <div className="dot dot-pending"></div>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/payment-details/${payment._id}`}
                      className="view-link"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllPayments;
