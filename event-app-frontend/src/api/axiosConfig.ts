import axios from "axios";

const api = axios.create({
  baseURL: "https://event-api.sparcky-dev.fr",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
