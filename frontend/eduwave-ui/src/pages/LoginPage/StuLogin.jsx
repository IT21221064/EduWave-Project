import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Footer from "../../components/footer/Footer";

const StuLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/Learner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pw: password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      // Handle successful login, e.g., store token in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.userid);

      // Redirect or do something else upon successful login
      window.location.href = "/enroll";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signupbackground">
      <div className="login-container">
        <h1>Student Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="loginlabel">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="loginlabel">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="logintext">Dont have an account?</p>
          <Link to="/register">
            <button className="signupbtn">Register</button>
          </Link>
          <Link to="/">
            <button className="welcbtn">Go Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default StuLoginPage;
