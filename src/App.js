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

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const providerValue = useMemo(
    () => ({ user, userPosts, posts, setUser, setUserPosts, setPosts }),
    [user, userPosts, posts, setUser, setUserPosts, setPosts]
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
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PublicRoute path="/" component={Home} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
