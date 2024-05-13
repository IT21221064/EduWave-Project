import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const StuRegister = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    username: "",
    pw: "",
  });
  const [error, setError] = useState("");

  const { Name, email, username, pw } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/Learner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: formData.Name,
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
      console.log("Learner registered successfully:", data);
      navigate("/slogin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signupbackground">
      <div className="login-container">
        <h2>Register as a Learner</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="loginlabel">Name:</label>
            <input
              type="text"
              className="input-field"
              name="Name"
              value={Name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="loginlabel">Email:</label>
            <input
              type="email"
              className="input-field"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="loginlabel">Username:</label>
            <input
              type="text"
              className="input-field"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
          <Link to="/slogin">
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

export default StuRegister;
