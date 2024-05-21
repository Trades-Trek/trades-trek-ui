import { React, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { userService } from '../../services';
import FormSpinner from '../Spinners/FormSpinner';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import { Router } from 'react-router';
export default function Otp() {
  const router = useRouter();
  const toastId = useRef(null);
  const [otp, setOpt] = useState('');
  const [error, setError] = useState(null);
  const [emailAddress, setEmailAddress] = useState();
  const [btnStatus, setBtnStatus] = useState(false);
  const [isLoaderActive, setLoaderStatus] = useState(false);
  const [isDownloadCampaign, setIsDownloadCampaign] = useState(false);

  useEffect(() => {
    let email = localStorage.getItem('email');
    if (email) {
      setEmailAddress(email);
    }else{

    if(!email && !emailAddress)
    window.location.href = '/login/';
    }

    if (router.query?.campaign && router.query?.campaign === "download-app") {
      setIsDownloadCampaign(true)
    }
  }, []);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setBtnStatus(true);
    setLoaderStatus(true);
    if (otp=== '' || otp.length !==4) {
      setBtnStatus(false);
      setLoaderStatus(false);
      setError('Otp is required');
    } else {
      setError('');
      let email = localStorage.getItem('email');
      const response = await userService.verifyLoginOtp(email,Number(otp), isDownloadCampaign);
       if (response.success === false) {
        setBtnStatus(false);
        setLoaderStatus(false)
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBtnStatus(false);
          setLoaderStatus(false)
        }
      } else {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoaderStatus(false)
          setBtnStatus(false);
        }
        setBtnStatus(false);
        setLoaderStatus(false);
        localStorage.removeItem('email');
      }
    }
    setBtnStatus(false);
    setLoaderStatus(false)
  };

 
  const resendOtp = async () => {
    setOpt('');
    let email = localStorage.getItem('email');
    try {
      const res = await userService
        .resendOtp(email);
      if (res?.success === true) {
        toast.success(res.message);
        setResendOtpClassActive(false);
        setMinutes(1);
        setSeconds(59);
      } else if (res?.success === false) {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(res.message);
        }
        setResendOtpClassActive(false);
      }
    } catch (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(error);
      }
    }
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
      <div className="center--block ">
        <div className="small--block text--center">
          <div className="block--title block--back--link">
         <h1> <button onClick={()=>{router.back()}} style={{marginRight:'20px'}}>{"<"}</button> Check your email</h1>
          </div>
          <div className="block--content">
            <p>
              We sent an OTP to <span>{emailAddress}</span>.
              Please check your inbox and enter the OTP here to confirm your email
            </p>
          </div>

          <form className="otp--form" onSubmit={(e) => verifyOtp(e)} id="create-course-form">

              <div className="form--item otp--input">
                <OtpInput className='otp-group'
                  value={otp}
                  onChange={(opt) => setOpt(opt)}
                  numInputs={4}
                  separator={""}
                />
              </div>
            <div className="info--button">
              <button
                type="submit"
                className="btn btnBgBlue"
                disabled={isLoaderActive}
              >
                {isLoaderActive ? <Loader color="#8000ff" />: 'Verify OTP'}
              </button>
            </div>
          </form>
          <div className="invalid-feedback">{error !== null && error}</div>
          <div className="form--bottom--content">
            <p>
              Didn’t get code?{' '}
              <a href="#" onClick={() => resendOtp()}>
                Resend
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
