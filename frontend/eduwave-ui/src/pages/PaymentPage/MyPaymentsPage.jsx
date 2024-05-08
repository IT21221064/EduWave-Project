import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./GetAllPayments.css"; // Import CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faEye } from "@fortawesome/free-solid-svg-icons";

const MyPaymentsPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("userid");
    console.log(id);
    axios
      .get("http://localhost:5006/api/payment/")
      .then((response) => {
        setPayments(
          response.data.data.filter((payment) => payment.userID === id)
        );
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
      });
  }, []);

  return (
    <div className="admin-payment-list-container">
      <div className="admin-payment-list-main-card">
        <h1>My Payments</h1>
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
                  <td>{payment.status}</td>
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

export default MyPaymentsPage;