import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser, storeUser } from "../utils/local_storage";
import { headers } from "../utils/headers";

export const addOrder = async (data) => {
    try {
      const user = getUser();
      const response = await axios.post(`${server_url}/order/${user.Business.uuid}`, data,
      {
        headers
      });
      return response.data.status;
    } catch (error) {
      console.log(error);
    }
  };
  export const updateOrderProduct = async (product_uuid,data) => {
    try {
      // const user = getUser();
      const response = await axios.patch(`${server_url}/order/${product_uuid}`, data,{
        headers
      });
      return response.data.status;
    } catch (error) {
      console.log(error);
    }
  };
  export const getMyOrders = async () => {
    try {
      const response = await axios.get(`${server_url}/order/`,{
        headers
      });
      return response.data.body;
    } catch (error) {
      console.log(error);
    }
  };

  export const getSellerOrders = async (uuid) => {
    try {
      const response = await axios.get(`${server_url}/order/business/${uuid}`,{
        headers
      });
      // alert(response.data.body.OrderRequests.length)
      return response.data.body;
    } catch (error) {
      console.log(error);
    }
  };


  export const getBusinessOrders = async () => {
    try {
      const user = getUser();
      const response = await axios.get(`${server_url}/order/business/${user.Business.uuid}`,{
        headers
      });
      return response.data.body;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteOrder = async (uuid) => {
    try {
      const response = await axios.delete(`${server_url}/order/${uuid}`,{
        headers
      });
      return response.data.status;
    } catch (error) {
      console.log(error);
    }
  };
  

