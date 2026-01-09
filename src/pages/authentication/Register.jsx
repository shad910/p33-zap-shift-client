import React from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {

    const { createUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {

        const { name, email, password } = data;

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (

        <div className="max-w-md mx-auto rounded-xl p-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center">Create an Account</h2>
            <p className="text-center text-sm text-gray-500 mt-1">
                Register with ZapShift
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.name?.type === 'required' && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                </div>


                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.email?.type === 'required' && <p className="text-red-500 text-xs mt-1">Email is required</p>}
                </div>

                {/* Password */}
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true, minLength: 6, maxLength: 16 })}
                        className="input input-bordered w-full"
                    />
                    {errors.password?.type === 'required' && <p className="text-red-500 text-xs mt-1">Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>}
                    {errors.password?.type === 'maxLength' && <p className="text-red-500 text-xs mt-1">Password must be at most 16 characters</p>}
                </div>

                {/* Login button */}
                <button type="submit" className="btn btn-primary text-black w-full">
                    Register Account
                </button>
            </form>

            {/* Divider */}
            <div className="divider my-6">Or</div>

            {/* Social Login */}
            <SocialLogin></SocialLogin>

            {/* Footer */}
            <p className="text-sm mt-6">
                Already have an account? {" "}
                <Link to="/login" className="link link-primary font-medium">
                    Login
                </Link>
            </p>
        </div>

    );
};

export default Register;
