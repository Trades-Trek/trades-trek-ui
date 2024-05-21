import { React, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { userService } from "../services";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../actions/users";
import { toast, ToastContainer } from "react-toastify";
// import 'react-phone-number-input/style.css'
// import PhoneInput from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { Loader } from "@mantine/core";
import { isBrowser, isMobileOnly, isTablet } from "react-device-detect";

export default function Signup() {
  const [btnStatus, setBtnStatus] = useState(false);
  const router = useRouter();
  const [validate, setValidate] = useState(false);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [phone, setPhone] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [device, setDevice] = useState("Browser");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    reset({
      campaign: router?.query?.campaign || "download-app",
    });
  }, [router]);
  useEffect(() => {
    if (isBrowser) {
      setDevice("Browser");
    } else if (isTablet) {
      setDevice("Tablet");
    } else if (isMobileOnly) {
      setDevice("Mobile");
    }
  }, [isBrowser, isTablet, isMobileOnly]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    data.mobileDeviceToken = "";
    data.device = device;
    data.username = "";
    data.refferalCode = "";

    userService
      .signup(data)
      .then((res) => {
        if (res?.success === true) {
          setValidate(false);
          localStorage.setItem("email", data.email);
          setError(res.message);
          localStorage.setItem("otp", data.email);
          setIsLoading(false);
          router.replace("/otp?campaign=download-app");
        } else if (res?.success === false) {
          setValidate(true);
          setError(res.message);
          setBtnStatus(false);
          setIsLoading(false);
        } else {
          setValidate(true);
          setError(res);
          setBtnStatus(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setValidate(true);
        setError(error.message);
        setBtnStatus(false);
        setIsLoading(false);
      });
  };
  return (
    <section className="bg-gray-50 bg-[#E6CCFF] h-screen">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            src="https://www.tradestrek.com/_next/static/media/Logo.a9821aa4.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#000000] dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white text-center">
              Sign Up
            </h1>

            {validate && (
              <div
                className=""
                style={{ border: "1px solid red", margin: "20px" }}
              >
                <p
                  style={{ textAlign: "center", padding: "10px", color: "red" }}
                >
                  {error}
                </p>
              </div>
            )}

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  First Name
                </label>
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="fName"
                  placeholder="First Name*"
                  {...register("firstName", {
                    required: true,
                    maxLength: 20,
                    minLength: 3,
                    pattern: {
                      value: /^[a-z,A-Z][A-Z,a-z\s]*$/,
                    },
                  })}
                />

                <div className="invalid-feedback">
                  {errors.firstName?.type === "required" &&
                    "First Name is required"}
                  {errors.firstName?.type === "minLength" &&
                    "First Name should be at least 3 characters"}
                  {errors.firstName?.type === "maxLength" &&
                    "First Name should be less than 20 characters"}
                  {errors.firstName?.type === "pattern" &&
                    "Only alphabets are allowed"}
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Last Name
                </label>
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="lName"
                  placeholder="Last Name*"
                  {...register("lastName", {
                    required: true,
                    maxLength: 20,
                    minLength: 3,
                    pattern: {
                      value: /^[a-z,A-Z][A-Z,a-z\s]*$/,
                    },
                  })}
                />

                <div className="invalid-feedback">
                  {errors.lastName?.type === "required" &&
                    "Last Name is required"}
                  {errors.lastName?.type === "minLength" &&
                    "Last Name should be at least 3 characters"}
                  {errors.lastName?.type === "maxLength" &&
                    "Last Name should be less than 20 characters"}
                  {errors.lastName?.type === "pattern" &&
                    "Only alphabets are allowed"}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Email Address
                </label>
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  type="email"
                  id="email"
                  placeholder="Email Address*"
                  {...register("email", {
                    required: true,
                    maxLength: 50,
                    pattern: {
                      value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/,
                    },
                  })}
                />

                <div className="invalid-feedback">
                  {errors.email?.type === "required" && "Email is required"}
                  {errors.email?.type === "pattern" && "Invalid Email"}
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required=""
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password*"
                  {...register("password", {
                    required: true,
                    maxLength: 15,
                    minLength: 8,
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[@$#!%*?_&])([a-zA-Z0-9@$#!%*?_&]{8,})$/,
                    },
                  })}
                />

                {showPassword ? (
                  <img
                    src="/images/view.png"
                    className="passwordView2"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <img
                    onClick={() => setShowPassword(!showPassword)}
                    src="/images/invisible.png"
                    className="passwordView2"
                  />
                )}

                <div className="invalid-feedback">
                  {errors.password?.type === "required" &&
                    "Password is required"}
                  {errors.password?.type === "minLength" &&
                    "Password should be atleast 8 characters"}
                  {errors.password?.type === "maxLength" &&
                    "Password should be less than 15 characters"}
                  {errors.password?.type === "pattern" &&
                    "Password must be alphanumeric with at least one special character"}
                </div>
              </div>

              <div className="flex items-start">
                <p className="text-white">
                  By registering, you agree to the{" "}
                  <Link href="https://www.tradestrek.com/terms">
                    <a>Terms Of Use</a>
                  </Link>{" "}
                  and{" "}
                  <Link href="https://www.tradestrek.com/privacy-policy">
                    <a>Privacy Policy.</a>
                  </Link>
                </p>
              </div>
              <button disabled={isLoading} className="btn" type="submit">
                {isLoading ? <Loader color="#8000ff" /> : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
