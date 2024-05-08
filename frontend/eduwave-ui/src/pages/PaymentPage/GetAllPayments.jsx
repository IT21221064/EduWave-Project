import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

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
    <div>
      <h1>My Payments</h1>
      <table>
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
                <Link to={`/payment-details/${payment._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllPayments;
