import axios from "axios";
import config from "../../config/config";

export const getOrderApi = async (page = 1) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.get(`${config.localDomain}/order`, {
         params: {
            page: page,
         },
      });
      return response.data;
   } catch (error) {
      throw error;
   }
};
