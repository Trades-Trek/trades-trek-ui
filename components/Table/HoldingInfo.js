import React, { useEffect, useState } from "react";
import IncreaseDecrease from "./IncreaseDecrease";

const HoldingInfo = ({
  totalValue,
  totalChange,
  setRefresh,
  refresh,
  todayChange,
  effect,
  setEffect,
}) => {
  const [totalChanges, setTotalChange] = useState(0);
  const [todayPer, setTodayPer] = useState(0);
  useEffect(() => {
    let temp = (totalChange * 100) / (totalValue - totalChange);
    let temp1 = (todayChange * 100) / (totalValue - todayChange);
    setTotalChange(temp);
    setTodayPer(temp1);
  }, [totalValue, totalChange, todayChange]);
  const refress = () => {
    setEffect(true);
    setTimeout(() => {
      setEffect(false);
    }, 2000);
  };
  return (
    <div
      style={{
        marginBottom: "73px",
        padding: "53px",
        boxShadow: "5px 5px 5px 5px #f7f7f7",
      }}
    >
      <button
        disabled={effect}
        style={{
          marginLeft: "90%",
          padding: "5px 10px",
          border: "1px solid black",
          marginTop: "20px",
        }}
        onClick={() => {
          setRefresh(!refresh), refress();
        }}
      >
        Refresh
      </button>

      <table>
        <thead>
          <tr>
            <td>TOTAL VALUE</td>
            <td>TODAY'S CHANGE</td>
            <td>TOTAL GAIN/LOSS</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h1>₦{totalValue.toFixed(2)}</h1>
            </td>
            {IncreaseDecrease(todayChange, todayPer)}
            {IncreaseDecrease(totalChange, totalChanges)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HoldingInfo;
