import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import $ from "jquery";
import Popper from "popper.js";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/js/bootstrap.bundle";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
