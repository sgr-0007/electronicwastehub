import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkout';
import Navbar from './navbar';
//import app.css
import '../App.css';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe('pk_test_51P2Q9EP500Q7Bx19KCvFlDVrdZjrzRoQ1ta8OI5YSOB9uCYEmpCsy8iu42jPr1TwUTVOCNW7B4yfXjD7hbhiFzJ600jDWjcVui');

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);

  const location = useLocation();
  const state = location.state;

  const deviceDetailsId = state.deviceDetailsId;
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/payment/createPaymentLink`, {
          currency: 'gbp', // Replace with your desired currency
          amount: 12000, // Amount in PENCE (120 GBP)
          description: 'Payment for data retrieval',
        });
  
        if (!response.data) {
          throw new Error('No data received from API');
        }
  
        setClientSecret(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchClientSecret();
  }, []);
  

  const options = {
    mode: 'payment',
    amount: 60,
    currency: 'gbp',
    appearance: {
      theme: 'stripe', // Optional: Set a pre-defined theme ('stripe' or 'default')
      variables: {
        colorPrimary: '#3254a4', // Primary color
        colorBackground: '#f5f5f5', // Background color
        colorText: '#324a5f', // Text color
        fontLineHeight: 1.5, // Line height
        space: 'm', // Spacing size
        // ...other customizable variables
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="payment-container">
      <Card style={{borderRadius : '20px 20px 20px 20px'}}>

        <div className="grid">

          <div className="col-4" style={{ borderRight: "1px solid #ddd" }}>
                        <h3>Summary</h3>
            <p>Amount: £120.00</p>
            <p>Data retrieval</p>

          </div>
          <div className="col-1"></div>
          <div className="col-7">
            <h3>Payment by Card</h3>

            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm statusId={4} deviceDetailsId={deviceDetailsId} />
              </Elements>
            )}
          </div>
      </div>
      </Card>

      </div>
    </>
  );
};

export default Payment;