import { React, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SignupSlider from "../SignupSlider/SignupSlider";
import { useForm, Controller } from "react-hook-form";
import { userService } from "../../services";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions/users";
import { toast, ToastContainer } from "react-toastify";
// import 'react-phone-number-input/style.css'
// import PhoneInput from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { Loader } from "@mantine/core";
import { isBrowser, isMobileOnly, isTablet } from "react-device-detect";

// https://phonevalidation.abstractapi.com/v1/?api_key=4364d337d243447c97e34576cb324660&phone=+9190607574241
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
    control
  } = useForm();

  useEffect(() => {
    if (router.query) {
      reset({
        refferalCode: router?.query?.reffercode || "",
      });
    }
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
    data.mobileDeviceToken = ""
    data.device=device
    userService
      .signup(data)
      .then((res) => {
        if (res?.success === true) {
          setValidate(false);
          localStorage.setItem("email", data.email);
          setError(res.message);
          localStorage.setItem("otp", data.email);
          // dispatch(setUser(res.user));
          setIsLoading(false);
          router.replace("/otp");
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
    <>
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
      <div className="site--form--container">
        <div className="form--grid--wrapper">
          <div className="left--form--layout">
            <div className="form--site--logo">
              <Image
                src="/images/site--logo.svg"
                alt=""
                layout="responsive"
                width={146}
                height={41}
              />
            </div>
            <div className="form--title">
              <h1>Get Started is easy!</h1>
            </div>
            <div className="form--content">
              <p>
                7 days free usage. Payment will commence at end of 7 days.
                Cancel anytime before then, to halt payment.
              </p>
            </div>
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
            <form className="site--form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form--item">
                <input
                  className={`form--control ${
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
                <label className="form--label" htmlFor="fName">
                  First Name
                </label>
                <div className="invalid-feedback">
                  {errors.firstName?.type === "required" &&
                    "First Name is required"}
                  {errors.firstName?.type === "minLength" &&
                    "First Name should be atleast 3 characters"}
                  {errors.firstName?.type === "maxLength" &&
                    "First Name should be less than 20 characters"}
                  {errors.firstName?.type === "pattern" &&
                    "Only alphabets is allowed"}
                </div>
              </div>
              <div className="form--item">
                <input
                  className={`form--control ${
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
                <label className="form--label" htmlFor="lName">
                  Last Name
                </label>
                <div className="invalid-feedback">
                  {errors.lastName?.type === "required" &&
                    "Last Name is required"}
                  {errors.lastName?.type === "minLength" &&
                    "Last Name should be atleast 3 characters"}
                  {errors.lastName?.type === "maxLength" &&
                    "Last Name should be less than 20 characters"}
                  {errors.lastName?.type === "pattern" &&
                    "Only alphabets is allowed"}
                </div>
              </div>
              <div className="form--item">
                <input
                  className={`form--control ${
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
                <label className="form--label" htmlFor="email">
                  Email Address
                </label>
                <div className="invalid-feedback">
                  {errors.email?.type === "required" && "Email is required"}
                  {errors.email?.type === "pattern" && "Invalid Email"}
                </div>
              </div>
              {/* <div className="form--item ">
                <PhoneInput
                  className="form--control"
                  placeholder="Enter phone number"
                  value={phone}
                  country={"ng"}
                  enableSearch={true}
                  // defaultCountry="NG"
                  onChange={(phone) => setPhone(phone)}
                />
               
              </div> */}
              <div className="form--item">
                <input
                  className={`form--control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="username"
                  placeholder="username*"
                  {...register("username", {
                    maxLength: 20,
                    minLength: 3,
                    pattern: {
                      value: /^[A-Z,a-z,0-9]*$/,
                    },
                  })}
                />
                <label className="form--label" htmlFor="username">
                  username
                </label>
                <div className="invalid-feedback">
                  {errors.username?.type === "required" &&
                    "Username is required"}
                  {errors.username?.type === "minLength" &&
                    "Username should be atleast 3 characters"}
                  {errors.username?.type === "maxLength" &&
                    "Username should be less than 20 characters"}
                  {errors.username?.type === "pattern" && "Invalid User Name"}
                </div>
              </div>
              <div className="form--item">
                <div style={{ display: "flex" }}>
                  <input
                    style={{ width: "100%" }}
                    className={`form--control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="pwd"
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
                      className="passwordView"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <img
                      onClick={() => setShowPassword(!showPassword)}
                      src="/images/invisible.png"
                      className="passwordView"
                    />
                  )}
                </div>

                <label className="form--label" htmlFor="pwd">
                  Password
                </label>
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
              <div className="form--item">
                <div style={{ display: "flex" }}>
                  <input
                    style={{ width: "100%" }}
                    className={`form--control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    type={showCPassword ? "text" : "password"}
                    id="cnfpwd"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => {
                        if (watch("password") != value) {
                          return "Confirm password does not match";
                        }
                      },
                    })}
                  />
                  {showCPassword ? (
                    <img
                      src="/images/view.png"
                      className="passwordView"
                      onClick={() => setShowCPassword(!showCPassword)}
                    />
                  ) : (
                    <img
                      onClick={() => setShowCPassword(!showCPassword)}
                      src="/images/invisible.png"
                      className="passwordView"
                    />
                  )}
                </div>

                <label className="form--label" htmlFor="cnfpwd">
                  Confirm Password
                </label>
                <div className="invalid-feedback">
                  {errors.confirmPassword?.type === "required" &&
                    "Confirm password is required"}
                  {errors.confirmPassword?.type === "validate" &&
                    errors.confirmPassword?.message}
                </div>
              </div>
              <div className="form--item">
                <input
                  className={`form--control `}
                  type="text"
                  id="refferal"
                  placeholder="Enter Refferal Code"
                  {...register("refferalCode")}
                />
                <label className="form--label" htmlFor="refferal">
                  Refferal Code (Optional*)
                </label>
              </div>
              {/* <div className="form--item">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{
                      height: "20px",
                      width: "30px",
                      marginRight: "10px",
                    }}
                    className={`form--control ${
                      errors.age ? "is-invalid" : ""
                    }`}
                    type="checkbox"
                    id="age"
                    {...register("age", {
                      required: true,
                    })}
                  />
                  <span>
                    Are you 18 years old -- You should be atleast 18 year old to
                    use this application.
                  </span>
                </div>
                <div className="invalid-feedback">
                  {errors.age?.type === "required" && "Are you 18 years old"}
                </div>
              </div> */}
              <div className="form--content">
                <p>
                  By registering, you agree to the{" "}
                  <Link href="#">
                    <a>Terms Of Use</a>
                  </Link>{" "}
                  and{" "}
                  <Link href="#">
                    <a>Privacy Policy.</a>
                  </Link>
                </p>
              </div>
              <div className="form--actions">
                <button disabled={isLoading} className="btn" type="submit">
                  {isLoading ? <Loader color="#8000ff" /> : "Sign Up"}
                </button>
{/* 
                <GoogleLoginButton onClick={() => alert("Hello")} />

                <TwitterLoginButton onClick={() => alert("Hello")} />
                 */}

              </div>
              <div className="form--bottom--content">
                <p>
                  Already have an account?{" "}
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="right--form--layout">
            <div className="right--layout--content text--center">
              <SignupSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
