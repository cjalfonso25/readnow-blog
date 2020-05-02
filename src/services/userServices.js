import axios from "axios";
import { getJwt } from "./authServices";
import { apiUrl } from "../config.json";

export const getUsers = async () => {
  const { data } = await axios.get(`${apiUrl}/users`, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return data;
};

export const getProfile = async () => {
  const { data } = await axios.get(`${apiUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return data;
};

export const updateProfile = async (updates) => {
  const { data } = await axios.patch(`${apiUrl}/users/me`, updates, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return data;
};

export const uploadAvatar = async (data) => {
  const { data: user } = await axios.post(`${apiUrl}/users/me/avatar`, data, {
    headers: {
      Authorization: `Bearer ${getJwt()}`,
    },
  });

  return user.avatar;
};

export const createUser = async (user) => {
  const { data } = await axios.post(`${apiUrl}/users`, user);

  return data;
};

export default {
  getProfile,
  updateProfile,
  uploadAvatar,
};
