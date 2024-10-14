"use server"

const getAccessToken = async () => {
    const response = await fetch("https://sandbox.payhere.lk/merchant/v1/oauth/token", {
        method: "POST",
        headers: {
            "Authorization": "Basic NE9WeGZxUE12ZzA0SkVWT0Nrc1FsdjNQVTo0cTlGa0cyVFgxdjRFcm11cGF2MkxsNEV2dGdkdVVLYnc0SkpmOVlZTzc5Ng==",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // urlencoded
        body: "grant_type=client_credentials",
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        return data.access_token;
    } else {
        throw new Error(data.error);
    }
}

const retrievePayments = async () => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch("https://sandbox.payhere.lk/merchant/v1/payment/search/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,  // Corrected template literal
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error(error);
    }
}

export default retrievePayments;
