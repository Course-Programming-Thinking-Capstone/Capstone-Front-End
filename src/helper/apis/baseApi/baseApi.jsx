import axios from "axios";

const url = "https://www.kidpro-production.somee.com/";
// const url = "https://localhost:7200/";

const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

// config request Authenticate header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
