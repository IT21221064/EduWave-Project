import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import swal from "sweetalert"; 

function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    swal({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        localStorage.clear();
        navigate("/");
        console.log("logout");
      }
    });
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
              to="/"
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
