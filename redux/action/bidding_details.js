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
export const GetSellerDetail = (id,callback) => {
    console.log('id'+id);
    
    const endpoint = `${process.env.api_base_url}/seller/id/${id}`;
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

  
export const Accepbids = (auction_id,sellerId, callback) => {
    const endpoint = `${process.env.api_base_url}/auction/update/auction/${auction_id}/${sellerId}`; // Define the endpoint
  
    try {
      http
        .put(endpoint) // Send a POST request
        .then((response) => {
          callback(null, response); // Call the callback with the response if successful
        })
        .catch((error) => {
          callback(error.response ? error.response : error); // Call the callback with the error if failed
        });
    } catch (error) {
      callback(error); // Call the callback with any unexpected errors
    }
  };

export const GetSellerbids = (id,callback) => {
  const endpoint = `${process.env.api_base_url}/auction/auctionget/${id}`;
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

export const AcceptSellerbids = (data,id, callback) => {
  const endpoint = `${process.env.api_base_url}/sellerbid/auction/seller/status/${id}`; // Define the endpoint

  try {
    http
      .put(endpoint, data) // Send a POST request
      .then((response) => {
        callback(null, response); // Call the callback with the response if successful
      })
      .catch((error) => {
        callback(error.response ? error.response : error); // Call the callback with the error if failed
      });
  } catch (error) {
    callback(error); // Call the callback with any unexpected errors
  }
};

export const getOrderHistory = (id, callback) => {
  const endpoint = `${process.env.api_base_url}/sellerbid/orderhistory/${id}`;
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

export const getOrderHistoryOne = (id,seller_id, callback) => {
  const endpoint = `${process.env.api_base_url}/sellerbid/orderhistoryone/${id}/${seller_id}`;
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