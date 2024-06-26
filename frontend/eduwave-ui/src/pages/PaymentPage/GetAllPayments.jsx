import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./GetAllPayments.css";
import Navbar from "../../components/navbar/AdminNavbar";
import Footer from "../../components/footer/Footer";

const GetAllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [filterDate, setFilterDate] = useState("");

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

  const handleSearch = () => {
    // Filter payments by Order ID
    return payments.filter((payment) =>
      payment.paymentID.toLowerCase().includes(searchOrderId.toLowerCase())
    );
  };

  const handleFilter = () => {
    // Filter payments by Date
    return payments.filter((payment) => {
      const paymentDate = new Date(payment.timestamp).toLocaleDateString();
      // Check if the filtered date matches the payment date
      return paymentDate === new Date(filterDate).toLocaleDateString();
    });
  };

  const filteredPayments =
    searchOrderId !== ""
      ? handleSearch()
      : filterDate !== ""
      ? handleFilter()
      : payments;

  return (
    <>
      <Navbar />
      <div className="">
        <div className="search-bar-container ">
          <input
            type="text"
            className="form-control search-form-control "
            placeholder="Search by Order ID"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="form-control search-form-control"
          />
        </div>
        <div className="admin-payment-list-card">
          <table className="cadmin-table">
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
              {filteredPayments.map((payment) => (
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
                      to={`/admin-payment-details/${payment._id}`}
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
        <Footer />
      </div>
    </>
  );
};

export default GetAllPayments;
