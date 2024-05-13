import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="signupbackground">
        <div className="login-container">
          <h2>Welcome to Eduwave</h2>
          <p>AMONG THE TIDES</p>
          <Link to="/login">
            <button className="admin-btn">Admin</button>
          </Link>
          <Link to="/tlogin">
            <button className="tutor-btn">Tutor</button>
          </Link>
          <Link to="/slogin">
            <button className="learner-btn">Learner</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
