/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {  updateCredit } from '../services/user';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PaymentForm = ({ amount, totalMessage }) => {
  
  const [, setToken] = useState(null);

  const [currentUser, setCurrentUser] = useState(undefined);

  const navigate = useNavigate();

  useEffect(async () => {

    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  // const amount = calculateCost(totalMessage);

  const handleToken = async(token) => {
    setToken(token);
    const body = {
      amount: amount * 100,
      credits: totalMessage,
      user_id: currentUser._id,
      token,
      description: 'Payment of $' + amount,
    };

    const response = await updateCredit(body);

    if (response.status === true) {

      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      data.credits = response.user.credits;

      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data)
      );

      toast.success("Payment Successful");

      setTimeout(() => {
        navigate("/meet");
      }
        , 1000);

    }
    else {
      toast.error("Payment Failed");
    }

  };


  return (
    <>
    <StripeCheckout
      email={currentUser?.email}
      token={handleToken}
      stripeKey="pk_live_51M83kCLyRkndrBXm5SSZ2zhnGR8eSA8WJwaU9WJQnyapwbbVbY1e3e4c1sXhUrXWEuMUYDcrToydzFM902KLtRQc00LY37INNi"
      amount={amount * 100}
      allowRememberMe={true}
      name="Payment for Credits"
      description={`Payment of $${amount} for ${totalMessage} credits`}
    >
      <button className="btn btn-primary" style={{fontSize: '12px'}}>
        Pay 
  </button>
    </StripeCheckout>
    <ToastContainer />
    </>
  );
};

export default PaymentForm;