import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.13:5000/api", // <-- apna IPv4 address
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
