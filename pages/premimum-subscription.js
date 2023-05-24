import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { userService } from "../services";

export default function Sub() {
  const [allSubscription, setAllSubscription] = useState([]);
  const [modelOpened, setModelOpened] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");

  useEffect(() => {
    userService
      .subscriptions()
      .then((res) => {
        if (res.success) {
          setAllSubscription(res.data);
        } else {
          setAllSubscription([]);
        }
      })
      .catch((err) => setAllSubscription([]));
  }, []);

  return (
    <>
      <div className="center--block">
        <div className="">
          <div className="block--title">
            <h1>Subscription Fees</h1>
          </div>
          <div className="block--content">
            <p>You will get access on all our platforms & features.</p>
          </div>
          <div>
            {allSubscription?.map((item) => {
              return (
                <div className="block--info">
                  <div className="info--title">
                    <span>${item?.packageAmount}</span>
                    <span>{item?.packageName}</span>
                    <span>({item?.packageDuration})</span>

                  </div>
                  <div className="info--text">
                    <p>
                    {item.packageDesc}
                    </p>
                  </div>
                  <Link href={`https://paystack.com/pay/${item.slug}`}>
                        <a className="btn">Premimum</a>
                      </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
