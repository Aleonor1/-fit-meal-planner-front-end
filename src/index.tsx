import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginForm from "./Components/LoginPage/Login";
import RegisterForm from "./Components/RegisterPage/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPasswordForm from "./Components/ForgotPassword/ForgotPassword";
import ResetPasswordForm from "./Components/ForgotPassword/ResetPasswordForm";
import AccountSettingsPage from "./Components/AccountSetting";
import LandingPage from "./Components/LandingPage/LandingPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/reset-password/",
    element: <ResetPasswordForm />,
  },
  {
    path: "/account-settings",
    element: <AccountSettingsPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
]);

root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
