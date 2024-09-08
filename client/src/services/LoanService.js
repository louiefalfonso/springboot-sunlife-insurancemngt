import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_LOANS;

const LoanService = {
  addNewLoan(id) {
    return axios.post(API_BASE_URL, id);
  },

  getAllLoans: async () => {
    return axios.get(API_BASE_URL);
  },

  getLoanById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  },

  updateCurrentLoan(currentLoan, id) {
    return axios.put(`${API_BASE_URL}/${id}`, currentLoan);
  },

  deleteLoan(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  },
};


export default LoanService
