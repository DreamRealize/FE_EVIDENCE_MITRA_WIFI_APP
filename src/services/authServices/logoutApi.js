import axios from "axios";
import config from "../../config/config";

export const logoutApi = async (token) => {
   try {
      const response = await axios.post(
         `${config.localDomain}/users/logout`,
         null,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      return response.data;
   } catch (error) {
      throw error.response.data;
   }
};
