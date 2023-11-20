import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";


export const addBusiness = async (data) => {
    try { 
        const user = getUser();
      const response = await axios.post(`${server_url}/business/${user.uuid}`, data);
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
  export const getMyBusiness = async () => {
    try { 
        const user = getUser();
      const response = await axios.get(`${server_url}/business/user/${user.uuid}`);
     return response.data
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getBusinessApplications = async () => {
    try { 
        const user = getUser();
      const response = await axios.get(`${server_url}/business/applications/`);
     return response.data.body
    } catch (error) {
      console.log(error);
    }
  };
  export const updateBusiness = async (data,uuid) => {
    try {
      
      const response = await axios.patch(`${server_url}/business/${uuid}`,data);
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };

 export const getProduct = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/product/${uuid}`)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}