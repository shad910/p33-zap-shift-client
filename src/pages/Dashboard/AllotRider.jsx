import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const AllotRider = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [availableRiders, setAvailableRiders] = useState([]);
    const [loadingRiders, setLoadingRiders] = useState(false);

    // Fetch parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["allot-parcels"],
        queryFn: async () => {

            const res = await axiosSecure.get(
                "/parcels?paymentStatus=paid&deliveryStatus=uncollected"
            );

            return res.data;
        },
    });

    // Open modal and load riders
    const handleOpenModal = async (parcel) => {

        try {

            setSelectedParcel(parcel);
            setLoadingRiders(true);

            const district = parcel.receiverCenter;
            const region = parcel.receiverRegion;

            const res = await axiosSecure.get(
                `/riders/available?district=${district}&region=${region}`
            );

            setAvailableRiders(res.data);

            document.getElementById("assign_rider_modal").showModal();

        } catch (error) {

            toast.error("Failed to load riders");

        } finally {

            setLoadingRiders(false);

        }

    };

    // Assign rider
    const handleAssignRider = async (rider) => {

        try {

            const res = await axiosSecure.patch(
                `/parcels/${selectedParcel._id}/assign-rider`,
                {
                    riderId: rider._id,
                    riderName: rider.name,
                    riderEmail: rider.email
                }
            );

            if (res.data.parcelModified > 0) {

                toast.success("Rider assigned successfully");

                document.getElementById("assign_rider_modal").close();

                queryClient.invalidateQueries({
                    queryKey: ["allot-parcels"]
                });

            }

        } catch {

            toast.error("Failed to assign rider");

        }

    };

    if (isLoading) return <Loading />;

    return (
        <section className="p-2.5">

            <div className="bg-base-100 shadow rounded-lg overflow-hidden">

                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">

                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>Parcel ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Cost</th>
                                <th>Payment</th>
                                <th>Delivery</th>
                                <th>Created</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                parcels.length > 0
                                    ?
                                    parcels.map(parcel => (

                                        <tr key={parcel._id}>

                                            <td className="font-semibold">
                                                {parcel.parcelId}
                                            </td>

                                            <td>
                                                {parcel.parcelTitle}
                                            </td>

                                            <td className="capitalize">
                                                {parcel.parcelType}
                                            </td>

                                            <td>
                                                <p className="font-semibold">
                                                    {parcel.senderName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {parcel.senderRegion} - {parcel.senderCenter}
                                                </p>
                                            </td>

                                            <td>
                                                <p className="font-semibold">
                                                    {parcel.receiverName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {parcel.receiverRegion} - {parcel.receiverCenter}
                                                </p>
                                            </td>

                                            <td>
                                                ৳{parcel.deliveryCost}
                                            </td>

                                            <td>
                                                <span className="badge badge-success badge-sm">
                                                    {parcel.paymentStatus}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="badge badge-warning badge-sm capitalize">
                                                    {parcel.deliveryStatus.replace("_", " ")}
                                                </span>
                                            </td>

                                            <td>
                                                {new Date(parcel.creation_date).toLocaleString()}
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    onClick={() => handleOpenModal(parcel)}
                                                    className="btn btn-sm btn-primary text-black truncate"
                                                >
                                                    <FaUserPlus />
                                                    Assign Rider
                                                </button>

                                            </td>

                                        </tr>

                                    ))
                                    :
                                    <tr>
                                        <td colSpan="10" className="text-center py-6">
                                            No parcels found
                                        </td>
                                    </tr>
                            }

                        </tbody>

                    </table>

                </div>


                {/* Mobile Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden space-y-4 p-3">

                    {
                        parcels.map(parcel => (

                            <div key={parcel._id} className="border rounded-xl p-4">

                                <div className="flex justify-between">

                                    <h3 className="font-bold">
                                        {parcel.parcelTitle}
                                    </h3>

                                    <span className="badge badge-sm badge-success">
                                        {parcel.paymentStatus}
                                    </span>

                                </div>

                                <p className="text-sm">ID: {parcel.parcelId}</p>

                                <p className="text-sm">
                                    Receiver: {parcel.receiverRegion} - {parcel.receiverCenter}
                                </p>

                                <p className="text-sm">Cost: <span className="font-bold">৳{parcel.deliveryCost}</span></p>

                                <button
                                    onClick={() => handleOpenModal(parcel)}
                                    className="btn btn-primary w-full mt-2 btn-sm text-black truncate"
                                >
                                    Assign Rider
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>


            {/* Modal */}
            <dialog id="assign_rider_modal" className="modal">
                <div className="modal-box max-w-5xl">

                    <h3 className="font-bold text-lg mb-4">Assign Rider</h3>

                    {availableRiders.length > 0 ? (
                        <>
                            {/* Card Layout (mobile + md) */}
                            <div className="space-y-3 lg:hidden">
                                {availableRiders.map((rider) => {

                                    const workStatus = rider.workStatus || "free";
                                    const isBusy = workStatus === "in-delivery";

                                    return (
                                        <div
                                            key={rider._id}
                                            className="border p-4 rounded-lg flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-semibold">{rider.name}</p>

                                                <p className="text-xs">{rider.email}</p>

                                                <p className="text-sm text-gray-500">
                                                    {rider.district}, {rider.region}
                                                </p>



                                                <span
                                                    className={`badge badge-sm mt-1 ${isBusy ? "badge-error" : "badge-success"
                                                        }`}
                                                >
                                                    {isBusy ? "In Delivery" : "Free"}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => handleAssignRider(rider)}
                                                disabled={isBusy}
                                                className={`btn btn-sm ${isBusy ? "btn-disabled cursor-not-allowed" : "btn-success"
                                                    }`}
                                            >
                                                {isBusy ? "Busy" : "Assign"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Table Layout (lg and up) */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Location</th>
                                            <th>Status</th>
                                            <th>Assign</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {availableRiders.map((rider) => {

                                            const workStatus = rider.workStatus || "free";
                                            const isBusy = workStatus === "in-delivery";

                                            return (
                                                <tr key={rider._id}>
                                                    <td className="font-semibold">{rider.name}</td>

                                                    <td className="text-sm">{rider.email}</td>

                                                    <td>
                                                        {rider.district}, {rider.region}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge badge-sm ${isBusy ? "badge-error" : "badge-success"
                                                                }`}
                                                        >
                                                            {isBusy ? "In Delivery" : "Free"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <button
                                                            onClick={() => handleAssignRider(rider)}
                                                            disabled={isBusy}
                                                            className={`btn btn-xs ${isBusy
                                                                ? "btn-disabled cursor-not-allowed"
                                                                : "btn-success"
                                                                }`}
                                                        >
                                                            {isBusy ? "Busy" : "Assign"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">No available riders</p>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>

        </section>
    );

};

export default AllotRider;