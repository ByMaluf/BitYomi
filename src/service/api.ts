import axios from "axios";

const api = axios.create({
  baseURL: "https://mangadex-proxy-seven.vercel.app",
});

export default api;
