// First we need to import axios.js
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://99bac19acf0e.ngrok.io"
});

export default axiosInstance;
