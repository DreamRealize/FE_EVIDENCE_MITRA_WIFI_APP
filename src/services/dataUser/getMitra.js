// src/services/catJenisBankApi.js
import axios from "axios";
import config from "../../config/config";

export const getMitra = async (page = 1) => {
	// eslint-disable-next-line no-useless-catch
	try {
		const response = await axios.get(
			`${config.localDomain}/mitra`,
			{
				params: {
					page: page,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
