import React, { useState, useEffect } from 'react';

const NigerianStockMarketStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0 });

  // Function to check if the current time falls within the stock market opening hours
  const isMarketOpen = () => {
    const currentDateTime = new Date();
    const currentDayOfWeek = currentDateTime.getDay();
    const currentHour = currentDateTime.getUTCHours() + 1; // Convert to Nigerian time (UTC +1)
    const currentMinute = currentDateTime.getUTCMinutes();

    const isWeekend = currentDayOfWeek === 0 || currentDayOfWeek === 6; // Sunday: 0, Saturday: 6
    const isBeforeOpeningTime = currentHour < 9 || (currentHour === 9 && currentMinute < 30);
    const isAfterClosingTime = currentHour > 14 || (currentHour === 14 && currentMinute >= 30);

    return !(isWeekend || isBeforeOpeningTime || isAfterClosingTime);
  };

  useEffect(() => {
    // Update the market status and time remaining on component mount
    setIsOpen(isMarketOpen());
    updateRemainingTime();

    // Update the market status and time remaining every minute
    const timer = setInterval(() => {
      setIsOpen(isMarketOpen());
      updateRemainingTime();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Function to calculate the time remaining until the next market opening or closing
  // Function to calculate the time remaining until the next market opening or closing
  const updateRemainingTime = () => {
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getUTCHours() + 1; // Convert to Nigerian time (UTC +1)
    const currentMinute = currentDateTime.getUTCMinutes();
  
    if (isMarketOpen()) {
      const closingHour = 14;
      const closingMinute = 30;
      let remainingHours = closingHour - currentHour;
      let remainingMinutes = closingMinute - currentMinute;
  
      if (remainingMinutes < 0) {
        remainingHours--;
        remainingMinutes += 60;
      }
  
      setTimeRemaining({ hours: remainingHours, minutes: remainingMinutes });
    } else {
      // Check if it's Friday after the closing time
      const isAfterFridayClosingTime =
        currentDateTime.getDay() === 5 && (currentHour > 14 || (currentHour === 14 && currentMinute >= 30));
  
      // Calculate the time until the next market opening on Monday if it's after Friday closing time
      if (isAfterFridayClosingTime) {
        const nextOpeningHour = 9;
        const nextOpeningMinute = 30;
  
        // Calculate the time remaining for the weekend plus the time until Monday's opening
        let remainingHours = (3 * 24) + (nextOpeningHour - currentHour);
        let remainingMinutes = nextOpeningMinute - currentMinute;
  
        if (remainingMinutes < 0) {
          remainingHours--;
          remainingMinutes += 60;
        }
  
        // Calculate the number of days from remaining hours
        const days = Math.floor(remainingHours / 24);
        remainingHours %= 24;
  
        setTimeRemaining({ days, hours: remainingHours, minutes: remainingMinutes });
      } else {
        const nextOpeningHour = 9;
        const nextOpeningMinute = 30;
        let remainingHours = nextOpeningHour - currentHour;
        let remainingMinutes = nextOpeningMinute - currentMinute;
  
        if (remainingMinutes < 0) {
          remainingHours--;
          remainingMinutes += 60;
        }
  
        if (remainingHours < 0) {
          remainingHours += 24;
        }
  
        setTimeRemaining({ hours: remainingHours, minutes: remainingMinutes });
      }
    }
  };
  
  


const convertLongHoursTodays = (val) => {
  return  val > 24  ? `${val} hours` : `${val} hours`
};

  return (
    <div className="status-summary font-18">
      {isOpen ? (
        <>
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
          Market is open. Close in {timeRemaining.hours} hours, {timeRemaining.minutes} minutes
        </>
      ) : (
        <>
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
          Market is closed. Opens in {convertLongHoursTodays(timeRemaining.hours)} , {timeRemaining.minutes} minutes
        </>
      )}
    </div>
  );
};

export default NigerianStockMarketStatus;
