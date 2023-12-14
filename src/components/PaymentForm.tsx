import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "styled-components";

interface PaymentFormProps {}

const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const PaymentForm: React.FC<PaymentFormProps> = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [country, setCountry] = useState<"Poland" | "USA">("Poland");
  const [ownerName, setOwnerName] = useState(
    country === "Poland" ? "Jan Kowalski" : "John Doe"
  );
  const [customOwnerName, setCustomOwnerName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element not found");
      return;
    }

    const { token, error } = await stripe.createToken(cardElement, {
      name: customOwnerName || ownerName,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Here is a token we can send to BackEnd:", token);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value as "Poland" | "USA";
    setCountry(selectedCountry);
    setOwnerName(selectedCountry === "Poland" ? "Jan Kowalski" : "John Doe");
  };

  const handleCustomOwnerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomOwnerName(event.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <StyledLabel>
          Choose your country:
          <StyledSelect value={country} onChange={handleCountryChange}>
            <option value={"Poland"}>Poland</option>
            <option value={"USA"}>United States of America</option>
          </StyledSelect>
        </StyledLabel>
      </div>
      <div>
        <StyledLabel>
          Name of credit card Owner :
          <StyledInput
            type="text"
            value={customOwnerName || ownerName}
            onChange={handleCustomOwnerNameChange}
          />
        </StyledLabel>
      </div>
      <div>
        <StyledLabel>
          Credit card:
          <CardElement />
        </StyledLabel>
      </div>
      <StyledButton type="submit">Do the payment</StyledButton>
    </StyledForm>
  );
};

export default PaymentForm;
