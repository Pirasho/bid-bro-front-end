import HttpInterceptor from "../../services/HttpInterceptor.js";

const http = new HttpInterceptor();

export const getAllSellerbid = (callback) => {
  const endpoint = `${process.env.api_base_url}/sellerbid/get`;
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

export const postAllSellerbid = (data,callback) => {
  const endpoint = `${process.env.api_base_url}/sellerbid/post`;
  try {
    http
      .post(endpoint,data)
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
