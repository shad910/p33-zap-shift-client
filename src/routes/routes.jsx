import { createBrowserRouter } from "react-router";
import axios from "axios";
import PrivateRoute from "./PrivateRoute";
import Error from "../shared/Error";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import AboutUs from "../pages/AboutUs";
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
import MakeAdmin from "../pages/Dashboard/MakeAdmin";
import Forbidden from "../shared/Forbidden";
import AdminRoute from "./AdminRoute";
import RiderRoute from "./RiderRoute"
import AllotRider from "../pages/Dashboard/AllotRider";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries"
import CompleteDelivery from "../pages/Dashboard/CompleteDelivery";
import MyEarning from "../pages/Dashboard/MyEarning";

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
      },
      {
        path: "forbidden",
        Component: Forbidden
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
      <DashboardLayout />
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

      // Rider Only Routes
      {
        path: "pending-deliveries",
        element: <RiderRoute>
          <PendingDeliveries />
        </RiderRoute>
      },
      {
        path: "complete-delivery",
        element: <RiderRoute>
          <CompleteDelivery />
        </RiderRoute>
      },
      {
        path: "my-earnings",
        element: <RiderRoute>
          <MyEarning />
        </RiderRoute>
      },

      // Admin Only Routes
      {
        path: "assign-rider",
        element: <AdminRoute>
          <AllotRider />
        </AdminRoute>
      },
      {
        path: "active-riders",
        element: <AdminRoute>
          <ActiveRiders />
        </AdminRoute>
      },
      {
        path: "deActive-riders",
        element: <AdminRoute>
          <DeActiveRiders />
        </AdminRoute>
      },
      {
        path: "pending-riders",
        element: <AdminRoute>
          <PendingRiders />
        </AdminRoute>
      },
      {
        path: "make-admin",
        element: <AdminRoute>
          <MakeAdmin />
        </AdminRoute>
      }
    ],

  }
]);

export default router;