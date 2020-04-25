import React from "react";

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <img
              src="http://bigsnoozedigital.com/simpleblog/assets/img/business-businessman-contemporary-corporate-532220.jpg"
              className="w-100"
              alt=""
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="about-me">
              <div className="about-me-content">
                <p>Hello! I am</p>
                <h1>John Doe</h1>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut sem viverra aliquet eget.
                </p>
                <p className="text-justify">
                  Ultrices gravida dictum fusce ut placerat. Vulputate ut
                  pharetra sit amet aliquam id diam maecenas ultricies. Vivamus
                  at augue eget arcu. Erat velit scelerisque in dictum. Ultrices
                  tincidunt arcu non sodales neque. Scelerisque felis imperdiet
                  proin fermentum leo vel orci porta. Volutpat lacus laoreet non
                  curabitur gravida arcu ac. Justo nec ultrices dui sapien eget
                  mi. Pretium nibh ipsum consequat nisl vel pretium lectus quam
                  id. Egestas maecenas pharetra convallis posuere morbi leo urna
                  molestie.
                </p>
                <p className="text-justify">
                  Justo nec ultrices dui sapien eget mi. Pretium nibh ipsum
                  consequat nisl vel pretium lectus quam id. Egestas maecenas
                  pharetra convallis posuere morbi leo urna molestie.
                </p>
              </div>
              <div className="social">
                <ul className="social-list">
                  <li>
                    <a href="# ">
                      <i className="fab fa-facebook-square fa-2x"></i>
                    </a>
                  </li>
                  <li>
                    <a href="# ">
                      <i className="fab fa-twitter-square fa-2x"></i>
                    </a>
                  </li>
                  <li>
                    <a href="# ">
                      <i className="fab fa-instagram-square fa-2x"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
