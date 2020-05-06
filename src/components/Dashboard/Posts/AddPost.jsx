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
            <Checkbox
              label="Set as Featured?"
              name="featured"
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          </div>
          <div className="card-body">
            <Input
              label="Title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Summary"
              name="summary"
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <DraftInput
              label="Content"
              name="content"
              editorState={editorState}
              setEditorState={setEditorState}
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
                    title == "" || summary == "" || isPublishing
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
                    title == "" || summary == "" || isPublishing
                      ? "disabled"
                      : false
                  }
                  onClick={title == "" || summary == "" ? null : handleAdd}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
