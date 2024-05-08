import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Payhere,
  AccountCategory,
  Customer,
  CheckoutParams,
  PayhereCheckout,
} from "@payhere-js-sdk/client";
import md5 from "md5";
import "./Checkout.css"; // Import CSS file

const Checkout = () => {
  const [customerAttributes, setCustomerAttributes] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const generateRandomOrderId = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    const orderId = Math.floor(Math.random() * (max - min + 1)) + min;
    return orderId;
  };

  useEffect(() => {
    // Initialize PayHere
    Payhere.init(1226643, AccountCategory.SANDBOX);
    const id = localStorage.getItem("userid");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/Learner/${id}`
        );
        setCustomerAttributes(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, []);

  const generateMd5Sig = (merchant_id) => {
    const data = merchant_id.toString();
    const md5sig = md5(data).toUpperCase();
    return md5sig;
  };

  const [checkoutAttributes] = useState({
    returnUrl: "http://localhost:3000/return",
    cancelUrl: "http://localhost:3000/cancel",
    notifyUrl: "http://localhost:5006/api/payment/notify",
    order_id: generateRandomOrderId(),
    itemTitle: "Demo Item",
    currency: "LKR",
    amount: 100,
    hash: generateMd5Sig(1226643),
    merchant_id: 1226643,
  });

  function onPayhereCheckoutError(errorMsg) {
    alert(errorMsg);
  }

  const checkout = async (id) => {
    try {
      const customer = new Customer(customerAttributes);

      const checkoutData = new CheckoutParams({
        returnUrl: checkoutAttributes.returnUrl,
        cancelUrl: checkoutAttributes.cancelUrl,
        notifyUrl: checkoutAttributes.notifyUrl,
        order_id: checkoutAttributes.order_id,
        itemTitle: checkoutAttributes.itemTitle,
        currency: checkoutAttributes.currency,
        amount: checkoutAttributes.amount,
        hash: checkoutAttributes.hash,
        merchant_id: checkoutAttributes.merchant_id,
      });

      const payhereCheckout = new PayhereCheckout(
        customer,
        checkoutData,
        onPayhereCheckoutError
      );

      const addPayment = async () => {
        try {
          await axios.post("http://localhost:5006/api/payment/add", {
            paymentID: checkoutAttributes.order_id,
            userID: id,
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
      await addPayment();
      payhereCheckout.start();

      const response = await fetch(checkoutAttributes.notifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant_id: checkoutAttributes.merchant_id,
          order_id: checkoutAttributes.order_id,
          payhere_amount: checkoutAttributes.amount,
          payhere_currency: checkoutAttributes.currency,
          md5sig: checkoutAttributes.hash,
        }),
      });

      if (response.ok) {
        console.log("Notification sent successfully");
      } else {
        console.error("Failed to send notification");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerAttributes({
      ...customerAttributes,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 ">
          <div className="payment-form-card">
            <div className="card-body">
              <h5 className="card-title">Customer Details</h5>
              <form>
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
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className=" payment-details-card">
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
                    <td>{checkoutAttributes.itemTitle}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>
                      {checkoutAttributes.amount} {checkoutAttributes.currency}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => checkout(localStorage.getItem("userid"))}
                className="btn btn-primary"
              >
                Pay with Payhere
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
