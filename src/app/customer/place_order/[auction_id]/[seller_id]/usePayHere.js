import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const usePayHere = (payData) => {
  const [isSdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const startPayment = (hash) => {
    if (isSdkReady) {
      const payment = {
        sandbox: process.env.NODE_ENV === "development" ? true : false,
        merchant_id: process.env.NEXT_PUBLIC_MERCHANT_ID, // Replace with your Merchant ID
        return_url: payData?.return_url || "http://localhost:3000",
        cancel_url: payData?.cancel_url || "http://localhost:3000",
        notify_url: payData?.notify_url || "http://localhost:3000",
        order_id: payData?.order_id,
        items: payData?.items,
        amount: payData?.amount,
        currency: payData?.currency || "LKR",
        hash,
        first_name: payData?.first_name,
        last_name: payData?.last_name,
        email: payData?.email,
        phone: payData?.phone,
        address: payData?.address,
        city: payData?.city || "Colombo",
        country: payData?.country || "Sri Lanka",
      };

      window.payhere.startPayment(payment);
    } else {
      toast.error("The PayHere SDK is not ready yet.");
    }
  };

  return { startPayment };
};

export default usePayHere;
