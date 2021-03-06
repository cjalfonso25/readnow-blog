import React, { useState, useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Dashboard/Login";
import Logout from "./components/common/Logout";
import PublicRoute from "./components/Routes/PublicRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import UserContext from "./components/context/UserContext";
import { getPosts } from "./services/postServices";
import "./App.css";
import Problem from "./components/Auth/Problem";
import Otp from "./components/Auth/Otp";
import SetNewPassword from "./components/Auth/SetNewPassword";

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userList, setUserList] = useState([]);

  const providerValue = useMemo(
    () => ({
      user,
      userPosts,
      posts,
      userList,
      setUserList,
      setUser,
      setUserPosts,
      setPosts,
    }),
    [
      user,
      userPosts,
      posts,
      userList,
      setUserList,
      setUser,
      setUserPosts,
      setPosts,
    ]
  );

  useEffect(() => {
    document.title = "Readnow";
    async function fetchData() {
      const data = await getPosts();
      setPosts(data);
    }

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={providerValue}>
      <Switch>
        <Route
          path="/projects/readnow/set-new-password"
          component={SetNewPassword}
        />
        <Route path="/projects/readnow/otp" component={Otp} />
        <Route path="/projects/readnow/logout" component={Logout} />
        <Route path="/projects/readnow/login/problem" component={Problem} />
        <Route path="/projects/readnow/login" component={Login} />
        <PrivateRoute
          path="/projects/readnow/dashboard"
          component={Dashboard}
        />
        <PublicRoute path="/projects/readnow" component={Home} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
