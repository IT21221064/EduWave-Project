import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/welcome");
    console.log("logout");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img className="nav-logo" src="/images/eduwavelogo.png" alt="Logo" />
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/course-home" className="navtext">
              COURSES
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/course-tutor" className="navtext">
              MY COURSES
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/my-notifications" className="navtext">
              NOTIFICATION
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/welcome"
              className="navtext"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> LOGOUT
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
