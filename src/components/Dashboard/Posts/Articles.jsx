import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUserPost } from "../../../services/postServices";
import Moment from "react-moment";
import UserContext from "../../context/UserContext";
import { useEffect } from "react";

const Articles = () => {
  const { posts, userPosts, setPosts, setUserPosts } = useContext(UserContext);

  useEffect(() => {
    document.title = "Posts - Readnow";
  }, []);

  const handleDelete = async (id) => {
    try {
      const post = await deleteUserPost(id);

      const currentPosts = userPosts.filter((post) => post._id !== id);
      const allPost = posts.filter((post) => post._id !== id);
      setUserPosts(currentPosts);
      setPosts(allPost);
      toast.success(`"${post.title}" has been deleted!`);
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="posts-table">
      <div className="card">
        <div className="card-header">
          <h5 className="m-0">Articles</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Date Published</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {userPosts.length > 0 ? (
                  userPosts.map((post, i) => (
                    <tr key={post._id}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <Link
                          to={{
                            pathname: `/articles/${post.title
                              .toLowerCase()
                              .replace(/\s+/g, "_")}`,
                            state: { id: post._id },
                          }}
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td>
                        <Moment format="MMM D, YYYY">
                          {new Date(post.createdAt)}
                        </Moment>
                      </td>
                      <td>
                        <Moment format="MMM D, YYYY">
                          {new Date(post.updatedAt)}
                        </Moment>
                      </td>
                      <td>
                        <Link to={`/dashboard/articles/edit/${post._id}`}>
                          <i className="fas fa-pen mr-3"></i>
                        </Link>
                        <i
                          onClick={() => handleDelete(post._id)}
                          className="fas fa-trash-alt"
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <small className="text-muted">
                        No posts found.
                        <Link to="/dashboard/articles/add">
                          {" "}
                          Write one now!
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

export default Articles;
