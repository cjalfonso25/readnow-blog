import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us - Readnow";
  });

  return (
    <div className="main-contact">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact">
              <h1>Contact Information</h1>
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
            </div>
          </div>
          <div className="col-12 col-md-6">
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15409.562800941963!2d120.63362653667501!3d15.08178070060861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f149eec61fa9%3A0x36ddc5d7a15dd3bb!2sSindalan%2C%20San%20Fernando%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1584790839136!5m2!1sen!2sph"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="col-12 col-md-6 m-auto">
            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  placeholder="Message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
