import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUserPost } from "../../../services/postServices";
import Moment from "react-moment";
import UserContext from "../../context/UserContext";
import { useEffect } from "react";

const Users = () => {
  const { user, userList, userPosts } = useContext(UserContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    document.title = "Users - Readnow";

    // const users = await getUsers();
    // setList(users)
  }, []);

  const handleDelete = async (id) => {
    try {
      //   const post = await deleteUserPost(id);
      //   const currentPosts = userPosts.filter((post) => post._id !== id);
      //   const allPost = posts.filter((post) => post._id !== id);
      //   setUserPosts(currentPosts);
      //   setPosts(allPost);
      //   toast.success(`"${post.title}" has been deleted!`);
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="posts-table">
      <div className="card">
        <div className="card-header">
          <h5 className="m-0">Users</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Role</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 ? (
                  userList.map((user, i) => (
                    <tr key={user._id}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <Link to={`/dashboard/users/${user._id}`}>
                          {user.name}
                        </Link>
                      </td>
                      <td>{user.title}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to={`/dashboard/users/edit/${user._id}`}>
                          <i className="fas fa-pen mr-3"></i>
                        </Link>
                        <i
                          onClick={() => handleDelete(user._id)}
                          className="fas fa-trash-alt"
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      <small className="text-muted">
                        No users found.
                        <Link to="/dashboard/articles/users/add">
                          {" "}
                          Click here to add user.
                        </Link>
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
