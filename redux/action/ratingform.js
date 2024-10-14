import HttpInterceptor from "../../services/HttpInterceptor.js";

const http = new HttpInterceptor();

export const GetReviewrate = (callback) => {
  const endpoint = `${process.env.api_base_url}/review/get`;
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

export const AddReviewrate = (data,callback) => {
  const endpoint = `${process.env.api_base_url}/review/post`;
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
