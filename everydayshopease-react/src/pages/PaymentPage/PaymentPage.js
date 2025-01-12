import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Qg3pACpsv5WLFk0lfHloVZ8h54knKi5uXaq2qLLTJYrBAzZTKfu0HWnooJIVulzgYLWMDQ78zem7EAJ2JgHSDJw00SylIccFc"
);

const PaymentPage = (props) => {
  const options = {
    mode: "payment",
    amount: 1000,
    currency: "krw",
    appearance: {
      theme: "flat",
    },
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm {...props} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
