import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaUserShield, FaUser } from "react-icons/fa";
import Loading from "../../shared/Loading";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [searchInput, setSearchInput] = useState("");

    // Fetch all users once
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["usersSearch"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search`);
            return res.data;
        },
    });

    // Client-side filtered users for real-time search
    const filteredUsers = useMemo(() => {
        if (!searchInput) return users;
        const query = searchInput.toLowerCase();
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
        );
    }, [searchInput, users]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") refetch();
    };

    // Show SweetAlert with dynamic role preview
    const confirmRoleChange = async (user, makeAdmin) => {
        const newRole = makeAdmin ? "admin" : user.previousRole || "user";
        const result = await Swal.fire({
            title: `Change Role for ${user.name}?`,
            html: `
        <p>Current Role: <strong>${user.role}</strong></p>
        <p>New Role: <strong>${newRole}</strong></p>
      `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `Yes, set to ${newRole}`,
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/users/${user._id}/role`, { makeAdmin });
                toast.success(`${user.name}'s role updated to ${newRole}`);
                refetch();
            } catch (error) {
                if (error) {
                    toast.error("Failed to update role");
                }
            }
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-2.5">
            {/* Search */}
            <div className="flex gap-2 mb-4 flex-col sm:flex-row">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="input input-bordered w-full sm:max-w-sm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button
                    onClick={() => refetch()}
                    className="btn btn-primary text-black w-full sm:w-auto"
                >
                    Search
                </button>
            </div>

            {/* Table for tablets and above */}
            <div className="hidden sm:block overflow-x-auto bg-base-100 shadow rounded-xl">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th>Last Login</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-base-300">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={`badge capitalize ${user.role === "admin"
                                                ? "badge-success"
                                                : user.role === "rider"
                                                    ? "badge-info"
                                                    : "badge-neutral"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td>{new Date(user.created_at).toLocaleString()}</td>
                                <td>
                                    {user.last_login
                                        ? new Date(user.last_login).toLocaleString()
                                        : "Never"}
                                </td>
                                <td className="text-center">
                                    {user.role === "admin" ? (
                                        <button
                                            onClick={() => confirmRoleChange(user, false)}
                                            className="btn btn-sm btn-error"
                                        >
                                            <FaUser /> Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => confirmRoleChange(user, true)}
                                            className="btn btn-sm btn-primary text-black"
                                        >
                                            <FaUserShield /> Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Not found */}
            {filteredUsers.length === 0 && (
                <p className="text-center text-gray-500 py-6">No users found</p>
            )}

            {/* Card layout for mobile */}
            <div className="sm:hidden flex flex-col gap-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className="bg-base-100 shadow rounded-xl p-4 flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{user.name}</span>
                            <span
                                className={`badge capitalize ${user.role === "admin" ? "badge-success" : "badge-ghost"
                                    }`}
                            >
                                {user.role}
                            </span>
                        </div>
                        <div>Email: {user.email}</div>
                        <div>Created: {new Date(user.created_at).toLocaleString()}</div>
                        <div>
                            Last Login:{" "}
                            {user.last_login
                                ? new Date(user.last_login).toLocaleString()
                                : "Never"}
                        </div>
                        <div className="flex gap-2 mt-2">
                            {user.role === "admin" ? (
                                <button
                                    onClick={() => confirmRoleChange(user, false)}
                                    className="btn btn-sm btn-error flex-1"
                                >
                                    <FaUser /> Remove Admin
                                </button>
                            ) : (
                                <button
                                    onClick={() => confirmRoleChange(user, true)}
                                    className="btn btn-sm btn-primary text-black flex-1"
                                >
                                    <FaUserShield /> Make Admin
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeAdmin;