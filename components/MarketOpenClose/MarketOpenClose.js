import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import NigerianTimeZone from "../../helpers/Negerian-TimeZone";
import { data } from "autoprefixer";
import { userService } from "../../services";
const MarketOpenClose = () => {
  const [marketOpen, setmarketOpen] = useState(false);
  const [marketMessage, setMarketMessage] = useState("");
  const [holiday,setHoliday]=useState();
  const [message,setMessage]=useState('')

  const marketOpenTime = "09:30:00";
  const marketCloseTime = "14:30:00";
  


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
  const timeCount = (holiday) => {
    var today = new Date();
   
    const temp = NigerianTimeZone(today);
    const formatDate = moment(temp).format("HH:mm:ss");

    today = new Date(moment(temp).format("YYYY-MM-DD"));
    var newDate = new Date(moment(temp).format("YYYY-MM-DD HH:mm:ss"));
    if (moment(today).format("dddd")== "Saturday") {    
      today.setDate(today.getDate() + 2);
    } else if (moment(today).format("dddd") == "Sunday") {
      // today.setDate(today.getDate() + 1);
    }
    while (holiday.includes(moment(today).format("YYYY-MM-DD"))) {
     
      today.setDate(today.getDate() + 1);
      let day = moment(today).format("dddd");
      if (day == "Saturday") {
        
        today.setDate(today.getDate() + 2);
      } else if (day == "Sunday") {
        today.setDate(today.getDate() + 1);
      }
    }
   
    if (
      marketOpenTime <= formatDate &&
      marketCloseTime >= formatDate &&
      moment(today).format("YYYY-MM-DD") != moment(newDate).format("YYYY-MM-DD")
    ) {

      today.setHours(9);
      today.setMinutes(30);
      setmarketOpen(false);
      setMarketMessage(`${timeDiffCalc(newDate, today)} ${message?`(${message})`:""}`);
    } else if (marketOpenTime <= formatDate && marketCloseTime >= formatDate) {
 
      today.setHours(14);
      today.setMinutes(30);
      setmarketOpen(true);
      setMarketMessage(`${timeDiffCalc(newDate, today)} ${message?`(${message})`:""}`);


    } else if (marketOpenTime > formatDate) {

      today.setHours(9);
      today.setMinutes(30);
      setmarketOpen(false);
      setMarketMessage(`${timeDiffCalc(newDate, today)} ${message?`(${message})`:""}`);


    } else {
     
      today.setDate(today.getDate() + 1);
      today.setHours(9);
      today.setMinutes(30);
      setmarketOpen(false);
      setMarketMessage(`${timeDiffCalc(newDate, today)} ${message?`(${message})`:""}`);


    }
  };

  useEffect(() => {
   if(holiday){
    setInterval(() => {
      timeCount(holiday)
  
      }, 1000);
   }
    // timeCount(holiday)
  }, [holiday]);
  const allHoliday=async()=>{
    userService.getHoliday().then((res)=>{
      setHoliday(res.data)
      setMessage(res.desc ||'')
    }).catch((err)=>console.log(err))

  }

  useEffect(()=>{

    allHoliday()
  },[])
 
  return (
    <>
      {marketOpen ? (
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
          Market is open. Close in {marketMessage}
        </div>
      ) :marketMessage? (
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
          Market is closed. Opens in {marketMessage}
        </div>
      ):""}
    </>
  );
};

export default MarketOpenClose;
