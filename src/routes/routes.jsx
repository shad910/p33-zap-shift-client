import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Coverage from "../pages/Coverage/Coverage";
import Error from "../shared/Error";
import AboutUs from "../shared/AboutUs";

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
        path: "/coverage",
        Component: Coverage
      },
      {
        path: "/about-us",
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
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  }
]);

export default router;