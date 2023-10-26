import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NigerianTimeZone from "../../helpers/Negerian-TimeZone";

const SubscriptionExpiredMessage = () => {
  let { user } = useSelector((state) => state.userWrapper);

  if (user && user.user && user.user.subscriptionDuration === "free-lifetime") {
    return null;
  }

  const renderSubscriptionMessage = () => {
    if (user && user.user) {
      if (user.user.subscriptionDuration === "free-lifetime") return; 
      if (user.user.subscriptionDuration === "trial") {
        return `You are currently on free-trial plan which ends on  ${moment(
          user?.user?.currentSubscriptionExpiryDate
        ).format("ll")}`;
      }

      return `You are currently on ${user?.user?.subscriptionDuration?.toUpperCase()} Subscription which ends on  ${moment(
        user?.user?.currentSubscriptionExpiryDate
      ).format("ll")}`;
    }
  };

  return (
    <>
      {user?.user?.currentSubscriptionExpiryDate ? (
        <>
          {user?.user?.currentSubscriptionExpiryDate &&
          NigerianTimeZone(new Date()) >=
            NigerianTimeZone(
              moment(user?.user?.currentSubscriptionExpiryDate).add(2, "hours")
            ) ? (
            <div className="status-summary font-18">
              <span>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.375 0.25C3.89746 0.25 0.25 3.89746 0.25 8.375C0.25 12.8525 3.89746 16.5 8.375 16.5C12.8525 16.5 16.5 12.8525 16.5 8.375C16.5 3.89746 12.8525 0.25 8.375 0.25ZM8.375 1.5C12.1787 1.5 15.25 4.57129 15.25 8.375C15.25 12.1787 12.1787 15.25 8.375 15.25C4.57129 15.25 1.5 12.1787 1.5 8.375C1.5 4.57129 4.57129 1.5 8.375 1.5ZM7.75 4V10.25H9V4H7.75ZM7.75 11.5V12.75H9V11.5H7.75Z"
                    fill="#F45531"
                  />
                </svg>
              </span>
              Your subscription is expired (
              {moment(user?.user?.currentSubscriptionExpiryDate).format("ll")}).
            </div>
          ) : (
            <div className="status-summary font-18">
              <span>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12.5" cy="12.5" r="12.5" fill="#00FFA0" />
                  <path
                    d="M19.7244 7.70177L19.6227 7.60791L19.521 7.70177L10.8422 15.71L7.3851 12.5235L7.38444 12.5228L7.04211 12.2035L6.94035 12.1085L6.83807 12.2029L6.14828 12.8394L6.02815 12.9502L6.14889 13.0604L6.49503 13.3763L6.49569 13.3769L10.7405 17.2972L10.8422 17.3911L10.9439 17.2972L20.4142 8.55874L20.5337 8.4485L20.4142 8.33826L19.7244 7.70177Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0.3"
                  />
                </svg>
              </span>
              {renderSubscriptionMessage()}
              {/* {user?.user?.subscriptionId?`Your Next Billing Date ${moment(user?.user?.currentSubscriptionExpiryDate).format("ll")} (${user?.user?.subscriptionDuration?.toUpperCase()} Subscription)`:`Subscription Expired Date ${moment(user?.user?.currentSubscriptionExpiryDate).format("ll")} (Cancelled ${user?.user?.subscriptionDuration?.toUpperCase()} Subscription)`} */}
              {/* Your Next Billing Date {moment(user?.user?.currentSubscriptionExpiryDate).format("ll")} {user?.user?.subscriptionId?` (${user?.user?.subscriptionDuration?.toUpperCase()} Subscription)`:` (Cancelled ${user?.user?.subscriptionDuration?.toUpperCase()} Subscription)`} */}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SubscriptionExpiredMessage;
