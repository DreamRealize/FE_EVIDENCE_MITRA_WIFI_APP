import axios from "axios";
import config from "../../config/config";

export const evidenceGetById = async (idEviden) => {
   // eslint-disable-next-line no-useless-catch
   try {
      const response = await axios.get(
         `${config.localDomain}/eviden/${idEviden}`
      );
      return response.data;
   } catch (error) {
      throw error;
   }
};
