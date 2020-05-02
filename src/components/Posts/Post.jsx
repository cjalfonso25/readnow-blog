import React, { useState, useEffect, lazy, Suspense } from "react";
import { Editor, convertFromRaw, EditorState } from "draft-js";
import { getPost } from "../../services/postServices";
import { getAuthor } from "../../services/authServices";
import Moment from "react-moment";
import Spinner from "../common/Spinner";
import Loader from "react-loader-spinner";
import "./Posts.css";

const Avatar = lazy(() => import("../common/Avatar"));

const Post = (props) => {
  const [post, setPost] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const postId = props.location.state.id;

  useEffect(() => {
    async function fetchData() {
      const post = await getPost(postId);
      setPost(post);
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const user = await getAuthor(post.owner);
      setAuthor(user);
    }

    if (post) {
      const fromRaw = convertFromRaw(JSON.parse(post.content));
      setEditorState(EditorState.createWithContent(fromRaw));

      fetchData();
    }
  }, [post]);

  return (
    <div className="main-article">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            {isLoading ? (
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            ) : (
              <>
                <img
                  src={`http://localhost:5000/api/posts/${post._id}/thumbnail`}
                  className="w-100"
                  alt=""
                />

                <div className="article-header my-2">
                  <h1 className="m-0">{post.title}</h1>
                  <small className="text-muted">
                    Pubished:{" "}
                    <Moment format="MMMM D, YYYY">
                      {new Date(post.updatedAt)}
                    </Moment>
                  </small>
                </div>

                <div className="article-content">
                  <Editor editorState={editorState} readOnly={true} />

                  <div className="share-social text-right">
                    <a href="# ">
                      <i className="fab fa-facebook-square fa-2x"></i>
                    </a>
                    <a href="# ">
                      <i className="fab fa-twitter-square fa-2x"></i>
                    </a>
                    <a href="# ">
                      <i className="fab fa-instagram-square fa-2x"></i>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="col-12 col-md-4">
            <div className="card">
              <Suspense fallback={<Spinner />}>
                {author ? (
                  <Avatar
                    preview={`http://localhost:5000/api/users/${post.owner}/avatar`}
                    className="card-img-top"
                  />
                ) : null}
              </Suspense>
              <div className="card-body">
                <h5 className="card-title">{author ? author.name : ""}</h5>
                <small>{author ? author.title : ""}</small>
                <p className="card-text">{author ? author.about : ""}</p>
                <a href={author ? author.social.facebook : "# "}>
                  <i className="fab fa-facebook-square fa-2x"></i>
                </a>
                <a href={author ? author.social.twitter : "# "}>
                  <i className="fab fa-twitter-square fa-2x"></i>
                </a>
                <a href={author ? author.social.instagram : "# "}>
                  <i className="fab fa-instagram-square fa-2x"></i>
                </a>
              </div>
            </div>

            <ul className="list-group mt-4">
              <li className="list-group-item list-group-item-dark">
                Other articles by Author
              </li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>

            <ul className="list-group mt-3">
              <li className="list-group-item list-group-item-dark">
                You Might also Like
              </li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
