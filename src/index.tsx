import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginForm from "./Components/Login";
import RegisterForm from "./Components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPasswordForm from "./Components/ForgotPassword";
import ResetPasswordForm from "./Components/ResetPasswordForm";

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
    path: "/reset-password",
    element: <ResetPasswordForm />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
