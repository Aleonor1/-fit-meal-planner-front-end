import React, { useState, FC, useEffect } from "react";
import api from "../axios/api";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

type FormState = {
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialFormState = {
  userName: "",
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm: FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [mailError, setMailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const navigate = useNavigate();
  let isButtonDisabled = false;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  useEffect(() => {
    isButtonDisabled =
      usernameError !== null ||
      lastNameError !== null ||
      firstNameError !== null ||
      mailError !== null ||
      passwordError !== null ||
      confirmPasswordError !== null;

    console.log(isButtonDisabled);
  }, [
    usernameError,
    lastNameError,
    firstNameError,
    mailError,
    passwordError,
    confirmPasswordError,
    form,
  ]);

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

  const validateLastName = (): boolean => {
    const lastNameRegex = /^[A-Za-z\s]+$/;
    if (!form.lastName.trim()) {
      setLastNameError("Last name is required");
      return false;
    } else if (!lastNameRegex.test(form.lastName)) {
      setLastNameError("Invalid last name. It should contain only letter");
      return false;
    }
    setLastNameError(null);
    return true;
  };

  const validateFirstName = (): boolean => {
    const lastNameRegex = /^[A-Za-z\s]+$/;
    if (!form.lastName.trim()) {
      setFirstNameError("First name is required");
      return false;
    } else if (!lastNameRegex.test(form.lastName)) {
      setFirstNameError("Invalid first name. It should contain only letter");
      return false;
    }
    setLastNameError(null);
    return true;
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      setMailError("Mail is required");
      return false;
    } else if (!emailRegex.test(form.email)) {
      setMailError("Invalid Mail");
      return false;
    }
    setMailError(null);
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

    try {
      const response = await api.post(
        "clients/register",
        JSON.stringify({
          userName: form.userName,
          lastName: form.lastName,
          firstName: form.firstName,
          email: form.email,
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
      if (response && response.status === StatusCodes.CREATED) {
        navigate("/login");
      } else {
        setGeneralError(response.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-screen md:flex">
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.71-12.29L11 11.41 9.71 10.1a.996.996 0 1 0-1.41 1.41l2 2a.996.996 0 0 0 1.41 0l4-4a.996.996 0 1 0-1.41-1.41z"
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
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.71-12.29L11 11.41 9.71 10.1a.996.996 0 1 0-1.41 1.41l2 2a.996.996 0 0 0 1.41 0l4-4a.996.996 0 1 0-1.41-1.41z"
              />
            </svg>

            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              onBlur={validateLastName}
            />
          </div>
          {lastNameError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Last name error!</span>{" "}
              {lastNameError}
            </div>
          )}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.71-12.29L11 11.41 9.71 10.1a.996.996 0 1 0-1.41 1.41l2 2a.996.996 0 0 0 1.41 0l4-4a.996.996 0 1 0-1.41-1.41z"
              />
            </svg>

            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              onBlur={validateFirstName}
            />
          </div>
          {firstNameError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">First name error!</span>{" "}
              {firstNameError}
            </div>
          )}

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
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
              id="email"
              placeholder="Email"
              onChange={handleInputChange}
              onBlur={validateEmail}
            />
          </div>
          {mailError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Mail error!</span> {mailError}
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

          {
            <button
              type="submit"
              className="block w-full bg-purple-600 hover:bg-purple-700  mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              disabled={isButtonDisabled}
            >
              Register
            </button>
          }

          {generalError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> {generalError}
            </div>
          )}

          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Already a user? Log in!
          </span>
        </form>
      </div>
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
    </div>
  );
};
export default RegisterForm;
