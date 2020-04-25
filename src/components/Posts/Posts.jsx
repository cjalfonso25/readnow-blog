import React, { useState, lazy, Suspense, useContext } from "react";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import UserContext from "../context/UserContext";

const DisplayArticles = lazy(() => import("./PostAll"));

const Posts = () => {
  const { posts } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const pageData = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="main-articles">
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center">
              <small className="text-muted">No posts available</small>
            </div>
          ) : (
            <div className="row">
              <Suspense fallback={<Spinner />}>
                <DisplayArticles pageData={pageData} />
              </Suspense>
            </div>
          )}

          <Pagination
            totalPosts={posts.length}
            currentPage={currentPage}
            postPerPage={postPerPage}
            paginate={paginate}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Posts;
