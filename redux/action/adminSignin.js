import HttpInterceptor from "../../services/HttpInterceptor.js";

const http = new HttpInterceptor();

export const AdminLoginMethod = async (data, callback) => {
  const endpoint = `${process.env.api_base_url}/api/login/admin`;

  try {
    // Perform the POST request using async/await
    const response = await http.post(endpoint, data);
    // Call the callback function with the response data
    callback(response);
  } catch (error) {
    // Handle and pass the error response to the callback
    if (error.response) {
      callback(error.response);
    } else {
      callback({
        message: 'Network error or server unreachable',
        details: error.message,
      });
    }
  }
};
