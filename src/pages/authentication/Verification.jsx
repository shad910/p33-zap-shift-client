import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { sendEmailVerification } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../firebase/Firebase.init";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FiMail } from "react-icons/fi";

const Verification = () => {

    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [verified, setVerified] = useState(false);
    const [countdown, setCountdown] = useState(2);

    // ---------------------------------
    // If no user → go login
    // ---------------------------------
    useEffect(() => {
        if (!loading && !user) {
            navigate("/login", { replace: true });
        }
    }, [user, loading, navigate]);

    // ---------------------------------
    // Auto check verification (every 2s)
    // ---------------------------------
    useEffect(() => {

        if (!user) return;

        const interval = setInterval(async () => {

            await auth.currentUser?.reload();

            if (auth.currentUser?.emailVerified) {

                setVerified(true);
                clearInterval(interval);

                Swal.fire({
                    icon: "success",
                    title: "Email Verified!",
                    text: "Redirecting...",
                    timer: 1500,
                    showConfirmButton: false
                });
            }

        }, 1500);

        return () => clearInterval(interval);

    }, [user]);

    // ---------------------------------
    // 3 Second Countdown
    // ---------------------------------
    useEffect(() => {

        if (!verified) return;

        const timer = setInterval(() => {

            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    navigate(location?.state?.from || "/", { replace: true });
                }
                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(timer);

    }, [verified, location, navigate]);

    // ---------------------------------
    // Resend Verification Email
    // ---------------------------------
    const handleResend = async () => {
        try {
            await sendEmailVerification(auth.currentUser);
            toast.success("Verification email sent again!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center">
            <div className="p-10 w-full max-w-md text-center">

                {!verified ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4">
                            Verify Your Email
                        </h1>

                        <p className="text-gray-500 mb-6 text-xs sm:text-sm md:text-base ">
                            A verification link has been sent to:
                            <br />
                            <span className="font-semibold">
                                {user?.email}
                            </span>
                        </p>

                        <button
                            onClick={handleResend}
                            className="btn btn-outline btn-primary w-full mb-4"
                        >
                            <FiMail className="mr-2" />
                            Resend Email
                        </button>

                        <p className="text-sm text-gray-400">
                            Waiting for verification...
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-success mb-4">
                            Email Verified 🎉
                        </h1>

                        <p>
                            Redirecting in{" "}
                            <span className="font-bold">
                                {countdown}
                            </span>{" "}
                            seconds...
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};

export default Verification;
