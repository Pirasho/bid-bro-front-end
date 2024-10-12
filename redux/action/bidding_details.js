import HttpInterceptor from "../../services/HttpInterceptor.js";

const http = new HttpInterceptor();

export const GetAuctionDetails = (id, callback) => {
  const endpoint = `${process.env.api_base_url}/auction/get/${id}`;
  try {
      http
          .get(endpoint)
          .then((response) => {
              if (typeof callback === "function") {
                  callback(response);
              } else {
                  console.error("Callback is not a function");
              }
          })
          .catch((error) => {
              if (typeof callback === "function") {
                  callback(error.response);
              } else {
                  console.error("Callback is not a function");
              }
          });
  } catch (error) {
      if (typeof callback === "function") {
          callback(error.response);
      } else {
          console.error("Callback is not a function");
      }
  }
};
export const GetAuctionFullDetails = (callback) => {
  const endpoint = `${process.env.api_base_url}/auction/get`;
  try {
      http
          .get(endpoint)
          .then((response) => {
              if (typeof callback === "function") {
                  callback(response);
              } else {
                  console.error("Callback is not a function");
              }
          })
          .catch((error) => {
              if (typeof callback === "function") {
                  callback(error.response);
              } else {
                  console.error("Callback is not a function");
              }
          });
  } catch (error) {
      if (typeof callback === "function") {
          callback(error.response);
      } else {
          console.error("Callback is not a function");
      }
  }
};

export const GetSellerbids = (callback) => {
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

export const AddSellerbids = (data,callback) => {
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