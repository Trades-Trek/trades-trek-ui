import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Footer from '../components/Footer/Footer';

export default function EmailVerify() {
  useEffect(() => {
    document.body.classList.remove('signUp--page');
    document.body.classList.remove('otp--page');
  }, []);
  return (
    <>
      <div className="center--block">
        <div className="small--block text--center">
          <div className="block--title block--back--link">
            <Link href="/subscription">
              <a className="back--link"></a>
            </Link>
            <h1>Verify Email</h1>
          </div>
          <div className="email--image">
            <Image
              src="/images/email-verify-icon.svg"
              layout="responsive"
              width={99}
              height={99}
              alt=""
            />
          </div>
          <div className="info--text">
            <p>
              We need to verify your email
              <span>johnadam@gmail.com</span>
            </p>
          </div>
          <div className="info--button">
            <Link href="javascript:void(0)">
              <a className="btn">Request Code</a>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
