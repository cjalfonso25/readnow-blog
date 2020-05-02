import React, { useState, useContext, lazy, Suspense } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Spinner from "../../common/Spinner";
import Avatar from "../../common/Avatar";
import Loader from "react-loader-spinner";
import "./Sidebar.css";

// const Avatar = lazy(() => import("../../common/Avatar"));

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [collapse, setCollapse] = useState(false);

  const isCollapsed = () => setCollapse(!collapse);

  return (
    <nav className={collapse ? "sidebar shrink" : "sidebar"}>
      <div className="sidebar-toggle-container">
        <button
          onClick={() => isCollapsed()}
          className="btn toggle-sidebar-btn"
          id="toggle-sidebar-btn"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div className="container-fluid">
        <div className="user__container">
          <div className="user__avatar m-auto">
            {user ? (
              <Avatar image={user.avatar} />
            ) : (
              <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
            )}
          </div>
          <h5 className="user__name text-center">{user ? user.name : ""}</h5>
          <p className="text-center m-0 ">
            <Link to="/dashboard/profile">
              <small className="text-muted ">Edit Profile</small>
            </Link>
          </p>
          <p className="text-center m-0 ">
            <Link to="/">
              <small className="text-muted ">Visit website</small>
            </Link>
          </p>
        </div>
        <div className="menu__container">
          <ul className="list-unstyled">
            <NavLink to="/dashboard">
              <li className="menu__item">
                <i className="fas fa-th-large"></i> Dashboard
              </li>
            </NavLink>
            <li
              className="menu__item d-flex justify-content-between align-items-center"
              data-toggle="collapse"
              href="#articles__sub-menu"
              role="button"
              aria-expanded="false"
              aria-controls="articles__sub-menu"
            >
              <div>
                <i className="fas fa-file-alt"></i> <span>Posts</span>
              </div>

              <i className="fas fa-chevron-down"></i>
            </li>
            <ul
              className="list-unstyled collapse menu__sub-menu"
              id="articles__sub-menu"
            >
              <NavLink to="/dashboard/articles">
                <li className="menu__sub-item">View All Post</li>
              </NavLink>
              <NavLink to="/dashboard/articles/add">
                <li className="menu__sub-item">Add Post</li>
              </NavLink>
            </ul>
            {user.isAdmin ? (
              <li
                className="menu__item d-flex justify-content-between align-items-center"
                data-toggle="collapse"
                href="#users__sub-menu"
                role="button"
                aria-expanded="false"
                aria-controls="users__sub-menu"
              >
                <div>
                  <i className="fas fa-users"></i> <span>Users</span>
                </div>

                <i className="fas fa-chevron-down"></i>
              </li>
            ) : null}

            <ul
              className="list-unstyled collapse menu__sub-menu"
              id="users__sub-menu"
            >
              <NavLink to="/dashboard/user_list">
                <li className="menu__sub-item">View Users</li>
              </NavLink>
              <NavLink to="/dashboard/users/add">
                <li className="menu__sub-item">Add New User</li>
              </NavLink>
            </ul>
            <NavLink to="/dashboard/settings">
              <li className="menu__item">
                <i className="fas fa-cogs"></i> Settings
              </li>
            </NavLink>
          </ul>
          <div className="logout-container text-center">
            <Link className="btn btn-danger" to="/logout">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
