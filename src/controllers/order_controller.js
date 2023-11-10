import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser, storeUser } from "../utils/local_storage";

export const addOrder = async (data) => {
    try {
      const user = getUser();
      const response = await axios.post(`${server_url}/order/${user.Business.uuid}`, data);
      return response.data.status;
    } catch (error) {
      console.log(error);
    }
  };

  export const getMyOrders = async (data) => {
    try {
      const user = getUser();
      const response = await axios.get(`${server_url}/order/user/${user.uuid}`, data);
      return response.data.body;
    } catch (error) {
      console.log(error);
    }
  };

  export const getBusinessOrders = async (data) => {
    try {
      const user = getUser();
      const response = await axios.get(`${server_url}/order/business/${user.Business.uuid}`, data);
      return response.data.body;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteOrder = async (uuid) => {
    try {
      const response = await axios.delete(`${server_url}/order/${uuid}`);
      return response.data.status;
    } catch (error) {
      console.log(error);
    }
  };
  

