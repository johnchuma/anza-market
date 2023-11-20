import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";
import { headers } from "../utils/headers";


export const addSector = async (data) => {
    try { 
      const response = await axios.post(`${server_url}/sector/`, data,{
        headers
      });
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };

  export const getSectors = async () => {
    try {
    const response = await axios.get(`${server_url}/sector/`,{
      headers
    });
     return response.data.body
    } catch (error) {
      console.log(error);
    }
  };
  export const deleteSector = async (uuid) => {
    try { 
    const response = await axios.delete(`${server_url}/sector/${uuid}`,{
      headers
    });
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProduct = async (data,uuid) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.patch(`${server_url}/product/${uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };

 export const deleteBusinessCategory = async(uuid)=>{
  try {
   const response = await axios.delete(`${server_url}/category/${uuid}`)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}