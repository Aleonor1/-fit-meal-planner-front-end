import React, { useState, FC } from "react";
import api from "../../axios/api";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import NavigationBar from "../NavigationBar/NavigationBar";

type FormState = {
  userName: string;
};

const initialFormState = {
  userName: "",
};

const ForgotPasswordForm: FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUsername()) {
      return;
    }

    try {
      const response = await api.post(
        "clients/forgot-password",
        JSON.stringify({
          userName: form.userName,
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

  return (
    <Layout>
      <NavigationBar />

      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          {/* Content */}
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Forgot Password
            </h1>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
                </svg>{" "}
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
              <div className="text-red-500 text-sm mb-4">{usernameError}</div>
            )}
            {generalError && (
              <div className="text-red-500 text-sm mb-4">{generalError}</div>
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
    </Layout>
  );
};

export default ForgotPasswordForm;
