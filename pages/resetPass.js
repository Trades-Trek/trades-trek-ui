import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { userService } from "../services/user.service";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [otp, setOtp] = useState("");
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
  } = useForm();

  useEffect(() => {
    document.body.classList.remove("signUp--page");
    document.body.classList.remove("otp--page");
  }, []);
  const SubmitForgot = () => {
    if (!password && !cpassword && !otp) {
      setValidate(true);
      setError("Please Fill All Field");
    } else if (!otp) {
      setValidate(true);
      setError("Otp is required.");
    } else if (!password || !cpassword) {
      setValidate(true);
      setError("Password is required.");
    } else if (password?.length < 8 || cpassword?.length < 8) {
      setValidate(true);
      setError("Password Should be greater than and equal to 8");
    } else if (!password && !cpassword && password != cpassword) {
      setValidate(true);
      setError("Password Not Matched");
    } else {
      userService
        .reset_password({
          email: query?.email,
          otp: Number(otp),
          newPassword: password,
          confirmNewPassword: cpassword,
        })
        .then((res) => {
          if (res?.success === true) {
            router.push({
              pathname: "/dashboard",
            });
          } else {
            setOtp("");
            setCpassword("");
            setPassword("");
            // resetFormValue();
            setValidate(true);
            setError(res.message);
          }
        })
        .catch((error) => {
          setValidate(true);
          setError(error.message);
        });
    }
  };

  const resetFormValue = () => {
    document.getElementById("create-course-form").reset();
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
          <form
            className="site--form"
            onSubmit={(e) => e.preventDefault()}
            id="create-course-form"
          >
            <div className="form--item">
              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="Otp"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={otp}
                className="form--control"
                onChange={(e) => setOtp(e.target.value)}
              />
              <label htmlFor="otp" className="form--label">
                Otp
              </label>
            </div>
            <div className="form--item">
              <input
                type={showPassword?"text":"password"}
                id="password"
                value={password}
                placeholder="Password"
                className="form--control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot--pwd">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </p>
              </div>
              <label htmlFor="password" className="form--label">
                Password
              </label>
            </div>
            <div className="form--item">
              <input
                type={showCPassword?"text":"password"}
                id="cpassword"
                value={cpassword}
                placeholder="Confirm Password"
                className="form--control"
                onChange={(e) => setCpassword(e.target.value)}
              />
               <div className="forgot--pwd">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  {showCPassword ? "Hide" : "Show"}
                </p>
              </div>
              <label htmlFor="cpassword" className="form--label">
                Confirm Password
              </label>
            </div>
          </form>
          <div className="info--button mt--12">
            {/* <Link href="/"> */}
            <a
              onClick={SubmitForgot}
              style={{ cursor: "pointer" }}
              className="btn"
            >
              Submit
            </a>
            {/* </Link> */}
          </div>
          <div className="form--bottom--content">
            <p>
              Already have an account?{" "}
              <Link href="/">
                <a>Log In</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
