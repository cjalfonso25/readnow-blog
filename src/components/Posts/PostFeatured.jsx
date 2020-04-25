import React, { lazy, Suspense } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";

const Thumbnail = lazy(() => import("../common/Thumbnail"));

const DisplayFeatured = ({ pageData }) => {
  return (
    <>
      {pageData.map((post) => (
        <div key={post._id} className="col-12">
          <Link to={`/articles/${post._id}`}>
            <div className="article">
              <div className="row">
                <div className="col-12 col-md-6">
                  <Suspense fallback={<Spinner />}>
                    {post.thumbnail ? (
                      <Thumbnail image={post.thumbnail} />
                    ) : (
                      "Loading..."
                    )}

                    {/* <img
                      src={`http://localhost:5000/api/posts/${post._id}/thumbnail`}
                      alt=""
                    /> */}
                  </Suspense>
                </div>
                <div className="col-12 col-md-6">
                  <div className="article-content">
                    <div className="article-content-top">
                      <small className="article-category">
                        {post.category}
                      </small>
                      <h1 className="article-title">{post.title}</h1>
                      <p className="article-summary text-justify mt-3 d-none d-sm-none d-md-block">
                        {post.summary}
                      </p>
                      <button className="btn btn-primary d-none d-sm-none d-md-block">
                        Read more
                      </button>
                    </div>

                    <div className="article-content-bot">
                      <small className="article-date">
                        <Moment format="MMM D, YYYY">
                          {new Date(post.createdAt)}
                        </Moment>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default DisplayFeatured;
