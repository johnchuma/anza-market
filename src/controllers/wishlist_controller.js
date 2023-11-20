import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser, storeUser } from "../utils/local_storage";
import { headers } from "../utils/headers";

export const addWishlist = async (product_uuid) => {
    try { 
    
      const response = await axios.post(`${server_url}/wishlist/${product_uuid}`, {},{
        headers
      });
      return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
  export const getUserWishlists = async () => {
    try { 
      const response = await axios.get(`${server_url}/wishlist/`,{
        headers
      });
      return response.data.body
    } catch (error) {
      console.log(error);
    }
  };
  export const checkIfProductIsAddedToWishlist = async (product_uuid) => {
    try { 
     const response = await axios.get(`${server_url}/wishlist/product/${product_uuid}`,{
      headers
     });
     return response.data.body
    } catch (error) {
      console.log(error);
    }
  };
  export const deleteWishlist = async (uuid) => {
    try {
     const response = await axios.delete(`${server_url}/wishlist/${uuid}`,{
      headers
     });
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
  

