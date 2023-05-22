import React, { useState, FC, useEffect } from "react";
import api from "../axios/api";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import InvalidTokenPage from "./InvalidTokenPage";

type FormState = {
  password: string;
  confirmPassword: string;
};

const initialFormState = {
  password: "",
  confirmPassword: "",
};

const ResetPasswordForm: FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [validToken, setValidToken] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const validatePassword = (): boolean => {
    const password = form.password;
    const minLength = 8; //
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPasswordError("Minimum password length requirement not met!");
      return false;
    }

    if (!hasNumber || !hasSpecialChar) {
      setPasswordError(
        "Password does not meet the required rules! [minimum 8 characters and one special character]"
      );
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const validateConfirmPassword = (): boolean => {
    const password = form.confirmPassword;
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setConfirmPasswordError("Minimum password length requirement not met!");
      return false;
    }

    if (!hasNumber || !hasSpecialChar) {
      setConfirmPasswordError(
        "Password does not meet the required rules! [minimum 8 characters and one special character]"
      );
      return false;
    }

    if (password !== form.password) {
      setConfirmPasswordError("Password and confirm password are not the same");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await api.post(
        "clients/forgot-password",
        JSON.stringify({}),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );
      if (response && response.status === StatusCodes.OK) {
        navigate("/login");
      } else {
        setGeneralError(response.statusText);
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      setGeneralError(errorMessage);
    }
  };

  const validateToken = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      const response = await api.post(
        "clients/validate-token",
        JSON.stringify({ token }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );
      if (response && response.status === StatusCodes.OK) {
        setValidToken(true);
      } else {
        setValidToken(false);
      }
    } catch (error) {
      setValidToken(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (!validToken) {
    return <InvalidTokenPage />;
  }

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        {/* Content */}
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Forgot Password
          </h1>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>

            <input
              className="pl-2 outline-none border-none"
              type="password"
              name=""
              id="password"
              placeholder="Password"
              onChange={handleInputChange}
              onBlur={validatePassword}
            />
          </div>
          {passwordError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Password error!</span>{" "}
              {passwordError}
            </div>
          )}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>

            <input
              className="pl-2 outline-none border-none"
              type="password"
              name=""
              id="confirmPassword"
              placeholder="Password confirmation"
              onChange={handleInputChange}
              onBlur={validateConfirmPassword}
            />
          </div>
          {confirmPasswordError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Password error!</span>{" "}
              {confirmPasswordError}
            </div>
          )}

          <button
            type="submit"
            className="block w-full bg-purple-600 hover:bg-purple-700  mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Reset Password
          </button>
          <span
            className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
            onClick={handleBackToLogin}
          >
            Back to Login
          </span>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
