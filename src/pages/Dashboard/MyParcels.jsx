import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import NoDataFound from '../../assets/animations/noDataAvailable.json';
import { FaEye, FaTrash, FaMoneyBillWave } from 'react-icons/fa';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);

    const { isPending, isFetching, isLoading, data: myParcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return response.data;
        }
    });

    if (isPending || isLoading || isFetching) return <Loading />;

    const handleDelete = async (id, paymentStatus) => {
        if (paymentStatus === "paid") {
            Swal.fire({ icon: 'warning', title: 'Cannot Delete', text: 'Paid parcels cannot be deleted.' });
            return;
        }
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This parcel will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Parcel has been deleted successfully.', timer: 2000, showConfirmButton: false });
                    refetch();
                }
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong while deleting.' });
            }
        }
    };

    if (myParcels.length === 0) {
        return (
            <section className="text-center py-12">
                <div className='flex justify-center items-center mb-2.5'>
                    <Lottie animationData={NoDataFound} style={{ width: '400px' }} loop />
                </div>
                <h2 className="text-2xl font-bold">No Parcels Found</h2>
                <p className="text-gray-500 mt-2">You haven't created any parcels yet.</p>
            </section>
        );
    }

    return (
        <section className="p-2.5">
            <div className="w-full">

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                    <table className="table table-zebra w-full text-[10px] sm:text-xs md:text-sm lg:text-base">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Parcel Name</th>
                                <th className="hidden sm:table-cell">Type</th>
                                <th>Created at</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myParcels.map((parcel, index) => (
                                <tr key={parcel._id} className="hover:bg-base-300">
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelTitle}</td>
                                    <td className="hidden sm:table-cell">{parcel.parcelType}</td>
                                    <td>{new Date(parcel.creation_date).toLocaleString("en-GB", {
                                        day: "2-digit", month: "short", year: "numeric",
                                        hour: "2-digit", minute: "2-digit",
                                    })}</td>
                                    <td>
                                        {parcel.paymentStatus === "paid" ? (
                                            <span className="badge badge-sm sm:badge-md badge-success">Paid</span>
                                        ) : (
                                            <span className="badge badge-sm sm:badge-md badge-error">Unpaid</span>
                                        )}
                                    </td>
                                    <td className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                                        {/* View Icon */}
                                        <button
                                            className="btn btn-xs sm:btn-sm btn-outline w-full sm:w-auto"
                                            onClick={() => setSelectedParcel(parcel)}
                                        >
                                            <FaEye />
                                        </button>
                                        {/* Pay Icon */}
                                        {parcel.paymentStatus !== "paid" && (
                                            <Link
                                                to={`/dashboard/payment/${parcel._id}`}
                                                className="btn btn-xs sm:btn-sm btn-primary w-full sm:w-auto text-black"
                                            >
                                                <FaMoneyBillWave />
                                            </Link>
                                        )}
                                        {/* Delete Icon */}
                                        <button
                                            onClick={() => handleDelete(parcel._id, parcel.paymentStatus)}
                                            className="btn btn-xs sm:btn-sm btn-error w-full sm:w-auto"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {myParcels.map((parcel, index) => (
                        <div key={parcel._id} className="bg-base-100 shadow rounded-lg p-3 space-y-1">
                            <p><strong>#{index + 1}</strong></p>
                            <p><strong>Parcel Name:</strong> {parcel.parcelTitle}</p>
                            <p><strong>Type:</strong> {parcel.parcelType}</p>
                            <p><strong>Created at:</strong> {new Date(parcel.creation_date).toLocaleString("en-GB", {
                                day: "2-digit", month: "short", year: "numeric",
                                hour: "2-digit", minute: "2-digit",
                            })}</p>
                            <p>
                                <strong>Payment:</strong>{" "}
                                {parcel.paymentStatus === "paid" ? (
                                    <span className="badge badge-xs badge-success">Paid</span>
                                ) : (
                                    <span className="badge badge-xs badge-error">Unpaid</span>
                                )}
                            </p>
                            <div className="flex flex-col gap-2">
                                <button className="btn btn-sm btn-outline w-full" onClick={() => setSelectedParcel(parcel)}>
                                    <FaEye />
                                </button>
                                {parcel.paymentStatus !== "paid" && (
                                    <Link
                                        to={`/dashboard/payment/${parcel._id}`}
                                        className="btn btn-sm btn-primary w-full text-black"
                                    >
                                        <FaMoneyBillWave />
                                    </Link>
                                )}
                                <button
                                    onClick={() => handleDelete(parcel._id, parcel.paymentStatus)}
                                    className="btn btn-sm btn-error w-full"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Parcel Details Modal */}
                <dialog id="parcel_details_modal" className="modal" open={!!selectedParcel}>
                    {selectedParcel && (
                        <div className="modal-box max-w-2xl">
                            <h3 className="font-bold text-lg mb-2.5">Parcel Details</h3>
                            <div className="space-y-1.5 text-sm">
                                <p><strong>Parcel ID:</strong> {selectedParcel.parcelId}</p>
                                <p><strong>Parcel Title:</strong> {selectedParcel.parcelTitle}</p>
                                <p><strong>Parcel Type:</strong> {selectedParcel.parcelType}</p>
                                <p><strong>Sender Name:</strong> {selectedParcel.senderName}</p>
                                <p><strong>Sender Address:</strong> {selectedParcel.senderAddress}</p>
                                <p><strong>Sender Contact:</strong> {selectedParcel.senderContact}</p>
                                <p><strong>Sender Region:</strong> {selectedParcel.senderRegion}</p>
                                <p><strong>Sender Center:</strong> {selectedParcel.senderCenter}</p>
                                <p><strong>Pickup Instruction:</strong> {selectedParcel.pickupInstruction}</p>
                                <p><strong>Receiver Name:</strong> {selectedParcel.receiverName}</p>
                                <p><strong>Receiver Address:</strong> {selectedParcel.receiverAddress}</p>
                                <p><strong>Receiver Contact:</strong> {selectedParcel.receiverContact}</p>
                                <p><strong>Receiver Region:</strong> {selectedParcel.receiverRegion}</p>
                                <p><strong>Receiver Center:</strong> {selectedParcel.receiverCenter}</p>
                                <p><strong>Delivery Instruction:</strong> {selectedParcel.deliveryInstruction}</p>
                                <p><strong>Delivery Cost:</strong> ${selectedParcel.deliveryCost}</p>
                                <p><strong>Created By:</strong> {selectedParcel.created_by}</p>
                                <p><strong>Created At:</strong> {new Date(selectedParcel.creation_date).toLocaleString()}</p>
                                <p><strong>Payment Status:</strong> {selectedParcel.paymentStatus}</p>
                            </div>
                            <div className="modal-action">
                                <button className="btn" onClick={() => setSelectedParcel(null)}>Close</button>
                            </div>
                        </div>
                    )}
                </dialog>
            </div>
        </section>
    );
};

export default MyParcels;