import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_CLAIMS;

const ClaimService = {

  createClaim(id) {
    return axios.post(API_BASE_URL, id);
  },

  getAllClaims: async () => {
    return axios.get(API_BASE_URL);
  },

  getClaimById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  },

  updateCurrentClaim(currentClaim, id) {
    return axios.put(`${API_BASE_URL}/${id}`, currentClaim);
  },

  deleteClaim(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
 
};


export default ClaimService