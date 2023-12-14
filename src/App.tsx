import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm.tsx";

const stripePromise = loadStripe(
  "pk_test_51ONJT9BtUF6TF1sVqTrvV2wSIvtiKOzzBvXzctr2YgdLXgoKAjH2ZHrE3XC8SfPo1NAlcqLAnirjuzrdoZTiLsh20010odktBe"
);

const App: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default App;
