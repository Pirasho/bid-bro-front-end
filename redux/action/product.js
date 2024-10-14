import HttpInterceptor from "../../services/HttpInterceptor.js";

const http = new HttpInterceptor();

export const GetProductDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/product/get`;
  try {
    http
      .get(endpoint)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error.response);
      });
      
  } catch (error) {
    callback(error.response);
  }
};
