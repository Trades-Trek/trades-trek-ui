import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import Footer from "../components/Footer/Footer";
import { userService } from "../services";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  useEffect(() => {
    document.body.classList.remove("signUp--page");
    document.body.classList.remove("otp--page");
    if (userService.userValue) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <>
      <Login />
      <Footer />
    </>
  );
}
