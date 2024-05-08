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

  useEffect(() => {
    // Initialize PayHere
    Payhere.init(1226643, AccountCategory.SANDBOX);
  }, []);

  const generateMd5Sig = (merchant_id) => {
    const data = merchant_id.toString();
    const md5sig = md5(data).toUpperCase();
    return md5sig;
  };

  const [checkoutAttributes] = useState({
    returnUrl: "http://localhost:3000/return",
    cancelUrl: "http://localhost:3000/cancel",
    notifyUrl: "http://localhost:5001/api/payment/notify",
    order_id: "11223",
    itemTitle: "Demo Item",
    currency: "LKR",
    amount: 100,
    hash: generateMd5Sig(1226643),
    merchant_id: 1226643,
  });

  function onPayhereCheckoutError(errorMsg) {
    alert(errorMsg);
  }

  async function checkout() {
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
          await axios.post("http://localhost:5001/api/payment/add", {
            paymentID: checkoutAttributes.order_id,
            userID: "12345",
            amount: checkoutAttributes.amount,
            currency: checkoutAttributes.currency,
            paymentMethod: "Payhere",
            status: "pending",
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
      // After checkout is completed successfully
      payhereCheckout.onCompleted(async () => {
        try {
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
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerAttributes({
      ...customerAttributes,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={customerAttributes.first_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={customerAttributes.last_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={customerAttributes.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={customerAttributes.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={customerAttributes.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={customerAttributes.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={customerAttributes.country}
          onChange={handleInputChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
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
            <td>{checkoutAttributes.amount}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={checkout} style={{ cursor: "pointer" }}>
        Pay with Payhere
      </button>
    </div>
  );
};

export default Checkout;
