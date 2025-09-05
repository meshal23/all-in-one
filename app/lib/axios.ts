import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    // "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
  },
});

export default axiosInstance;
