import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer/Footer';

export default function LoginForm() {
  useEffect(() => {
    document.body.classList.remove('signUp--page');
    document.body.classList.remove('otp--page');
  }, []);
  return (
    <>
      <div className="site--form--container">
        <div className="form--grid--wrapper welcome--layout">
          <div className="left--form--layout text--center">
            <div className="form--title">
              <h1>
                Welcome, John! <br />
                Let’s start trading!
              </h1>
            </div>
            <div className="form--content welcome-content">
              <p>
                <span className="tick--image--small">
                  <Image
                    src="/images/tick-circle.svg"
                    layout="responsive"
                    width={24}
                    height={24}
                    alt=""
                  />
                </span>{' '}
                You have successfully verified your email.
              </p>

              <p>
                You have $10,000,000 in virtual cash in TradesTrek Trading Game
              </p>

              <p>Discover what you can do on the TradesTrek Simulator</p>

              <div className="site--button">
                <Link href="javascript:void(0)">
                  <a className="btn">Get Started</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="right--form--layout">
            <div className="welocme-image">
              <Image
                src="/images/welcome-image.png"
                layout="responsive"
                width={752}
                height={911}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
