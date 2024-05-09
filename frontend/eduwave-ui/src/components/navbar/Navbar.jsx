import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/welcome");
    console.log("logout");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img className="nav-logo" src="/images/EYELogo.png" alt="Logo" />
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="navtext">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/enroll" className="navtext">
            Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mystucourse" className="navtext">My Courses
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
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
