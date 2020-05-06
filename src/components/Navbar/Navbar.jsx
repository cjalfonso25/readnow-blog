import React from "react";
import { NavLink, Link } from "react-router-dom";
import { getCurrentUser } from "../../services/authServices";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/projects/readnow" className="navbar-brand">
            Readnow
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/projects/readnow/home" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/projects/readnow/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/projects/readnow/articles" className="nav-link">
                  Articles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/projects/readnow/contact-us" className="nav-link">
                  Contact Us
                </NavLink>
              </li>
              {getCurrentUser() ? (
                <li className="nav-item">
                  <NavLink
                    to="/projects/readnow/dashboard"
                    className="nav-link"
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink to="/projects/readnow/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
