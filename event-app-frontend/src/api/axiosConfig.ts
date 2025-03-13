import axios from "axios";

const api = axios.create({
  baseURL: "http://147.93.55.31:5002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
