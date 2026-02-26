import { createBrowserRouter } from "react-router";
import axios from "axios";
import PrivateRoute from "./PrivateRoute";
import Error from "../shared/Error";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import AboutUs from "../shared/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/authentication/Register";
import Verification from "../pages/authentication/Verification";
import Login from "../pages/authentication/Login";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel";
import Profile from "../pages/Dashboard/Profile/Profile";
import RidersForm from "../pages/RidersForm";
import ActiveRiders from "../pages/Dashboard/ActiveRiders";
import PendingRiders from "../pages/Dashboard/PendingRiders";
import DeActiveRiders from "../pages/Dashboard/DeactiveRiders";

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
        path: "be-a-rider",
        loader: async () => {
          const res = await axios.get("/warehouses.json");
          return res.data;
        },
        element: <PrivateRoute>
          <RidersForm />
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
        path: "*",
        Component: Error
      },
      {
        path: "profile",
        Component: Profile
      },
      {
        path: "my-parcels",
        Component: MyParcels
      },
      {
        path: "payment/:id",
        Component: Payment
      },
      {
        path: "payment-history",
        Component: PaymentHistory
      },
      {
        path: "track-parcel",
        Component: TrackParcel
      },
      {
        path: "active-riders",
        Component: ActiveRiders
      },
      {
        path: "deActive-riders",
        Component: DeActiveRiders
      },
      {
        path: "pending-riders",
        Component: PendingRiders
      }
    ],

  }
]);

export default router;