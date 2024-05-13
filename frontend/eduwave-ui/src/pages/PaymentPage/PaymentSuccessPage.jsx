import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccessPage.css";
import Navbar from "../../components/navbar/Navbar";

const PaymentSuccessDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const order_Id = searchParams.get("order_id");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [studentEmail, setEmail] = useState("");

  const [course, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    console.log(order_Id);
    axios
      .put(`http://localhost:5006/api/payment/notify/${order_Id}`)
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.data.billingEmail);
        setCourseId(response.data.data.courseID);
        setCourseName(response.data.courseName);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
        setLoading(false);
      });
  }, [order_Id]);

  const handleEnrollButtonClick = async () => {
    try {
      const userid = localStorage.getItem("userid");
      console.log(studentEmail);
      axios.post("http://localhost:5005/enroll", {
        userid,
        course,
      });

      const emailResponse = await axios.post(
        "http://localhost:5003/api/email/send-email",
        {
          studentEmail,
          courseName,
        }
      );

      console.log(emailResponse.data.message);
      alert("Enrollment successful!");
    } catch (error) {
      console.error("Error enrolling course:", error);
      alert("Already enlisted in this course!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="suc-container">
        <h1 className="text-center my-4 such1">
          Payment Success: You have successfully enrolled in the course
        </h1>
        <button onClick={handleEnrollButtonClick}>Enroll</button>
      </div>
    </>
  );
};

export default PaymentSuccessDetails;
