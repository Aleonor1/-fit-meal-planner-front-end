import React, { useState, FC } from "react";
import api from "../axios/api";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

type FormState = {
  userName: string;
  password: string;
};

const initialFormState = {
  userName: "",
  password: "",
};

const LoginForm: FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "clients/login",
        JSON.stringify({
          userName: form.userName,
          password: form.password,
        }),
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

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const validateUsername = (): boolean => {
    const usernameRegex = /^[a-zA-Z0-9](?!.*?_$)[a-zA-Z0-9_]{2,18}[a-zA-Z0-9]$/;
    if (!form.userName.trim()) {
      setUsernameError("Username is required");
      return false;
    } else if (!usernameRegex.test(form.userName)) {
      setUsernameError(
        "Invalid username. It must be between 4 and 20 characters, can only contain alphanumeric characters and underscores, and must not start or end with an underscore"
      );
      return false;
    }
    setUsernameError(null);
    return true;
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

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            FitMeal Planner
          </h1>
          <p className="text-white mt-1">
            The ultimate meal planning application for fitness enthusiasts
          </p>
          <button
            type="submit"
            className="block hover:bg-grey-700  w-28 bg-white text-purple-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id="userName"
              placeholder="Username"
              onChange={handleInputChange}
              onBlur={validateUsername}
            />
          </div>
          {usernameError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Username error!</span>{" "}
              {usernameError}
            </div>
          )}
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
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
          <button
            type="submit"
            className="block w-full bg-purple-600 hover:bg-purple-700  mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
          <span
            className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </span>
          {generalError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> {generalError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
