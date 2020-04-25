import axios from "axios";
import { getJwt } from "./authServices";
import { apiUrl } from "../config.json";

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

export default {
  getProfile,
  updateProfile,
  uploadAvatar,
};
