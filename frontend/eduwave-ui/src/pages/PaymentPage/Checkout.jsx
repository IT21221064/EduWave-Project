import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Payhere,
  AccountCategory,
  Customer,
  CheckoutParams,
  PayhereCheckout,
} from "@payhere-js-sdk/client";
import md5 from "crypto-js/md5";
import "./Checkout.css"; // Import CSS file

const Checkout = () => {
  const [id, setId] = useState(null); // Define id state variable

  useEffect(() => {
    // Initialize PayHere
    Payhere.init(1226643, AccountCategory.SANDBOX); // Replace XXXX with your merchant ID
    const userId = localStorage.getItem("userid"); // Use a different name for clarity

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/Learner/${userId}`
        );
        setCustomerAttributes(response.data);
        setId(userId); // Set the id state variable
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, []);

  const [customerAttributes, setCustomerAttributes] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "", // Default country
  });

  const generateUniqueOrderId = () => {
    const timestamp = new Date().getTime().toString();
    const uniqueId = Math.random().toString(36).substr(2, 9); // Random alphanumeric string
    return `${timestamp}_${uniqueId}`;
  };

  const [checkoutAttributes, setCheckoutAttributes] = useState({
    returnUrl: "http://sample.com/return",
    cancelUrl: "http://sample.com/cancel",
    notifyUrl: "http://localhost:5006/api/payment/notify",
    order_id: generateUniqueOrderId(),
    items: "Door bell wireless",
    currency: "LKR",
    amount: "1000", // Amount as a string
    merchant_id: 1226643, // Replace XXXX with your merchant ID
    merchant_secret: "MjM3ODE4NDE0MzU5NzQ4NTM4MzI4NTAzMTE3NjUyODA1MzY4MjIw", // Replace with your merchant secret
  });

  useEffect(() => {
    const amountFormatted = parseFloat(checkoutAttributes.amount)
      .toLocaleString("en-us", { minimumFractionDigits: 2 })
      .replaceAll(",", "");
    const hashedSecret = md5(checkoutAttributes.merchant_secret)
      .toString()
      .toUpperCase();
    const hash = md5(
      checkoutAttributes.merchant_id +
        checkoutAttributes.order_id +
        amountFormatted +
        checkoutAttributes.currency +
        hashedSecret
    )
      .toString()
      .toUpperCase();
    setCheckoutAttributes((prevAttributes) => ({
      ...prevAttributes,
      hash: hash,
    }));
  }, [
    checkoutAttributes.merchant_id,
    checkoutAttributes.order_id,
    checkoutAttributes.amount,
    checkoutAttributes.currency,
    checkoutAttributes.merchant_secret,
  ]);

  function onPayhereCheckoutError(errorMsg) {
    alert(errorMsg);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerAttributes({
      ...customerAttributes,
      [name]: value,
    });
  };

  const addPayment = async () => {
    try {
      debugger;
      await axios.post("http://localhost:5006/api/payment/add", {
        paymentID: checkoutAttributes.order_id,
        userID: id, // Use the id state variable here
        amount: checkoutAttributes.amount,
        currency: checkoutAttributes.currency,
        paymentMethod: "Payhere",
        courseID: "1234",
        billingFirstName: customerAttributes.first_name,
        billingLastName: customerAttributes.last_name,
        billingPhone: customerAttributes.phone,
        billingEmail: customerAttributes.email,
        billingAddress: customerAttributes.address,
        billingCity: customerAttributes.city,
        billingCountry: customerAttributes.country,
      });
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="payment-form-card">
            <div className="card-body">
              <h5 className="card-title">Customer Details</h5>
              <form
                method="post"
                action="https://sandbox.payhere.lk/pay/checkout"
                onSubmit={(e) => {
                  // Prevent default form submission behavior
                  addPayment(); // Call addPayment function when the form is submitted
                }}
              >
                <input
                  type="hidden"
                  name="merchant_id"
                  value={checkoutAttributes.merchant_id}
                />
                <input
                  type="hidden"
                  name="return_url"
                  value={checkoutAttributes.returnUrl}
                />
                <input
                  type="hidden"
                  name="cancel_url"
                  value={checkoutAttributes.cancelUrl}
                />
                <input
                  type="hidden"
                  name="notify_url"
                  value={checkoutAttributes.notifyUrl}
                />
                <input
                  type="hidden"
                  name="order_id"
                  value={checkoutAttributes.order_id}
                />
                <input
                  type="hidden"
                  name="items"
                  value={checkoutAttributes.items}
                />
                <input
                  type="hidden"
                  name="currency"
                  value={checkoutAttributes.currency}
                />
                <input
                  type="hidden"
                  name="amount"
                  value={checkoutAttributes.amount}
                />
                <div className="form-group">
                  <label>
                    First Name: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={customerAttributes.first_name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Last Name: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={customerAttributes.last_name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Email: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={customerAttributes.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Phone: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={customerAttributes.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    Country: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={customerAttributes.country}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Address: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={customerAttributes.address}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    City: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerAttributes.city}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <input
                  type="hidden"
                  name="hash"
                  value={checkoutAttributes.hash}
                />
                <button type="submit">Buy Now</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="payment-details-card">
            <div className="card-body">
              <h5 className="card-title">Payment Details</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Order Id</td>
                    <td>{checkoutAttributes.order_id}</td>
                  </tr>
                  <tr>
                    <td>Course name</td>
                    <td>{checkoutAttributes.items}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>
                      {checkoutAttributes.amount} {checkoutAttributes.currency}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
