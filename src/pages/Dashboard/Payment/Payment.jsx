import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const Payment = () => {

    return (
        <section>

            <h1>Payment Page</h1>

            <Elements stripe={stripePromise}>
                <PaymentForm></PaymentForm>
            </Elements>
        </section>
    );
};

export default Payment;