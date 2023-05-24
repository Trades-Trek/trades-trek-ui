import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import NigerianTimeZone from "../../helpers/Negerian-TimeZone";

const OrderExpired = ({ data }) => {
  const [time, setTime] = useState();
  const [currentTime,setCurrentTime]=useState()
  useEffect(() => {
    const temp = NigerianTimeZone(data.createdAt);
    const formatDate = moment(temp).format("HH:mm:ss");
    const temp1=NigerianTimeZone(new Date())
    const formatDate1 = moment(temp1).format("HH:mm:ss");
  
    setTime(formatDate)
    setCurrentTime(formatDate1)
  }, [data]);

  return (
    <>
      {data.orderType === "Limit" && data.duration == "Day Only" ? (
        <span>Today</span>
      ) : (
        <span>tommorow</span>
      )}
    </>
  );
};

export default OrderExpired;
