import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { sendEmailVerification } from "firebase/auth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Register = () => {

    const { createUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = useAxios()

    const [profilePicture, setProfilePicture] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleImageUpload = async(event) => {
        const file = event.target.files[0];

        if (!file) {
            console.error("No file selected");
            return;
        };

        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Key}`, formData);
        const imageUrl = response.data.data.url;
        setProfilePicture(imageUrl);
    };


    const onSubmit = (data) => {
        const { name, email, password } = data;

        createUser(email, password)
            .then(async (result) => {
                const loggedUser = result.user;

                const userInformation = {
                    name: name,
                    email: email,
                    role: "user",
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                };

                const response = await axiosInstance.post("/users", userInformation);
                console.log(response.data);

                // Updated User Information
                await updateUserProfile({
                    displayName: name,
                    photoURL: profilePicture
                });

                console.log(loggedUser);
                // SEND VERIFICATION EMAIL
                await sendEmailVerification(loggedUser);

                navigate("/verification", {
                    replace: true,
                    state: { from: location?.state?.from || "/" }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (

        <div data-aos='fade-down' className="max-w-md mx-auto rounded-xl p-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center">Create an Account</h2>
            <p className="text-center text-sm text-gray-500 mt-1">
                Register with ZapShift
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs text-gray-500">Upload your image</legend>
                    <input
                        onChange={handleImageUpload}
                        type="file"
                        className="file-input input-bordered w-full" />
                    <label className="label text-xs text-gray-500">Max size 2MB</label>
                </fieldset>

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
