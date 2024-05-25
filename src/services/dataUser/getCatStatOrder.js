// src/services/catJenisBankApi.js
import axios from "axios";
import config from "../../config/config";

export const getCatStatOrder = async () => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.get(`${config.localDomain}/catstatusorder`);
      return response.data;
   } catch (error) {
      throw error;
   }
};
