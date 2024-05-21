import React, { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Otp from '../components/Otp/Otp';
export default function OtpProcess() {
  useEffect(() => {
    document.body.classList.add('otp--page h-screen bg-[#E6CCFF]');
    document.body.classList.remove('signUp--page');
  });
  return (
    <>
      <Otp />
      <Footer />
    </>
  );
}
