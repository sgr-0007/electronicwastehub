import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from 'primereact/button';
import axios from 'axios';
import { API_BASE_URL } from '../config';





export default function CheckoutForm(props) {
  const { deviceDetailsId, statusId } = props;
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {

      return;
    }
    handlePayment();
    console.log(deviceDetailsId);
    const response =  await axios.put(`${API_BASE_URL}/staff/device/status?deviceDetailsId=${deviceDetailsId}&statusId=${statusId}`);


    if (response.status === 200) {
      console.log("Device status updated successfully!");
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/services`,
        },
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
        setIsProcessing(false);
      } else {
        // Payment successful, update device status
        setMessage("Payment successful!");
        setIsProcessing(false);
      }
    } else {
      console.error("Failed to update device status:", response.data);
    }
    setIsProcessing(true);
    
  };

  const handlePayment = async () => {
    
  };
  
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button style={{marginTop : '20px', display : 'flex', float : 'right'}} disabled={isProcessing || !stripe || !elements} id="submit">
        {isProcessing ? "Processing ... " : "Checkout"}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}