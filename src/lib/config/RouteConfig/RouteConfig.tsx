import Layout from "@/components/shared/layout";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import AuthPageAsync from "@/modules/AuthPage/AuthPage.async";
import ErrorPage from "@/modules/ErrorPage/ErrorPage";
import RegisterPageAsync from "@/modules/RegisterPage/RegisterPage.async";
import MainPage from "@/modules/MainPage/MainPage";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthPageAsync />,
  },
  {
    path: "/register",
    element: <RegisterPageAsync />,
  },
];

export const appRoutersConfig = createBrowserRouter([
  ...authRoutes,
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);
