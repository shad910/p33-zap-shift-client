import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../shared/Loading';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { id: mainParcelID } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const { isPending, isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', mainParcelID],
        queryFn: async () => {
            const response = await axiosSecure.get(`/parcels/${mainParcelID}`);
            return response.data;
        }
    });

    if (isPending || isLoading) return <Loading />;

    const { senderName: name, created_by: email, parcelId, deliveryCost } = parcel;
    const amount = deliveryCost * 100; // Convert to cents for Stripe

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            setError("");

            // Step 1: Create Payment Intent
            const response = await axiosSecure.post('/create-payment-intent', {
                amount,
                mainParcelID,
                parcelId,
                email
            });
            const clientSecret = response.data.clientSecret;

            // Step 2: Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: name || "Anonymous",
                        email: email || "anonymous@example.com",
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                console.log("Payment succeeded:", result.paymentIntent);

                // Step 3: Send payment data to backend
                const paymentResponse = await axiosSecure.post('/payments', {
                    mainParcelID,
                    parcelId,
                    email,
                    amount: deliveryCost,
                    paymentMethod: result.paymentIntent.payment_method_types || ["Card / Stripe"], // stored as array
                    transactionId: result.paymentIntent.id
                });

                console.log(paymentResponse.data);

                if (paymentResponse.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `
                            Your payment has been completed successfully.<br/>
                            <strong class="text-sm font-bold">Transaction ID:</strong> ${result.paymentIntent.id}
                        `,
                        confirmButtonText: 'Go to My Parcels',
                        timer: 5000,
                        timerProgressBar: true,
                    }).then(() => {
                        navigate("/dashboard/my-parcels");
                    });
                }
            }
        } catch (error) {
            setError("Payment failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
            <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
                <p className="text-sm text-base-content/70">
                    Pay securely using your debit or credit card through Stripe's encrypted card payment system.
                </p>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Card Information</span>
                </label>
                <div className="border border-base-300 rounded-lg p-4 bg-base-200 focus-within:border-primary transition ">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#1f2937",
                                    fontFamily: "Inter, sans-serif",
                                    "::placeholder": { color: "#9ca3af" },
                                },
                                invalid: { color: "#ef4444" },
                            },
                        }}
                    />
                </div>
            </div>

            {error && <div className="text-red-500 text-xs mt-2">{error}</div>}

            <button
                type="submit"
                disabled={!stripe}
                className="btn btn-primary w-full text-white"
            >
                Pay {deliveryCost}$
            </button>
        </form>
    );
};

export default PaymentForm;
