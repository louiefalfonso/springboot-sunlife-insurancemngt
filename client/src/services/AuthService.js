import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;

const AuthService = {
  register(user) {
    return axios.post(`${API_BASE_URL}/register`, user);
  },

  login(user) {
    return axios.post(`${API_BASE_URL}/login`, user);
  },
};

export default AuthService