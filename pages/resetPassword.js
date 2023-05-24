import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { userService } from "../services/user.service";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function ResetPassword() {

  const [validate, setValidate] = useState(false);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const router = useRouter();
  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    document.body.classList.remove("signUp--page");
    document.body.classList.remove("otp--page");
  }, []);


  const resetFormValue = () => {
    document.getElementById("create-course-form").reset();
  };
  const onSubmit = (data) => {
    userService
        .reset_password({
          email: query?.email,
          otp: Number(data.otp),
          newPassword: data.password,
          confirmNewPassword: data.confirmPassword,
        })
        .then((res) => {
          if (res?.success === true) {
            
            router.push({
              pathname: "/",
            });
          } else {
       reset()
            // resetFormValue();
            setValidate(true);
            setError(res.message);
          }
        })
        .catch((error) => {
          setValidate(true);
          setError(error.message);
        });
  };
  return (
    <>
      <div className="center--block">
        <div className="small--block">
          <div className="block--title block--back--link text--center">
            {/* <Link href="/subscription"> */}
            <a className="back--link" onClick={() => router.back()}></a>
            {/* </Link> */}
            <h1>Reset Password</h1>
          </div>
          <div className="info--text mt--12">
            <p>Enter your New Password and Otp</p>
          </div>
          {validate && (
            <div
              className=""
              style={{ border: "1px solid red", margin: "20px" }}
            >
              <p style={{ textAlign: "center", padding: "10px", color: "red" }}>
                {error}
              </p>
            </div>
          )}
          <form className="site--form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form--item">
              <input
                className={`form--control ${errors.otp ? "is-invalid" : ""}`}
                type="text"
                id="otp"
                placeholder="Otp"
                {...register("otp", {
                  required: true,
                  maxLength: 4,
                  minLength: 4,
                  pattern: {
                    value: /^[0-9]*$/,
                  },
                })}
              />
              <label className="form--label" htmlFor="otp">
                Otp
              </label>
              <div className="invalid-feedback">
                {errors.otp?.type === "required" && "Otp is required"}
                {errors.otp?.type === "minLength" &&
                  "Otp should be atleast 4 characters"}
                {errors.otp?.type === "maxLength" &&
                  "Otp should be less than 5 characters"}
                {errors.otp?.type === "pattern" && "Only Number is Allowed"}
              </div>
            </div>

            <div className="form--item">
             <div style={{display:'flex'}}>
             <input
             style={{width:'100%'}}
                className={`form--control ${
                  errors.password ? "is-invalid" : ""
                }`}
                type={showPassword ? "text" : "password"}
                id="pwd"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  maxLength: 15,
                  minLength: 8,

                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[@$#!%*?_&])([a-zA-Z0-9@$#!%*?_&]{8,})$/,
                  },
                })}
              />
                {showPassword?<img src='/images/view.png' className='passwordView' onClick={()=>setShowPassword(!showPassword)}/>:<img onClick={()=>setShowPassword(!showPassword)} src='/images/invisible.png' className='passwordView'/>}
              
             </div>
              <label className="form--label" htmlFor="pwd">
                Password
              </label>
              <div className="invalid-feedback">
                {errors.password?.type === "required" && "Password is required"}
                {errors.password?.type === "minLength" &&
                  "Password should be atleast 8 characters"}
                {errors.password?.type === "maxLength" &&
                  "Password should be less than 15 characters"}
                   {errors.password?.type === "pattern" &&
                    "Password must be alphanumeric with at least one special character"}
              </div>
            </div>
            <div className="form--item">
             <div style={{display:'flex'}}>
             <input
             style={{width:'100%'}}
                className={`form--control ${errors.cpassword ? "is-invalid" : ""}`}
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
              <div className="forgot--pwd">
                
                {showCPassword?<img src='/images/view.png' className='passwordView' onClick={()=>setShowCPassword(!showCPassword)}/>:<img onClick={()=>setShowCPassword(!showCPassword)} src='/images/invisible.png' className='passwordView'/>}

              </div>
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

            <div className="form--actions">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
            <div className="form--bottom--content">
              <p>
                Already have an account?{" "}
                <Link href="/">
                  <a>Login</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
