import Link from "next/link";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Text } from "@mantine/core";

import MarketOpenClose from "../../components/MarketOpenClose/MarketOpenClose";

import Sidebar from "../../components/Sidebar/Sidebar";
import { userService } from "../../services";
import Iframe from "react-iframe";
import { useSelector } from "react-redux";
import UnsubscribeModel from "../../components/Modal/UnsubscribeModel";
import { Loader } from "@mantine/core";
import SubscriptionExpiredMessage from "../../components/MarketOpenClose/SubscriptionExpiredMessage";
import SubscriptionCart from "../../components/Subscription/SubscriptionCart";

export default function Sub() {
  let { user } = useSelector((state) => state.userWrapper);
  const [opened, { close, open }] = useDisclosure(false);

  const [allSubscription, setAllSubscription] = useState([]);
  const [modelOpened, setModelOpened] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    userService
      .getAllSubscription()
      .then((res) => {
        if (res.success) {
          setAllSubscription(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    userService
      .GetUserSubscriptionHistory()
      .then((res) => {
        if (res.success) {
          setSubscriptionHistory(res.data);
        } else {
          setSubscriptionHistory([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const Unsubscribe = (id) => {
    setModelOpened(true);
    setSubscriptionId(id);
  };

  const renderView = (item, user) => {
    const itemId = item?._id;
    const userSubscriptionId = user?.user?.subscriptionId;
    const userSubscriptionDuration = user?.user.subscriptionDuration;

    const nonPaidSubscriptions = ["free-lifetime", "trial"];
    if (itemId == userSubscriptionId) {
      if (nonPaidSubscriptions.includes(userSubscriptionDuration)) {
        return ""; // if user is currently on a free-lifetime / trial it ensures there is no link on the card
      } else {
        return (// if user is currently on a paid plan , when that plan is being rendered it should only show an unsubscribe button
          <Link href="#">
            <a onClick={() => Unsubscribe(item?._id)} className="btn">
              {`${item?.packageDuration.toUpperCase()} UNSUBSCRIBE`}{" "}
            </a>
          </Link>
        );
      }
    } else {

      if (!nonPaidSubscriptions.includes(item?.packageDuration)) {
        // for rendering card that one can subscribe to


        // if user is currently on trial  paid plans are prevent from showing on the UI with the subscriptionUsersCanSee()

        // if user is currently on free life time the paid cards should link to paystack
        if(user?.user.subscriptionDuration === 'free-lifetime'){
          return <Link
          href={`https://paystack.com/pay/${item.slug}?email=${user.user.email}&first_name=${user.user.firstName}&last_name=${user.user.lastName}&readonly=email,first_name,last_name`}
          passHref
        >
          <a
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >{`${item?.packageDuration.toUpperCase()} SUBSCRIPTION`}</a>
        </Link>
        }
  
        return item.packageDuration !== user?.user.subscriptionDuration ? (
          <Link href="#">
            <a onClick={open} className="btn">
              {`${item?.packageDuration.toUpperCase()} SUBSCRIPTION`}{" "}
            </a>
          </Link>
        ) : (
          <Link
            href={`https://paystack.com/pay/${item.slug}?email=${user.user.email}&first_name=${user.user.firstName}&last_name=${user.user.lastName}&readonly=email,first_name,last_name`}
            passHref
          >
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >{`${item?.packageDuration.toUpperCase()} SUBSCRIPTION`}</a>
          </Link>
        );
      }
    }
  };

  const subscriptionUsersCanSee = () => {
    const userSubscriptionDuration = user?.user?.subscriptionDuration;

    if (!userSubscriptionDuration || !allSubscription.length) {
      return [];
    }

    if (userSubscriptionDuration === "trial") {
      return allSubscription.filter((e) => e.packageDuration === "trial");
    }

    return allSubscription.filter((e) => e.packageDuration !== "trial");
  };

  const visibleSubscriptions = subscriptionUsersCanSee();

  return (
    <>
      <Sidebar />
      <div className="site--content">
        <div className="page--title--block">
          <div className="card-no-gap">
            <SubscriptionExpiredMessage />

            {isLoading || !user?.user?.subscriptionDuration ? (
              <div
                style={{
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loader color="#8000ff" />
              </div>
            ) : (
              <div className="trade-data wrapper--text card--grid card-col-gap">
                {/* When on free trial let's not make any other subscription available including freetrial */}
                {visibleSubscriptions.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`block--info subscription ${item?._id ==
                        user?.user?.subscriptionId && "activeSubscription"}`}
                    >
                      <div className="info--title">
                        <span>
                          <span className="currency">₦</span>{" "}
                          {item?.packageAmount
                            ?.toFixed(2)
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        <span>{item?.packageDuration.toUpperCase()}</span>
                        {/* <p>{item?.packageDuration}</p> */}
                      </div>
                      <div className="info--text">
                        <p>{item?.packageName}</p>
                      </div>

                      {user && user.user && (
                        <div
                          className="info--button"
                          style={{ marginBottom: "20px" }}
                        >
                          {renderView(item, user)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="site--content">
        <div className="page--title--block">
          <div className="card-no-gap">
            <h1
              className="mt--20"
              style={{ textAlign: "center", fontSize: "20px" }}
            >
              Subscription History
            </h1>
            <div className="trade-data wrapper--text card--grid card-col-gap">
              {subscriptionHistory.map((item, index) => (
                <SubscriptionCart user={user} item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title={
          <Text fw={700}>
           Unsubscribe from current subscription before subscribing to a new subscription
          </Text>
        }
      ></Modal>
      <UnsubscribeModel
        modelOpened={modelOpened}
        setModelOpened={setModelOpened}
        id={subscriptionId}
      />
    </>
  );
}
