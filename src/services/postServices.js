import axios from "axios";
import { apiUrl } from "../config.json";
import { getJwt } from "./authServices";

export const getUserPosts = async () => {
  const { data } = await axios.get(`${apiUrl}/posts`, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return data;
};

export const getUserPost = async (id) => {
  const { data } = await axios.get(`${apiUrl}/posts/me/${id}`, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return data;
};

export const deleteUserPost = async (id) => {
  const { data } = await axios.delete(`${apiUrl}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return data;
};

export const getPosts = async () => {
  const { data } = await axios.get(`${apiUrl}/posts/all`);
  return data;
};

export const getPost = async (postId) => {
  const { data } = await axios.get(`${apiUrl}/posts/${postId}`);
  return data;
};

export const createPost = async (post, thumbnail) => {
  const { data } = await axios.post(`${apiUrl}/posts`, post, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  await axios.put(`${apiUrl}/posts/thumbnail/${data._id}`, thumbnail, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return data;
};

export const updatePost = async (id, post, thumbnail, image) => {
  await axios.put(`${apiUrl}/posts/${id}`, post, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  if (image !== undefined) {
    await axios.put(`${apiUrl}/posts/thumbnail/${id}`, image, {
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    });
  }
};

export default {
  getUserPosts,
  getUserPost,
  deleteUserPost,
  getPosts,
  getPost,
};
