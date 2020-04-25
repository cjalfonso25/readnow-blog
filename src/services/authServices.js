import jwtDecode from "jwt-decode";
import axios from "axios";
import { apiUrl } from "../config.json";

const tokenKey = "auth";

export const getAuthor = async (id) => {
  const { data } = await axios.get(`${apiUrl}/users/author/${id}`);

  return data;
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export const login = async (email, password) => {
  const credentials = {
    email,
    password,
  };
  const { data } = await axios.post(`${apiUrl}/users/login`, credentials);
  localStorage.setItem("auth", data.token);
  return data;
};

export const logout = async () => {
  axios({
    method: "post",
    url: `${apiUrl}/users/logout`,
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
  localStorage.removeItem(tokenKey);
};

export default {
  getAuthor,
  getCurrentUser,
  getJwt,
  login,
  logout,
};
