import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_CLIENTS;

const ClientService = {

  createClient(id) {
    return axios.post(API_BASE_URL, id);
  },

  getAllClients: async ()=> {
    return axios.get(API_BASE_URL);

  },

  getClientById(id){
    return axios.get(`${API_BASE_URL}/${id}`);
  },

  updateCurrentClient(currentClient, id){
    return axios.put(`${API_BASE_URL}/${id}`, currentClient);
  },

  deleteClient(id){
    return axios.delete(`${API_BASE_URL}/${id}`);
  }

};

export default ClientService