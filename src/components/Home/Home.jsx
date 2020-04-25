import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Readnow from "./Readnow";
import About from "../About/About";
import Posts from "../Posts/Posts";
import Post from "../Posts/Post";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/contact-us" component={Contact} />
        <Route path="/articles/:id" component={Post} />
        <Route path="/articles" component={Posts} />
        <Route exact path="/about" component={About} />
        <Route exact path="/home" component={Readnow} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
      <Footer />
    </>
  );
};

export default Home;
