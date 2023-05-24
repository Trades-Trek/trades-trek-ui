import moment from "moment-timezone";
import NigerianTimeZone from "./Negerian-TimeZone";

const NigerianDifferentDay = (date) => {
  var today = new Date();

  const temp = NigerianTimeZone(today);
  const formatDate = moment(temp).format("HH:mm:ss");

  today = new Date(moment(temp).format("YYYY-MM-DD"));
  const temp1 = NigerianTimeZone(date);
  const formatDate1 = moment(temp).format("HH:mm:ss");
  date = new Date(moment(temp1).format("YYYY-MM-DD"));
  let diffInMilliSeconds = Math.abs(date - today) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);

  return days;
};

export default NigerianDifferentDay;
