import moment from "moment-timezone";
import React from "react";

const PendingSubscriptionCart = ({ item }) => {
  return (
    <div className={`block--info subscription activeSubscription`}>
      <div className="info--title">
        <span>{item?.interval?.toUpperCase()}</span>
      </div>

      <div className="info--text">
      <p>
           Category: {item.subscriptionId.category}
        </p>
        <p>
          Duration: {item.subscriptionId.packageDuration}
        </p>
        <p>
          Subscription Purchase Date: {moment(item?.createdAt).format("lll")}
        </p>
        <p>
          Subscription Activation Date:{" "}
          {moment(item?.activationDate).format("lll")}
        </p>
        <p>Subscription Expiry Date: {moment(item?.expireDate).format("lll")}</p>
        <p>Transaction reference: {item?.reference}</p>

        <p>Amount {item?.amount}</p>
      </div>
    </div>
  );
};

export default PendingSubscriptionCart;
