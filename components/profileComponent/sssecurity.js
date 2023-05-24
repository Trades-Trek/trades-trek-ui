import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { userService } from "../../services/user.service";
import { useRouter } from "next/router";

export default function Security() {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();

  const SubmitForgot = () => {
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        userService
          .changePassword({
            oldPassword,
            newPassword,
            confirmNewPassword: confirmPassword,
          })
          .then((res) => {
            if (res?.success === true) {
              router.push({
                pathname: "/",
              });
            } else {
              setError(true);
              setErrorMessage(res.message);
            }
          })
          .catch((error) => {
            setError(true);

            setErrorMessage(error.message);
          });
      } else {
        setError(true);
        setErrorMessage("Confirm Password Not Matched");
      }
    } else {
      setError(true);
      setErrorMessage("All Field Required");
    }
  };
  return (
    <>
      <div className="center--block">
        <div className="small--block">
          <div className="block--title block--back--link text--center">
            <h1>Change Password</h1>
          </div>

          {error && (
            <div
              className=""
              style={{ border: "1px solid red", margin: "20px" }}
            >
              <p style={{ textAlign: "center", padding: "10px", color: "red" }}>
                {errorMessage}
              </p>
            </div>
          )}
          <form className="site--form">
            <div className="form--item">
              <input
                type="password"
                id="password"
                placeholder="Old Password"
                className="form--control"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <label htmlFor="password" className="form--label">
                Old Password
              </label>
            </div>
            <div className="form--item">
              <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                className="form--control"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="newPassword" className="form--label">
                New Password
              </label>
            </div>
            <div className="form--item">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="form--control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmPassword" className="form--label">
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
        </div>
      </div>
      <Footer />
    </>
  );
}
