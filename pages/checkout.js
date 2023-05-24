import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import { userService } from '../services';

export default function Checkout() {
  const [emailAddress, setEmailAddress] = useState();
  const router=useRouter()
  useEffect(() => {
    document.body.classList.remove('signUp--page');
    document.body.classList.remove('otp--page');
  }, []);
  useEffect(() => {
    let email = localStorage.getItem("email");
    if (email) {
      setEmailAddress(email);
    }
  }, []);
  const handlePremium = () => {
    userService
      .subscriptionUpdate(emailAddress, "Premium")
      .then((res) => {
       router.push('/dashboard')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <>
      <div className="center--block">
        <div className="small--block">
          <div className="block--title block--back--link">
            <Link href="/subscription">
              <a className="back--link"></a>
            </Link>
            <h1>Select an option to pay</h1>
          </div>
          <div className="block--card--img">
            <Image
              src="/images/card--img.png"
              layout="responsive"
              width={511}
              height={96}
              alt=""
            />
          </div>

          <div className="card--block">
            <form className="card--form">
              <div className="form--item">
                <label className="form--label" htmlFor="cardNo">
                  Card Number
                </label>
                <input type="number" id="cardNo" className="form--control" />
              </div>
              <div className="form--group">
                <div className="form--item">
                  <label className="form--label" htmlFor="expDt">
                    Expiry Date
                  </label>
                  <input
                    className="form--control"
                    id="expDt"
                    type="text"
                    placeholder="MM / YY"
                  />
                </div>
                <div className="form--item">
                  <label className="form--label" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    className="form--control"
                    id="cvv"
                    type="text"
                    placeholder="CVV"
                  />
                </div>
              </div>
              <div className="form--actions">
                <button type="submit" className="btn">
                  Pay $10.00
                </button>
              </div>
            </form>
            <div className="checkout--options">
              <p className="option-title">Other Payment Methods</p>
              <div className="option--list">
                <ul>
                  <li>
                    <Link href="javascript:void(0)">
                      <a>
                        <span className="option--img">
                          <Image
                            src="/images/paypal.svg"
                            layout="responsive"
                            height={48}
                            width={132}
                            alt=""
                          />
                        </span>
                        <span>Paypal</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="javascript:void(0)">
                      <a>
                        <span className="option--img">
                          <Image
                            src="/images/paystack.svg"
                            layout="responsive"
                            height={48}
                            width={132}
                            alt=""
                          />
                        </span>
                        <span>Paystack</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="javascript:void(0)">
                      <a>
                        <span className="option--img">
                          <Image
                            src="/images/flutterwave.svg"
                            layout="responsive"
                            height={48}
                            width={132}
                            alt=""
                          />
                        </span>
                        <span>Flutterwave</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <Link href='#'  className="form--actions">
                <button onClick={handlePremium} type="submit" className="btn">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
