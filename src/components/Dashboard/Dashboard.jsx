import React, { useEffect, useContext, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserPosts } from "../../services/postServices";
import { getProfile, getUsers } from "../../services/userServices";
import Sidebar from "./Sidebar/Sidebar";
import Loader from "react-loader-spinner";
import UserContext from "../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

const Main = lazy(() => import("./Main"));
const Profile = lazy(() => import("./Profile/Profile"));
const AddPost = lazy(() => import("./Posts/AddPost"));
const Articles = lazy(() => import("./Posts/Articles"));
const Users = lazy(() => import("./Users/Users"));
const AddUser = lazy(() => import("./Users/AddUser"));
const Settings = lazy(() => import("./Settings/Settings"));

const Dashboard = () => {
  const { user, setUser, setUserPosts, setUserList } = useContext(UserContext);

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

  useEffect(() => {
    async function fetchUsers() {
      const userList = await getUsers();
      setUserList(userList);
    }

    if (user && user.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="d-flex dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <div className="container-fluid">
          <ToastContainer />
          <Suspense
            fallback={
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            }
          >
            <Switch>
              <Route path="/dashboard/settings" component={Settings} />
              <Route path="/dashboard/users/add" component={AddUser} />
              <Route path="/dashboard/user_list" component={Users} />
              <Route path="/dashboard/articles/edit/:id" component={AddPost} />
              <Route path="/dashboard/articles/add" component={AddPost} />
              <Route path="/dashboard/articles" component={Articles} />
              <Route path="/dashboard/profile" component={Profile} />
              <Route exact path="/dashboard" component={Main} />
              <Redirect to="not-found" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
