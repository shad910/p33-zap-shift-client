import React, { useMemo } from "react";
import { useLoaderData } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaIdCard, FaPhoneAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import rider from "../assets/animations/rider.json";


const RidersForm = () => {
    const warehouses = useLoaderData();
    const { user } = useAuth();

    /* ===============================
       React Hook Form Setup
    ================================*/
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || "",
            nid: "",
            drivingLicense: "",
            region: "",
            district: "",
            phone: "",
            bikeBrand: "",
            bikeReg: "",
            about: "",
        },
    });

    const selectedRegion = watch("region");
    const selectedDistrict = watch("district");

    /* ===============================
       Dynamic Dropdown Logic
    ================================*/
    const regions = [...new Set(warehouses.map(w => w.region))];

    const districts = useMemo(() => {
        return warehouses
            .filter(w => w.region === selectedRegion)
            .map(w => w.district);
    }, [selectedRegion, warehouses]);

    /* ===============================
       TanStack Mutation
    ================================*/
    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post("/api/riders", data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Application submitted successfully!");
            reset({
                name: user?.displayName || "",
                email: user?.email || "",
            });
        },
        onError: () => {
            toast.error("Submission failed!");
        },
    });

    /* ===============================
       Submit Handler
    ================================*/
    const onSubmit = (data) => {
        Swal.fire({
            title: "Confirm Submission?",
            text: "Do you want to apply as a rider?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            confirmButtonText: "Yes, Submit",
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(data);
            }
        });
    };

    /* ===============================
       UI
    ================================*/
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">

                    {/* FORM */}
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Be a Rider</h2>
                        <p className="text-gray-500 mb-6">
                            Join our delivery network across Bangladesh.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* Name */}
                            <div>
                                <label className="label">Your Name</label>
                                <input
                                    type="text"
                                    disabled
                                    defaultValue={user?.displayName || ""}
                                    {...register("name", { required: "Name is required" })}
                                    className="input input-bordered w-full "
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="label">Your Email</label>
                                <input
                                    type="email"
                                    disabled
                                    defaultValue={user?.email || ""}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            {/* NID */}
                            <div>
                                <label className="label">Your NID</label>
                                <input
                                    type="text"
                                    {...register("nid", { required: "NID is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.nid && (
                                    <p className="text-red-500 text-sm">{errors.nid.message}</p>
                                )}
                            </div>

                            {/* Driving License */}
                            <div>
                                <label className="label">Driving License Number</label>
                                <input
                                    type="text"
                                    {...register("drivingLicense", {
                                        required: "Driving License Number is required",
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.drivingLicense && (
                                    <p className="text-red-500 text-sm">
                                        {errors.drivingLicense.message}
                                    </p>
                                )}
                            </div>

                            {/* Region */}
                            <div>
                                <label className="label">Your Region</label>
                                <select
                                    {...register("region", { required: "Region is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Region</option>
                                    {regions.map(region => (
                                        <option key={region}>{region}</option>
                                    ))}
                                </select>
                                {errors.region && (
                                    <p className="text-red-500 text-sm">{errors.region.message}</p>
                                )}
                            </div>

                            {/* District */}
                            <div>
                                <label className="label">Your District</label>
                                <select
                                    {...register("district", { required: "District is required" })}
                                    className="select select-bordered w-full"
                                    disabled={!selectedRegion}
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => (
                                        <option key={d}>{d}</option>
                                    ))}
                                </select>
                                {errors.district && (
                                    <p className="text-red-500 text-sm">{errors.district.message}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="label">Phone Number</label>
                                <input
                                    type="text"
                                    {...register("phone", {
                                        required: "Phone is required",
                                        minLength: {
                                            value: 11,
                                            message: "Phone must be at least 11 digits",
                                        },
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </div>

                            {/* Bike Brand */}
                            <div>
                                <label className="label">Bike Brand, Model and Year</label>
                                <input
                                    type="text"
                                    {...register("bikeBrand", {
                                        required: "Bike Brand is required",
                                    })}
                                    className="input input-bordered w-full"
                                />
                                {errors.bikeBrand && (
                                    <p className="text-red-500 text-sm">{errors.bikeBrand.message}</p>
                                )}
                            </div>

                            {/* Bike Registration */}
                            <div>
                                <label className="label">Bike Registration Number</label>
                                <input
                                    type="text"
                                    {...register("bikeReg", { required: "Bike Registration is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.bikeReg && (
                                    <p className="text-red-500 text-sm">{errors.bikeReg.message}</p>
                                )}
                            </div>

                            {/* About Yourself */}
                            <div>
                                <label className="label">Tell us about yourself</label>
                                <textarea
                                    {...register("about", { required: "This field is required" })}
                                    className="textarea textarea-bordered w-full"
                                    rows={4}
                                ></textarea>
                                {errors.about && (
                                    <p className="text-red-500 text-sm">{errors.about.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn btn-primary text-black w-full mt-4"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Submitting..." : "Submit Application"}
                            </button>
                        </form>
                    </div>

                    {/* IMAGE SECTION */}
                    <div className="hidden md:flex justify-center">
                        <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center">
                            <Lottie animationData={rider}></Lottie>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RidersForm;
