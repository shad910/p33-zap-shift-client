import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../shared/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, isLoading, data: myParcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return response.data;
        }
    });

    if (isPending || isLoading) {
        return (
            <Loading></Loading>
        );
    }

    const handleDelete = async (id, paymentStatus) => {

        // Paid parcels cannot be deleted
        if (paymentStatus === "Paid") {
            Swal.fire({
                icon: 'warning',
                title: 'Cannot Delete',
                text: 'Paid parcels cannot be deleted.',
                buttonsStyling: true
            });
            return;
        }

        // Confirm deletion
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This parcel will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            buttonsStyling: true,

        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);

                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Parcel has been deleted successfully.',
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    refetch();
                }
            } catch (error) {
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong while deleting.',
                    });
                };
            }
        }
    };



    return (
        <div className="w-full overflow-x-auto">
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
                    {
                        myParcels.map((parcel, index) =>
                            <tr key={parcel._id} className="hover:bg-base-300">
                                <th>{index + 1}</th>

                                <td>{parcel.parcelTitle}</td>

                                <td className="hidden sm:table-cell">
                                    {parcel.parcelType}
                                </td>

                                <td>
                                    {new Date(parcel.creation_date).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>

                                <td>
                                    {parcel.paymentStatus === "paid" ? (
                                        <span className="badge badge-sm sm:badge-md badge-success">
                                            Paid
                                        </span>
                                    ) : (
                                        <span className="badge badge-sm sm:badge-md badge-error">
                                            Unpaid
                                        </span>
                                    )}
                                </td>

                                <td className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                                    <button className="btn btn-xs sm:btn-sm btn-outline w-full sm:w-auto">
                                        View
                                    </button>

                                    {
                                        parcel.paymentStatus !== "paid" && (
                                            <Link to={`/dashboard/payment/${parcel._id}`} className="btn btn-xs sm:btn-sm btn-primary w-full sm:w-auto text-black">
                                                Pay
                                            </Link>
                                        )
                                    }

                                    <button
                                        onClick={() => handleDelete(parcel._id, parcel.paymentStatus)}
                                        className="btn btn-xs sm:btn-sm btn-error w-full sm:w-auto"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;
