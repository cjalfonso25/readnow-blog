import React, { useEffect } from "react";

const Main = () => {
  useEffect(() => {
    document.title = "Dashboard - Readnow";
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="statistics statistics__views">
                    <i className="far fa-eye"></i>
                    <h2 className="statistics__value">2,225</h2>
                    <h6 className="statistics__title">Views</h6>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="statistics statistics__likes">
                    <i className="far fa-thumbs-up"></i>
                    <h2 className="statistics__value">2,225</h2>

                    <h6 className="statistics__title">Likes</h6>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="statistics statistics__comments">
                    <i className="far fa-comments"></i>
                    <h2 className="statistics__value">2,225</h2>

                    <h6 className="statistics__title">Comments</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-md-6 col-lg-4 mt-2">
          <div className="card">
            <div className="card-body">
              <small className="text-muted">Most Viewed Post</small>
              <div className="post__most-views mt-2">
                <img
                  className="w-100"
                  src="/assets/img/burger-and-vegetables-placed-on-brown-wood-surface-1565982.jpg"
                  alt=""
                />

                <div className="post__details">
                  <h5 className="mt-2 mb-0">Lorem Ipsum</h5>
                  <p className="text-justify m-0">
                    Suspendisse faucibus interdum posuere lorem. Sapien faucibus
                    et molestie ac feugiat sed. Nisi lacus sed viverra tellus in
                    hac habitasse. Ut morbi tincidunt augue interdum velit
                    euismod. Volutpat odio facilisis mauris sit amet massa
                    vitae.
                  </p>
                  <div className="text-right mt-2">
                    <small className="text-muted">721 Views</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mt-2">
          <div className="card">
            <div className="card-body">
              <small className="text-muted">Most Liked Post</small>

              <div className="post__most-views mt-2">
                <img
                  className="w-100"
                  src="/assets/img/football-player-carrying-brown-football-1618269.jpg"
                  alt=""
                />

                <div className="post__details">
                  <h5 className="mt-2 mb-0">Lorem Ipsum</h5>
                  <p className="text-justify m-0">
                    Suspendisse faucibus interdum posuere lorem. Sapien faucibus
                    et molestie ac feugiat sed. Nisi lacus sed viverra tellus in
                    hac habitasse. Ut morbi tincidunt augue interdum velit
                    euismod. Volutpat odio facilisis mauris sit amet massa
                    vitae.
                  </p>
                  <div className="text-right mt-2">
                    <small className="text-muted">721 Likes</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mt-2">
          <div className="card">
            <div className="card-body">
              <small className="text-muted">Most Commented Post</small>

              <div className="post__most-views mt-2">
                <img
                  className="w-100"
                  src="/assets/img/man-riding-bicycle-on-city-street-310983.jpg"
                  alt=""
                />

                <div className="post__details">
                  <h5 className="mt-2 mb-0">Lorem Ipsum</h5>
                  <p className="text-justify m-0">
                    Suspendisse faucibus interdum posuere lorem. Sapien faucibus
                    et molestie ac feugiat sed. Nisi lacus sed viverra tellus in
                    hac habitasse. Ut morbi tincidunt augue interdum velit
                    euismod. Volutpat odio facilisis mauris sit amet massa
                    vitae.
                  </p>
                  <div className="text-right mt-2">
                    <small className="text-muted">721 Comments</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
