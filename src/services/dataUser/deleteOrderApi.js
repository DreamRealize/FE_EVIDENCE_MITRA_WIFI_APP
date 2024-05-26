import axios from "axios";
import config from "../../config/config";

export const deleteOrderApi = async (idOrder) => {
   try {
      const response = await axios.delete(
         `${config.localDomain}/order/${idOrder}`
      );
      return response.data;
   } catch (error) {
      throw new Error(error.response.data.error || "Failed to delete order");
   }
};
