import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import { userService } from '../services/user.service'
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState(false)
  const router = useRouter();

  useEffect(() => {
    document.body.classList.remove('signUp--page');
    document.body.classList.remove('otp--page');
  }, []);
  const SubmitForgot = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      userService
        .forgot_password(email)
        .then((res) => {
          if (res?.success === true) {
            setEmailValid(true)
            setSuccess(true)
            setError(`We have sent a verification code to the email address linked to your Trades Trek account`)
            setTimeout(() => {
              setEmailValid(false)
              setSuccess(false)
              setError("")
              router.push({
                pathname: "/resetPassword",
                query: { email: email }
              })
            }, 3000);


          } else {
            setEmailValid(true)
            setError(res.message)
          }
        })
        .catch((error) => {
          setEmailValid(true)

          setError(error.message)

        });

    } else {
      setEmailValid(true)
      setError("You must enter a valid Email")
    }


  }
  return (
    <>
      <div className="center--block">
        <div className="small--block">
          <div className="block--title block--back--link text--center">
            {/* <Link href="/subscription"> */}
            <a className="back--link" onClick={() => router.back()}></a>
            {/* </Link> */}
            <h1>Forgot Password</h1>
          </div>
          <div className="info--text mt--12">
            <p>
              Enter your email associated with account. <br />
              We’ll send you password reset link.
            </p>
          </div>
          {emailValid && <div className="" style={{ border: success ? '1px solid green':'1px solid red', margin: '20px' }}>
            <p style={{ textAlign: 'center', padding: '10px', color:  success ? "green": 'red'  }}>{error}</p>
          </div>}
          <form className="site--form">
            <div className="form--item">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form--control"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="form--label">
                Email
              </label>
            </div>
          </form>
          <div className="info--button mt--12">
            {/* <Link href="/"> */}
            <a onClick={SubmitForgot} style={{ cursor: 'pointer' }} className="btn">Submit</a>
            {/* </Link> */}
          </div>
          <div className="form--bottom--content">
            <p>
              Already have an account?{' '}
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
