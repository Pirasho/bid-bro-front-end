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