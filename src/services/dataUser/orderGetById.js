import axios from "axios";
import config from "../../config/config";

export const orderGetById = async (orderId) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.get(
         `${config.localDomain}/order/${orderId}`
      );
      return response.data;
   } catch (error) {
      throw error;
   }
};
