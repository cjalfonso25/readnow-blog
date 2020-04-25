import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Thumbnail from "../common/Thumbnail";

const DisplayArticles = ({ pageData }) => {
  return (
    <>
      {pageData.map((post) => (
        <div key={post._id} className="col-12 col-md-4">
          <Link to={`/articles/${post._id}`}>
            <div className="article">
              {post.thumbnail ? (
                <Thumbnail className="w-100" image={post.thumbnail} />
              ) : (
                "Loading..."
              )}
              <small className="article-category">{post.category}</small>
              <h1 className="article-title">{post.title}</h1>
              <small className="article-date">
                <Moment format="MMM D, YYYY">{new Date(post.updatedAt)}</Moment>
              </small>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default DisplayArticles;
