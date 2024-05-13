import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    pw: "",
  });
  const [error, setError] = useState("");

  const { name, email, username, pw } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/Tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          pw: formData.pw,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to register learner");
      }

      const data = await response.json();
      console.log("Tutor registered successfully:", data);
      navigate("/tlogin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signupbackground">
      <div className="login-container">
        <h2>Register as a Tutor</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="loginlabel">Name:</label>
            <input
              type="text"
              className="input-field"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="loginlabel">Email:</label>
            <input
              type="email"
              className="input-field"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="loginlabel">Username:</label>
            <input
              type="text"
              className="input-field"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="loginlabel">Password:</label>
            <input
              type="password"
              className="input-field"
              name="pw"
              value={pw}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          <p className="logintext">Already have an account ?</p>
          <Link to="/tlogin">
            <button className="signupbtn">Login</button>
          </Link>
          <Link to="/">
            <button className="welcbtn">Go Back</button>
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
