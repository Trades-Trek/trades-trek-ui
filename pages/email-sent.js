import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";

export default function EmailSent() {
  useEffect(() => {
    document.body.classList.remove("signUp--page")
    document.body.classList.remove("otp--page")
  }, [])
  return (
    <>
      <div className="center--block email--sent--block">
        <div className="small--block text--center">
          <div className="tick--image">
            <Image src="/images/tick-circle.svg" layout="responsive" width={59} height={59} alt="" />
          </div>
          <div className="info--text email--sent--cnf">
            <p>Password reset link has been sent on your email successfully.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
