/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "../../config/config";

export const getMeApi = async () => {
   try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.localDomain}/me`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      throw error;
   }
};
