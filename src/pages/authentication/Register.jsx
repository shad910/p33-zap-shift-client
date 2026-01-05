import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"
import { Link } from "react-router";

const Register = () => {

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = data => {
        console.log(data);
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
                        {...register("name")}
                        className="input input-bordered w-full"
                    />
                </div>


                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Password */}
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Login button */}
                <button type="submit" className="btn btn-success w-full">
                    Login
                </button>
            </form>

            {/* Divider */}
            <div className="divider my-6">Or</div>

            {/* Google login */}
            <button className="btn btn-outline w-full flex items-center gap-2">
                <FcGoogle size={20} />
                Login with Google
            </button>

            {/* Footer */}
            <p className="text-center text-sm mt-6">
                Already have an account? {" "}
                <Link to="/login" className="link link-primary font-medium">
                    Login
                </Link>
            </p>
        </div>

    );
};

export default Register;
