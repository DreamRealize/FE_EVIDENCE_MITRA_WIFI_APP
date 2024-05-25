// src/services/orderService.js
import axios from "axios";
import config from "../../config/config";

export const updateOrderApi = async (idOrder, orderData) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.put(
         `${config.localDomain}/order/update/${idOrder}`,
         orderData
      );
      return response.data;
   } catch (error) {
      throw error;
   }
};
