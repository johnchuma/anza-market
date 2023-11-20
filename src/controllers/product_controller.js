import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";
import { headers } from "../utils/headers";


export const addProduct = async (data,imageFiles) => {
    try {
     const user = getUser();
      console.log(user.Business.uuid);
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

 export const getProducts = async({page,limit})=>{
  try {
   
   const response = await axios.get(`${server_url}/product/?page=${page}&limit=${limit}`,{
    headers
   })
   console.log(response.data)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
export const searchProducts = async(keyword,page,limit)=>{
  try {
   const response = await axios.get(`${server_url}/product/search/${keyword}/?page=${page}&limit=${limit}`)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}

export const getSectorProducts = async(uuid,page,limit)=>{
  try {
   const response = await axios.get(`${server_url}/product/business_sector/${uuid}/?page=${page}&limit=${limit}`)
   return response.data.body
  } catch (error) {
   console.log(error)
  }
}
export const getProduct = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/product/${uuid}`)
   return response.data.body
  } catch (error) {
   console.log(error)
  }
}
export const getFeaturedProducts = async()=>{
  try {
   const response = await axios.get(`${server_url}/product/featured`)
   return response.data.body
  } catch (error) {
   console.log(error)
  }
}
export const getTopSelling = async()=>{
  try {
   const response = await axios.get(`${server_url}/product/top_selling`)
   return response.data.body
  } catch (error) {
   console.log(error)
  }
}

export const getTopRated = async()=>{
  try {
   const response = await axios.get(`${server_url}/product/top_rated`)
   return response.data.body
  } catch (error) {
   console.log(error)
  }
}