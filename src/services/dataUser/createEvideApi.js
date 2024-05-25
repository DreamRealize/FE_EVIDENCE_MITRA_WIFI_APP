// services/pemasukanApi.js

import axios from "axios";
import config from "../../config/config";

export const createEvideApi = async (formData) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.post(
         `${config.localDomain}/eviden/create`,
         formData
      );
      return response.data;
   } catch (error) {
      throw error;
   }
};
