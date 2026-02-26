import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaBan, FaCheckCircle, FaEye, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const [selectedRider, setSelectedRider] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchValue, setSearchValue] = useState(""); // controlled search trigger

    // -----------------------------
    // Fetch Active Riders
    // -----------------------------
    const { data: riders = [], isLoading } = useQuery({
        queryKey: ["active-riders"],
        queryFn: async () => {
            const response = await axiosSecure.get("/riders/active");
            return response.data;
        },
    });

    // -----------------------------
    // Delete Mutation
    // -----------------------------
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/riders/${id}`);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                toast.success("Rider Removed Successfully");
                queryClient.invalidateQueries(["active-riders"]);
            }
        },
        onError: () => {
            toast.error("Failed to remove rider");
        }
    });

    // -----------------------------
    // Toggle Status Mutation
    // -----------------------------
    const toggleStatusMutation = useMutation({
        mutationFn: async ({ id, newStatus }) => {
            const res = await axiosSecure.patch(`/riders/${id}/status`, { status: newStatus });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Rider status updated successfully");
            queryClient.invalidateQueries(["active-riders"]);
        },
        onError: () => toast.error("Failed to update status"),
    });

    // -----------------------------
    // Confirm Delete
    // -----------------------------
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This rider will be permanently removed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Remove"
        }).then((result) => {
            if (result.isConfirmed) deleteMutation.mutate(id);
        });
    };

    // -----------------------------
    // Toggle Status Handler
    // -----------------------------
    const handleToggleStatus = (rider) => {
        const newStatus = rider.status === "active" ? "deactive" : "active";
        Swal.fire({
            title: `Are you sure?`,
            text: `Rider will be marked as ${newStatus}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${newStatus}`
        }).then((result) => {
            if (result.isConfirmed) {
                toggleStatusMutation.mutate({ id: rider._id, newStatus });
            }
        });
    };

    // -----------------------------
    // Search Handler
    // -----------------------------
    const handleSearch = () => setSearchValue(searchTerm);
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearchValue(value); // live search
    };

    // -----------------------------
    // Filter Logic
    // -----------------------------
    const filteredRiders = riders.filter((rider) =>
        rider.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        rider.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    const displayRiders = searchValue ? filteredRiders : riders;

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
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="input input-bordered w-full max-w-sm"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch} className="btn btn-primary text-black">
                    Search
                </button>
            </div>

            {/* Table / Card Wrapper */}
            <div className="bg-base-100 shadow rounded-lg overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Region</th>
                                <th>District</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayRiders.length > 0 ? (
                                displayRiders.map((rider) => (
                                    <tr key={rider._id}>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>{rider.region}</td>
                                        <td>{rider.district}</td>
                                        <td>
                                            <span className={`badge ${rider.status === "active" ? "badge-success" : "badge-error"} capitalize`}>
                                                {rider.status}
                                            </span>
                                        </td>
                                        <td className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedRider(rider);
                                                    document.getElementById("active_details_modal").showModal();
                                                }}
                                                className="btn btn-sm btn-info text-white"
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                onClick={() => handleToggleStatus(rider)}
                                                className={`btn btn-sm ${rider.status === "active" ? "btn-warning" : "btn-success"} text-white`}
                                            >
                                                {rider.status === "active" ? <FaBan /> : <FaCheckCircle />}
                                            </button>

                                            <button onClick={() => handleDelete(rider._id)} className="btn btn-sm btn-error text-white">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No rider found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4 p-2">
                    {displayRiders.length > 0 ? displayRiders.map((rider) => (
                        <div key={rider._id} className="border rounded-lg p-2">
                            <p><strong>Name:</strong> {rider.name}</p>
                            <p><strong>Email:</strong> {rider.email}</p>
                            <p><strong>Region:</strong> {rider.region}</p>
                            <p><strong>District:</strong> {rider.district}</p>
                            <p><strong>Status:</strong> <span className={`badge ${rider.status === "active" ? "badge-success" : "badge-error"} capitalize`}>{rider.status}</span></p>
                            <div className="flex gap-2 mt-2 justify-end">
                                <button
                                    onClick={() => {
                                        setSelectedRider(rider);
                                        document.getElementById("active_details_modal").showModal();
                                    }}
                                    className="btn btn-sm btn-info text-white"
                                >
                                    <FaEye />
                                </button>

                                <button
                                    onClick={() => handleToggleStatus(rider)}
                                    className={`btn btn-sm ${rider.status === "active" ? "btn-warning" : "btn-success"} text-white`}
                                >
                                   {rider.status === "active" ? <FaBan /> : <FaCheckCircle />}
                                </button>

                                <button onClick={() => handleDelete(rider._id)} className="btn btn-sm btn-error text-white">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center py-6 text-gray-500">No rider found.</p>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            <dialog id="active_details_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-lg mb-4">Rider Details</h3>
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
                            <p><strong>Created:</strong> {new Date(selectedRider.created_at).toLocaleString()}</p>
                        </div>
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

export default ActiveRiders;