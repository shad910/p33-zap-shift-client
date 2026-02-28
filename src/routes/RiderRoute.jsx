import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../shared/Loading";

const RiderRoute = ({ children }) => {
    const { loading: authLoading, user } = useAuth();
    const { loading: roleLoading, role } = useUserRole();
    const location = useLocation();

    if (authLoading || roleLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== "rider") {
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }

    return children;
};

export default RiderRoute;