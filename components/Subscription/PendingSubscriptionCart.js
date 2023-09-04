import moment from "moment-timezone";
import React from "react";

const PendingSubscriptionCart = ({ item }) => {
  return (
    <div className={`block--info subscription`}>
      <div className="info--title">
        <span>{item?.interval.toUpperCase()}</span>
      </div>

      <div className="info--text">
        <p>
          Subscription Purchase Date {moment(item?.createdAt).format("lll")}
        </p>
      </div>
    </div>
  );
};

export default PendingSubscriptionCart;
