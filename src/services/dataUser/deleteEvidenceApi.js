import axios from "axios";
import config from "../../config/config";

export const deleteEvidenceApi = async (idEviden) => {
   try {
      const response = await axios.delete(
         `${config.localDomain}/eviden/${idEviden}`
      );
      return response.data;
   } catch (error) {
      throw new Error(error.response.data.error || "Failed to delete eviden");
   }
};
