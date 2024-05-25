import axios from "axios";
import config from "../../config/config";

export const registerApi = async (usernameId, nama, idUserRoles, password) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.post(`${config.localDomain}/register`, {
         usernameId,
         nama,
         idUserRoles,
         password,
      });
      return response.data;
   } catch (error) {
      throw error;
   }
};
