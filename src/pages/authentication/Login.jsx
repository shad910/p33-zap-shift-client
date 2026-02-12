import React from "react";
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {

    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                navigate(location?.state?.from || '/', { replace: true });
            })
            .catch(error => console.log(error))
    };

    return (

        <div data-aos='fade-up' className="max-w-md mx-auto rounded-xl p-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <p className="text-center text-sm text-gray-500 mt-1">
                Login with ZapShift
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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

                {/* Forgot password */}
                <div className="text-right">
                    <Link to="/forget-password" className="text-sm link link-hover">
                        Forgot Password?
                    </Link>
                </div>

                {/* Login button */}
                <button type="submit" className="btn btn-primary text-black w-full">
                    Login
                </button>
            </form>

            {/* Divider */}
            <div className="divider my-6">Or</div>

            {/* Social Login */}
            <SocialLogin></SocialLogin>

            {/* Footer */}
            <p className=" text-sm mt-6">
                Don’t have an account?{" "}
                <Link to="/register" className="link link-primary font-medium">
                    Register
                </Link>
            </p>
        </div>

    );
};

export default Login;
