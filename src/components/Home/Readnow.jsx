import React, { useState, lazy, Suspense, useContext } from "react";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import UserContext from "../context/UserContext";

const DisplayFeatured = lazy(() => import("../Posts/PostFeatured"));

const Readnow = () => {
  const { posts } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);

  const featuredPosts = posts.filter((post) => post.isFeatured === true);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const pageData = featuredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="main">
        <div className="container">
          <h1 className="title">Readnow</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="featured-articles">
        <div className="container">
          <Suspense fallback={<Spinner />}>
            <div className="row">
              <DisplayFeatured pageData={pageData} />
            </div>

            <Pagination
              totalPosts={featuredPosts.length}
              currentPage={currentPage}
              postPerPage={postPerPage}
              paginate={paginate}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Readnow;
