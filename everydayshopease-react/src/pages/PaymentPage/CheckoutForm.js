import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = ({ children }) => {
  return (
    <form className="items-center p-2 mt-4 w-[320px] h-[320px]">
      <PaymentElement />
      {children}
    </form>
  );
};

export default CheckoutForm;
