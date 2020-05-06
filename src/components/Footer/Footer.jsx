import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="footer-company">
              <h1 className="title">Readnow</h1>
              <p className="sub-title text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="footer-info">
              <p className="footer-title">Info</p>
              <ul>
                <li>
                  <Link to="/projects/readnow">Home</Link>
                </li>
                <li>
                  <Link to="/projects/readnow/about">About</Link>
                </li>
                <li>
                  <Link to="/projects/readnow/articles">Articles</Link>
                </li>
                <li>
                  <Link to="/projects/readnow/contact-us">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="footer-social">
              <p className="footer-title">Have Questions?</p>
              <ul>
                <li>
                  <div className="d-flex justify-content-start">
                    <i className="fas fa-map-marker-alt m-1 mr-3"></i>
                    <p>
                      203 Fake St. Mountain View, San Fernando, Pampanga, PH
                    </p>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-start">
                    <i className="fas fa-envelope m-1 mr-3"></i>
                    <p>info@yourdomain.com</p>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-start">
                    <i className="fas fa-phone-alt m-1 mr-3"></i>
                    <p>+63 912-345-6789</p>
                  </div>
                </li>
              </ul>
              <ul className="social-list">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-square fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter-square fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram-square fa-2x"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <small>Copyright 2020</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
