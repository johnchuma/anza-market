import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";


export const addProduct = async (data,imageFiles) => {
    try {
     const user = getUser();
     const response = await axios.post(`${server_url}/product/${user.Business.uuid}`, data);
     console.log(response.data.body.id)
      for (let index = 0; index < imageFiles.length; index++) {
         let formData = new FormData();
         formData.append("file",imageFiles[index])
         console.log(formData)
         await axios.post(`${server_url}/product-image/${response.data.body.uuid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
      }
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProduct = async (data,uuid) => {
    try {
      let formData = new FormData();
     
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

 export const getProducts = async()=>{
  try {
   
   const response = await axios.get(`${server_url}/product`)
   console.log(response.data)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}