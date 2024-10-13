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

export const GetAuctionFullDetails = (id,callback) => {
  const endpoint = `${process.env.api_base_url}/auction/id/${id}`;
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

export const GetSellerbids = (id,callback) => {
  const endpoint = `${process.env.api_base_url}/sellerbid/auction/${id}`;
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
export const GetSellerbidsById = (seller_id,callback) => {
  const endpoint = `${process.env.api_base_url}/sellerbid/auction/seller/${seller_id}`;
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