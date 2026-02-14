import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/Loading';
import { FiCreditCard } from 'react-icons/fi';

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, isLoading, data: payments } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    if (isPending || isLoading) return <Loading></Loading>;

    return (
        <div className="w-full text-xs sm:text-sm md:text-base">
            {/* Table wrapper */}
            <div className="overflow-x-auto overflow-y-visible">
                <table className="table table-zebra table-fixed w-full">
                    {/* Table Head */}
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

                    {/* Table Body */}
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                {/* Parcel ID with tooltip */}
                                <td>{index + 1}</td>
                                <td className="truncate overflow-visible">
                                    <div
                                        className="tooltip tooltip-top inline-block cursor-pointer z-50"
                                        data-tip={payment.parcelId}
                                    >
                                        {payment.parcelId.slice(0, 6)}...
                                    </div>
                                </td>

                                <td className="truncate">{payment.parcelTitle}</td>
                                <td className="truncate">{payment.senderName}</td>
                                <td className="truncate">{payment.receiverName}</td>
                                <td className="font-bold">{`$${payment.amount}`}</td>
                                <td className="truncate">{new Date(payment.paymentDate).toLocaleString()}</td>

                                {/* Payment Method with icon */}
                                <td className="truncate flex items-center gap-1">
                                    {payment.paymentMethod.includes("card") && (
                                        <FiCreditCard className="text-blue-500" />
                                    )}
                                    {payment.paymentMethod.join(", ")}
                                </td>

                                <td className="truncate overflow-visible">
                                    <div
                                        className="tooltip tooltip-top inline-block cursor-pointer z-50"
                                        data-tip={payment.transactionId}
                                    >
                                        {payment.transactionId.slice(0, 6)}...
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
