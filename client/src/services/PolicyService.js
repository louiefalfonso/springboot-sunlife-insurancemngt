import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_POLICY;

const PolicyService = {
    
  addNewPolicy(id) {
    return axios.post(API_BASE_URL, id);
  },

  getAllPolicies: async () => {
    return axios.get(API_BASE_URL);
  },

  getPolicyById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  },

  updateCurrentPolicy(currentPolicy, id) {
    return axios.put(`${API_BASE_URL}/${id}`, currentPolicy);
  },

  deletePolicy(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  },
};


export default PolicyService