// src/services/orderService.js
import axios from "axios";
import config from "../../config/config";

export const updateEvidenceApi = async (idEviden, evidenData) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.put(
         `${config.localDomain}/eviden/update/${idEviden}`,
         evidenData
      );
      return response.data;
   } catch (error) {
      throw error;
   }
};
