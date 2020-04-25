import React from "react";
import _ from "lodash";

const Pagination = ({ totalPosts, currentPage, postPerPage, paginate }) => {
  const pagesCount = Math.ceil(totalPosts / postPerPage);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="pagination">
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => paginate(page)} className="page-link" href="# ">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
