import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import About from "../About/About";
// import Readnow from "./Readnow";
import Contact from "../Contact/Contact";
import Loader from "react-loader-spinner";

const Posts = lazy(() => import("../Posts/Posts"));
const Readnow = lazy(() => import("./Readnow"));
const Post = lazy(() => import("../Posts/Post"));

const Home = () => {
  useEffect(() => {
    document.title = "Home - Readnow";
  });
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        }
      >
        <Switch>
          <Route path="/contact-us" component={Contact} />
          <Route path="/articles/:id" component={Post} />
          <Route path="/articles" component={Posts} />
          <Route path="/about" component={About} />
          <Route path="/home" component={Readnow} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
      <Footer />
    </>
  );
};

export default Home;
