// axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "https://localhost:3000", // Replace with your API base URL
   timeout: 120000, // Timeout for requests in milliseconds
   headers: {
      "Content-Type": "application/json",
      // Add any other default headers here
   },
});

//  Add specific headers for POST requests
axiosInstance.defaults.headers.post["Content-Type"] =
   "application/x-www-form-urlencoded";

export default axiosInstance;
