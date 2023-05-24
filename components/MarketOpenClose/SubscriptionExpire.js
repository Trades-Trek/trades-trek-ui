import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NigerianTimeZone from "../../helpers/Negerian-TimeZone";

const SubscriptionExpire = () => {
  let { user } = useSelector((state) => state.userWrapper);

  const [message, setMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }

    difference +=
      hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference +=
      minutes === 0 || hours === 1
        ? `${minutes} minutes`
        : `${minutes} minutes`;

    return difference;
  }
  const timeCount = () => {
    var today = new Date();
    today.setMinutes(today.getMinutes()-10)
    var temp = NigerianTimeZone(today);
    var expired = user?.user?.expiredDate;
    var temp1 = NigerianTimeZone(expired);
    today = new Date(moment(temp).format("YYYY-MM-DD HH:mm:ss"));
    expired = new Date(moment(temp1).format("YYYY-MM-DD HH:mm:ss"));

    if (expired > today) {
      setIsExpired(false);
    } else {
      setIsExpired(true);
    }

    setMessage(timeDiffCalc(expired, today));
  };

  useEffect(() => {
    if (user?.user?.expiredDate) {
      setInterval(() => {
        timeCount();
      }, 1000);
    }
  }, [user]);

  return (
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
   {isExpired?"Your subscription is expired.":` Your Subscription is Expired after ${message}`}
  </div>
  );
};

export default SubscriptionExpire;
