import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { toast } from "react-toastify";

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
import Checkbox from "../../common/Checkbox";
import Input from "../../common/Input";
import DraftInput from "../../common/DraftInput";
import Button from "../../common/Button";
import "./AddPost.css";
import Select from "../../common/Select";
import FileInput from "../../common/FileInput";
import Image from "../../common/Image";

const AddPost = (props) => {
  const { userPosts, posts, setUserPosts, setPosts } = useContext(UserContext);

  const [currentPost, setCurrentPost] = useState({
    title: "",
    summary: "",
    category: "",
    isFeatured: false,
  });
  const [editPost, setEditPost] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [thumbnail, setThumbnail] = useState("");
  const [preview, setPreview] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const history = useHistory();
  const id = props.match.params.id;

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
      setCurrentPost({
        title: editPost.title,
        summary: editPost.summary,
        category: editPost.category,
        isFeatured: editPost.isFeatured,
        content: editPost.content,
        thumbnail: editPost.thumbnail,
      });
      setPreview(`${apiUrl}/posts/${id}/thumbnail`);

      const fromRaw = convertFromRaw(JSON.parse(editPost.content));
      setEditorState(EditorState.createWithContent(fromRaw));
    }

    if (!id) {
      setCurrentPost({
        title: "",
        summary: "",
        category: "",
        isFeatured: false,
      });
      setEditorState(EditorState.createEmpty());
    }
  }, [editPost]);

  const handleAdd = async () => {
    setIsPublishing(true);
    const data = new FormData();
    data.append("file", thumbnail);

    try {
      const res = await createPost(currentPost, data);
      const post = await getPost(res._id);

      // UPDATE GLOBAL STATE
      setUserPosts([...userPosts, post]);
      setPosts([...posts, post]);

      // EMPTY THUMBNAIL IMAGE
      setThumbnail("");
      setPreview("");

      setIsPublishing(false);
      toast.success(`${post.title} has been published!`);
      history.push("/projects/readnow/dashboard/articles");
    } catch (e) {
      toast.error("Something's happened. Please try again.");
    }
  };

  const handleUpdate = async () => {
    setIsPublishing(true);

    try {
      // REQUEST ONLY IF THUMBNAIL HAS BEEN CHANGED/ADDED
      let data;
      if (thumbnail) {
        data = new FormData();
        data.append("file", thumbnail);
      }

      await updatePost(id, currentPost, thumbnail, data);

      // UPDATE POSTS AND USER'S POST IN GLOBAL STATE
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);

      const updatedUserPosts = await getUserPosts();
      setUserPosts(updatedUserPosts);

      // EMPTY THUMBNAIL IMAGE
      setThumbnail("");
      setPreview("");

      setIsPublishing(false);
      toast.success(`"${currentPost.title}" has been updated successfully!`);
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
            <Checkbox
              label="Set as Featured?"
              name="featured"
              checked={currentPost.isFeatured}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, isFeatured: e.target.checked })
              }
            />
          </div>
          <div className="card-body">
            <Input
              label="Title"
              name="title"
              placeholder="Title"
              value={currentPost.title}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, title: e.target.value })
              }
            />
            <Input
              label="Summary"
              name="summary"
              placeholder="Summary"
              value={currentPost.summary}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, summary: e.target.value })
              }
            />
            <DraftInput
              label="Content"
              name="content"
              editorState={editorState}
              currentPost={currentPost}
              setEditorState={setEditorState}
              setCurrentPost={setCurrentPost}
            />
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
                <Button
                  label={isPublishing ? "Updating..." : "Update"}
                  className="btn-sm btn-primary"
                  disabled={
                    currentPost.title === "" ||
                    currentPost.summary === "" ||
                    isPublishing
                      ? "disabled"
                      : false
                  }
                  onClick={handleUpdate}
                />
              ) : (
                <Button
                  label={isPublishing ? "Publishing..." : "Publish Now"}
                  className="btn-sm btn-primary"
                  disabled={
                    currentPost.title === "" ||
                    currentPost.summary === "" ||
                    isPublishing
                      ? "disabled"
                      : false
                  }
                  onClick={
                    currentPost.title === "" || currentPost.summary === ""
                      ? null
                      : handleAdd
                  }
                />
              )}
            </div>
          </div>
        </div>

        <div className="card post__category">
          <div className="card-header">
            <h6 className="m-0">Category</h6>
          </div>
          <div className="card-body">
            <Select
              name="category"
              className="custom-select"
              divClass="input-group mb-3"
              options={["Sports", "Food", "Lifestyle", "Politics"]}
              value={currentPost.category}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, category: e.target.value })
              }
            />
            <Button
              label="+ Add new category"
              className="btn-sm btn-link mt-2"
            />
          </div>
        </div>

        <div className="card post__thumbnail">
          <div className="card-header">
            <h6 className="m-0">Upload Thumbnail</h6>
          </div>
          <div className="card-body">
            <Image className="w-100 my-2" src={preview} />
            <FileInput
              label="Choose File"
              name="customFile"
              divClass="custom-file mt-1"
              onChange={(e) => handleFileSelect(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
