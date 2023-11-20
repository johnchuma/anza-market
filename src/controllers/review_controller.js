import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser, storeUser } from "../utils/local_storage";

export const sendReview = async (data) => {
    try { 
     
      const response = await axios.post(`${server_url}/review/`, data);
      console.log(response.data)
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };