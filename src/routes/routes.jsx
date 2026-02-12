import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Coverage from "../pages/Coverage/Coverage";
import Error from "../shared/Error";
import AboutUs from "../shared/AboutUs";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Verification from "../pages/authentication/Verification";
import ForgetPassword from "../pages/authentication/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      {
        path: "*",
        Component: Error,
      },
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        loader: () => axios.get(`warehouses.json`),
        Component: Coverage
      },
      {
        path: "send-parcel",
        loader: () => axios.get(`warehouses.json`),
        element: <PrivateRoute>
          <SendParcel />
        </PrivateRoute>
      },
      {
        path: "about-us",
        Component: AboutUs
      }
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    errorElement: <Error />,
    children: [
      {
        path: "*",
        Component: Error,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "verification",
        Component: Verification
      },
      {
        path: "forget-password",
        Component: ForgetPassword,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "my-parcels",
        Component: MyParcels
      }
    ],

  }
]);

export default router;