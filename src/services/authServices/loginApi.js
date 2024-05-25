import axios from "axios";
import config from "../../config/config";

export const loginApi = async (usernameId, password) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.post(`${config.localDomain}/login`, {
         usernameId,
         password,
      });
      return response.data;
   } catch (error) {
      throw error;
   }
};
