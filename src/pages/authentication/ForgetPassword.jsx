import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const ForgetPassword = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        resetPassword(data.email)
            .then(() => {
                toast.success("Reset email sent.");
                reset();

                // redirect after 2 seconds
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };


    return (
        <div data-aos='zoom-in' className="flex items-center justify-center px-4">
            <div className="card w-full max-w-md p-6 sm:p-8">

                {/* Heading */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold ">
                        Forgot Your Password?
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Enter your registered email address and we’ll send you a password reset link.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>


                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full pl-5"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                        </div>

                        {errors.email && (
                            <p className="text-error text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Back to login */}
                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="text-sm flex items-center justify-center gap-2 hover:underline"
                    >
                        <FaArrowLeft />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
