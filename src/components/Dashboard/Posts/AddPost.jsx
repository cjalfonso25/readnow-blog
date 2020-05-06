import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { toast } from "react-toastify";
import { BLOCK_TYPES, INLINE_STYLES } from "../../../utils/richUtils";
import {
  getUserPost,
  createPost,
  updatePost,
  getPosts,
  getPost,
  getUserPosts,
} from "../../../services/postServices";
import { apiUrl } from "../../../config.json";
import UserContext from "../../context/UserContext";
import "./AddPost.css";

const AddPost = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [editPost, setEditPost] = useState("");
  const [preview, setPreview] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const history = useHistory();
  const id = props.match.params.id;

  const { userPosts, posts, setUserPosts, setPosts } = useContext(UserContext);

  useEffect(() => {
    document.title = "Add New Post - Readnow";
    async function fetchData() {
      const post = await getUserPost(id);
      setEditPost(post);
    }

    if (id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (editPost._id) {
      setTitle(editPost.title);
      setSummary(editPost.summary);
      setCategory(editPost.category);
      setIsFeatured(editPost.isFeatured);
      setPreview(`${apiUrl}/posts/${id}/thumbnail`);

      const fromRaw = convertFromRaw(JSON.parse(editPost.content));
      setEditorState(EditorState.createWithContent(fromRaw));
    }

    if (!id) {
      setTitle("");
      setSummary("");
      setEditorState(EditorState.createEmpty());
      setCategory("");
    }
  }, [editPost]);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
    }
  };

  const toggleInlineStyle = (e) => {
    e.preventDefault();
    let style = e.target.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockStyle = (e) => {
    let style = e.target.getAttribute("data-style");
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const editor = useRef(null);

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "code-block") {
      return "code-block";
    }

    if (type === "blockquote") {
      return "blockquote";
    }
  };

  const handleAdd = async () => {
    setIsPublishing(true);
    const data = new FormData();
    data.append("file", thumbnail);

    const obj = {
      title: title,
      summary: summary,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      category: category,
      isFeatured,
    };

    try {
      const res = await createPost(obj, data);
      const post = await getPost(res._id);

      setUserPosts([...userPosts, post]);
      setPosts([...posts, post]);
      toast.success(`${post.title} has been published!`);
      setThumbnail("");
      setPreview("");
      setIsPublishing(false);
      history.push("/projects/readnow/dashboard/articles");
    } catch (e) {
      toast.error("Something's happened. Please try again.");
    }
  };

  const handleUpdate = async () => {
    setIsPublishing(true);

    try {
      const data = new FormData();

      editPost.title = title;
      editPost.summary = summary;
      editPost.content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      editPost.category = category;
      editPost.isFeatured = isFeatured;

      // REQUEST ONLY IF THUMBNAIL HAS BEEN CHANGED/ADDED
      if (thumbnail) {
        data.append("file", thumbnail);
      }

      await updatePost(id, editPost, thumbnail, data);

      //update posts and userposts in context
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);

      const updatedUserPosts = await getUserPosts();
      setUserPosts(updatedUserPosts);

      setThumbnail("");
      setPreview("");
      setIsPublishing(false);
      toast.success(`"${title}" has been updated successfully!`);
      history.push("/projects/readnow/dashboard/articles");
    } catch (e) {
      toast.error("Something's happened. Please try again.");
    }
  };

  const handleFileSelect = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setThumbnail(e.target.files[0]);
  };

  return (
    <div className="row">
      <div className="col-12 col-md-8">
        <div className="card post__add">
          <div className="card-header d-flex justify-content-between">
            <h6 className="m-0">{!id ? "Add New Post" : "Edit Post"}</h6>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="featured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <label className="custom-control-label" htmlFor="featured">
                Set as Featured?
              </label>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Summary</label>
              <input
                type="text"
                className="form-control"
                id="summary"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div onClick={() => focusEditor()} className="form-group">
              <label htmlFor="content">Content</label>
              <div className="content-editor">
                <div className="controls-wrapper">
                  {/* BLOCK TYPES CONTROLS */}
                  {BLOCK_TYPES.map((type) => (
                    <button
                      key={type.label}
                      onMouseDown={(e) => toggleBlockStyle(e)}
                      data-style={type.style}
                      className="btn"
                    >
                      {type.label}
                    </button>
                  ))}

                  {/* INLINE STYLES CONTROLS */}
                  {INLINE_STYLES.map((type) => (
                    <button
                      key={type.label}
                      onMouseDown={(e) => toggleInlineStyle(e)}
                      data-style={type.style}
                      className="btn"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <Editor
                  placeholder="Enter your content here"
                  ref={editor}
                  editorState={editorState}
                  blockStyleFn={(contentBlock) => myBlockStyleFn(contentBlock)}
                  handleKeyCommand={(command) => handleKeyCommand(command)}
                  onChange={(editorState) => setEditorState(editorState)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card post__publish">
          <div className="card-header">
            <h6 className="m-0">Publish</h6>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <button className="btn btn-sm btn-outline-danger">Discard</button>
              {id ? (
                <button
                  onClick={() => handleUpdate()}
                  className="btn btn-sm btn-primary"
                  disabled={
                    title == "" || summary == "" || isPublishing
                      ? "disabled"
                      : false
                  }
                >
                  {isPublishing ? "Updating..." : "Update"}
                </button>
              ) : (
                <button
                  onClick={
                    title == "" || summary == "" ? null : () => handleAdd()
                  }
                  className="btn btn-sm btn-primary"
                  disabled={
                    title == "" || summary == "" || isPublishing
                      ? "disabled"
                      : false
                  }
                >
                  {isPublishing ? "Publishing..." : "Publish Now"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card post__category">
          <div className="card-header">
            <h6 className="m-0">Category</h6>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <select
                className="custom-select"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option defaultValue>Choose...</option>
                <option value="Sports">Sports</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Politics">Politics</option>
              </select>
            </div>
            <button className="btn btn-sm btn-link mt-2">
              + Add new category
            </button>
          </div>
        </div>

        <div className="card post__thumbnail">
          <div className="card-header">
            <h6 className="m-0">Upload Thumbnail</h6>
          </div>
          <div className="card-body">
            <img className="w-100 my-2" src={preview} alt="" />

            <div className="custom-file mt-1">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={(e) => handleFileSelect(e)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose file
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
