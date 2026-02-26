import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/Loading';
import { FiCreditCard } from 'react-icons/fi';
import Lottie from 'lottie-react';
import noPayment from '../../../assets/animations/noPaymentHistoryFound.json';

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, isFetching, isLoading, data: payments } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    if (isPending || isLoading || isFetching) return <Loading></Loading>;

    if (payments.length === 0) {
        return (
            <div className="text-center py-12">
                <div className='flex justify-center items-center '>
                    <Lottie animationData={noPayment} style={{ width: '350px' }} loop></Lottie>
                </div>
                <p className="text-gray-500 text-2xl font-bold">No payment history available.</p>
            </div>
        );
    } else {
        return (
            <section className="p-2.5">
                <div className="w-full bg-base-100 shadow rounded-lg text-xs sm:text-sm md:text-base lg:p-2.5">

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto overflow-y-visible">
                        <table className="table table-zebra table-fixed w-full">
                            <thead>
                                <tr>
                                    <th className="w-16">#</th>
                                    <th className="w-24">Parcel ID</th>
                                    <th className="w-28">Title</th>
                                    <th className="w-24">Sender</th>
                                    <th className="w-24">Receiver</th>
                                    <th className="w-20">Amount ($)</th>
                                    <th className="w-32">Date</th>
                                    <th className="w-24">Method</th>
                                    <th className="w-36">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment._id}>
                                        <td>{index + 1}</td>
                                        <td className="truncate overflow-visible">
                                            <div
                                                className="tooltip tooltip-top inline-block cursor-pointer z-50"
                                                data-tip={payment.parcelId}
                                            >
                                                {payment?.parcelId?.slice(0, 6)}...
                                            </div>
                                        </td>
                                        <td className="truncate">{payment?.parcelTitle}</td>
                                        <td className="truncate">{payment?.senderName}</td>
                                        <td className="truncate">{payment?.receiverName}</td>
                                        <td className="font-bold">{`$${payment?.amount}`}</td>
                                        <td className="truncate">{new Date(payment?.paymentDate).toLocaleString()}</td>
                                        <td className="truncate flex items-center gap-1">
                                            {payment?.paymentMethod.includes("card") && <FiCreditCard className="text-blue-500" />}
                                            {payment?.paymentMethod?.join(", ")}
                                        </td>
                                        <td className="truncate overflow-visible">
                                            <div
                                                className="tooltip tooltip-top inline-block cursor-pointer z-50"
                                                data-tip={payment.transactionId}
                                            >
                                                {payment?.transactionId?.slice(0, 6)}...
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4 p-2">
                        {payments.length > 0 ? payments.map((payment, index) => (
                            <div key={payment._id} className="border rounded-lg p-2 space-y-1">
                                <p><strong>#{index + 1}</strong></p>
                                <p><strong>Parcel ID:</strong> <span className="truncate">{payment?.parcelId}</span></p>
                                <p><strong>Title:</strong> {payment?.parcelTitle}</p>
                                <p><strong>Sender:</strong> {payment?.senderName}</p>
                                <p><strong>Receiver:</strong> {payment?.receiverName}</p>
                                <p><strong>Amount:</strong> <span className="font-bold">{`$${payment?.amount}`}</span></p>
                                <p><strong>Date:</strong> {new Date(payment?.paymentDate).toLocaleString()}</p>
                                <p className="flex items-center gap-1">
                                    <strong>Method:</strong>
                                    {payment?.paymentMethod.includes("card") && <FiCreditCard className="text-blue-500" />}
                                    {payment?.paymentMethod?.join(", ")}
                                </p>
                                <p><strong>Transaction ID:</strong> <span className="truncate text-xs">{payment?.transactionId}</span></p>
                            </div>
                        )) : (
                            <p className="text-center py-6 text-gray-500">No payments found.</p>
                        )}
                    </div>

                </div>
            </section>
        );
    }
};

export default PaymentHistory;
