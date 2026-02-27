import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaCheckCircle, FaEye, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DeActiveRiders = () => {

    const axiosSecure = useAxiosSecure();

    const [selectedRider, setSelectedRider] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch Deactive Riders
    const {
        data: riders = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["deactive-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/de-active");
            return res.data;
        },
    });

    // Activate Rider
    const handleActivate = (id) => {

        Swal.fire({
            title: "Activate Rider?",
            text: "This rider will be marked as active.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Activate",
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {

                    const res = await axiosSecure.patch(
                        `/riders/${id}/status`,
                        { status: "active" }
                    );

                    if (res.data.modifiedCount > 0) {

                        toast.success("Rider Activated Successfully");

                        refetch();

                    }

                } catch {

                    toast.error("Failed to activate rider");

                }

            }

        });

    };

    // Delete Rider
    const handleDelete = (id) => {

        Swal.fire({
            title: "Remove Rider?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Remove",
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {

                    const res = await axiosSecure.delete(`/riders/${id}`);

                    if (res.data.deletedCount > 0) {

                        toast.success("Rider Removed Successfully");

                        refetch();

                    }

                } catch {

                    toast.error("Failed to remove rider");

                }

            }

        });

    };

    // Search Filter
    const filteredRiders = riders.filter(

        (rider) =>

            rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

            rider.email.toLowerCase().includes(searchTerm.toLowerCase())

    );

    if (isLoading) {

        return (

            <div className="flex justify-center py-10">

                <span className="loading loading-spinner loading-lg"></span>

            </div>

        );

    }

    return (

        <section className="p-2.5">

            {/* Search */}

            <div className="mb-4">

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="input input-bordered w-full max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            {/* Table */}

            <div className="bg-base-100 shadow rounded-lg overflow-x-auto">

                <table className="table table-zebra w-full">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th className="text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredRiders.length > 0 ? (

                            filteredRiders.map((rider) => (

                                <tr key={rider._id}>

                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.district}</td>

                                    <td>

                                        <span className="badge badge-error capitalize">

                                            {rider.status}

                                        </span>

                                    </td>

                                    <td>

                                        {new Date(
                                            rider.created_at
                                        ).toLocaleString()}

                                    </td>

                                    <td className="flex gap-2 justify-center">

                                        {/* Details */}

                                        <button
                                            className="btn btn-sm btn-info text-white"
                                            onClick={() => {

                                                setSelectedRider(rider);

                                                document
                                                    .getElementById(
                                                        "deactive_details_modal"
                                                    )
                                                    .showModal();

                                            }}
                                        >
                                            <FaEye />
                                        </button>

                                        {/* Activate */}

                                        <button
                                            className="btn btn-sm btn-success text-white"
                                            onClick={() =>
                                                handleActivate(rider._id)
                                            }
                                        >
                                            <FaCheckCircle />
                                        </button>

                                        {/* Delete */}

                                        <button
                                            className="btn btn-sm btn-error text-white"
                                            onClick={() =>
                                                handleDelete(rider._id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center py-6"
                                >
                                    No rider found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            {/* Details Modal */}

            <dialog id="deactive_details_modal" className="modal">

                <div className="modal-box max-w-2xl">

                    <h3 className="font-bold text-lg mb-4">
                        Rider Details
                    </h3>

                    {selectedRider && (

                        <div className="space-y-2 text-sm">

                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Driving License:</strong> {selectedRider.drivingLicense}</p>
                            <p><strong>Phone:</strong> {selectedRider.phone}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                            <p><strong>Bike Reg:</strong> {selectedRider.bikeReg}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                            <p><strong>About:</strong> {selectedRider.about}</p>

                        </div>

                    )}

                    <div className="modal-action">

                        <form method="dialog">

                            <button className="btn">
                                Close
                            </button>

                        </form>

                    </div>

                </div>

            </dialog>

        </section>

    );

};

export default DeActiveRiders;