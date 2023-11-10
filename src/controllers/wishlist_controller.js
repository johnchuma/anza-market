import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser, storeUser } from "../utils/local_storage";

export const addWishlist = async (data) => {
    try { 
      const user = getUser();
      const response = await axios.post(`${server_url}/wishlist/${user.Business.uuid}`, data);
      return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteWishlist = async (uuid) => {
    try {
      const response = await axios.delete(`${server_url}/wishlist/${uuid}`);
     return response.data.status
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

