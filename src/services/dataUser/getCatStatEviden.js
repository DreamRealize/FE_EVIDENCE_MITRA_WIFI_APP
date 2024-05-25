// src/services/catJenisBankApi.js
import axios from "axios";
import config from "../../config/config";

export const getCatStatEviden = async () => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.get(`${config.localDomain}/cateviden`);
      return response.data;
   } catch (error) {
      throw error;
   }
};
