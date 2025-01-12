import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ConfirmPayment = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const clientSecret = query.get("payment_intent_client_secret");
    const redirectStatus = query.get("redirect_status");
    const paymentIntent = query.get("payment_intent");
    if (redirectStatus === 'succeeded') {
        
    }
    else {

    }
    
  }, [location.search]);
  return (
    <>
      <div>결제 처리 중....</div>
    </>
  );
};

export default ConfirmPayment;
