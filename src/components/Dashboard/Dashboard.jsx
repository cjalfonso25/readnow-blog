import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserPosts } from "../../services/postServices";
import { getProfile } from "../../services/userServices";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main";
import Profile from "./Profile/Profile";
import AddPost from "./Posts/AddPost";
import Articles from "./Posts/Articles";
import Settings from "./Settings/Settings";
import UserContext from "../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { user, setUser, setUserPosts } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const userPosts = await getUserPosts();
      setUserPosts(userPosts);

      const user = await getProfile();
      setUser(user);
    }

    if (!user) {
      fetchData();
    }
  }, []);

  return (
    <div className="d-flex dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <div className="container-fluid">
          <ToastContainer />
          <Switch>
            <Route path="/dashboard/settings" component={Settings} />
            <Route path="/dashboard/articles/edit/:id" component={AddPost} />
            <Route path="/dashboard/articles/add" component={AddPost} />
            <Route path="/dashboard/articles" component={Articles} />
            <Route path="/dashboard/profile" component={Profile} />
            <Route exact path="/dashboard" component={Main} />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
