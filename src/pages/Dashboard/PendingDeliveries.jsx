import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PendingDeliveries = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const riderEmail = user?.email;

    // Load rider parcels
    const { isFetching, isPending, isLoading, data: parcels = [] } = useQuery({
        queryKey: ["rider-parcels", riderEmail],
        enabled: !!riderEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/rider/parcels?email=${riderEmail}`
            );
            return res.data;
        },
    });

    // Update parcel status

    const updateStatus = async (parcelId, status) => {

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text:
                status === "in-transit"
                    ? "Confirm parcel pickup?"
                    : "Confirm parcel delivery?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, confirm",
        });

        if (!confirm.isConfirmed) return;

        try {

            const res = await axiosSecure.patch(
                `/parcels/${parcelId}/status`,
                { deliveryStatus: status }
            );

            if (res.data.parcelModified > 0) {

                toast.success(
                    status === "in-transit"
                        ? "Parcel picked up successfully"
                        : "Parcel delivered successfully"
                );

                queryClient.invalidateQueries({
                    queryKey: ["rider-parcels", riderEmail],
                });

            }

        } catch (error) {

            if (error) {
                toast.error("Failed to update status");
            }

        }

    };

    if (isPending || isFetching || isLoading) return <Loading />;

    return (
        <section className="p-3">

            <div className="bg-base-100 shadow rounded-lg overflow-hidden">

                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">

                    <table className="table table-zebra w-full">

                        <thead>
                            <tr>
                                <th>Parcel ID</th>
                                <th>Title</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Delivery Cost</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {parcels.length > 0 ? (
                                parcels.map((parcel) => (

                                    <tr key={parcel._id}>

                                        <td className="font-semibold">
                                            {parcel.parcelId}
                                        </td>

                                        <td>
                                            {parcel.parcelTitle}
                                        </td>

                                        <td>
                                            <p className="font-medium">
                                                {parcel.senderName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {parcel.senderCenter}
                                            </p>
                                        </td>

                                        <td>
                                            <p className="font-medium">
                                                {parcel.receiverName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {parcel.receiverCenter}
                                            </p>
                                        </td>

                                        <td>
                                            ৳{parcel.deliveryCost}
                                        </td>

                                        <td>

                                            <span
                                                className={`badge badge-sm capitalize ${parcel.deliveryStatus === "rider-assigned"
                                                    ? "badge-warning"
                                                    : "badge-info"
                                                    }`}
                                            >
                                                {parcel.deliveryStatus}
                                            </span>

                                        </td>

                                        <td className="text-center">

                                            {parcel.deliveryStatus === "rider-assigned" && (
                                                <button
                                                    onClick={() =>
                                                        updateStatus(parcel._id, "in-transit")
                                                    }
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    Pick Up
                                                </button>
                                            )}

                                            {parcel.deliveryStatus === "in-transit" && (
                                                <button
                                                    onClick={() =>
                                                        updateStatus(parcel._id, "delivered")
                                                    }
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}

                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-6">
                                        No pending deliveries
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden p-3 space-y-4">

                    {parcels.map((parcel) => (

                        <div
                            key={parcel._id}
                            className="border rounded-xl p-4 space-y-2"
                        >

                            <div className="flex justify-between">

                                <h3 className="font-bold">
                                    {parcel.parcelTitle}
                                </h3>

                                <span className="badge badge-warning capitalize">
                                    {parcel.deliveryStatus}
                                </span>

                            </div>

                            <p>
                                <strong>ID:</strong> {parcel.parcelId}
                            </p>

                            <p>
                                <strong>Sender:</strong> {parcel.senderName}
                            </p>

                            <p>
                                <strong>Receiver:</strong> {parcel.receiverName}
                            </p>

                            <p>
                                <strong>Cost:</strong> ৳{parcel.deliveryCost}
                            </p>

                            {parcel.deliveryStatus === "rider-assigned" && (
                                <button
                                    onClick={() =>
                                        updateStatus(parcel._id, "in-transit")
                                    }
                                    className="btn btn-warning btn-sm w-full"
                                >
                                    Pick Up Parcel
                                </button>
                            )}

                            {parcel.deliveryStatus === "in-transit" && (
                                <button
                                    onClick={() =>
                                        updateStatus(parcel._id, "delivered")
                                    }
                                    className="btn btn-success btn-sm w-full"
                                >
                                    Mark Delivered
                                </button>
                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default PendingDeliveries;