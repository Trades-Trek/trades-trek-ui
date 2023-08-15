import React, { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";

import { useSelector } from "react-redux";

import Link from "next/link";
import HighlightTrades from "../../components/HighlightTrades/HighlightTrades";
import HoldingTrades from "../../components/Holding-Short-Trades/HoldingTrades";
import LineChart from "../../components/Chart/LineChart";
import SelectGame from "../../components/SelectGame/SelectGame";
import { userService } from "../../services";
import { AnnualReturn, TodayPerChange } from "../../helpers/TodayChange";
import SubscriptionExpiredMessage from "../../components/MarketOpenClose/SubscriptionExpiredMessage";
import ToolTipCustome from "../../components/Competition/ToolTip";
import { orderService } from "../../services/order.service";

export default function Portfolio() {
  let { user } = useSelector((state) => state.userWrapper);
  const [graphData, setGraphData] = useState();
  const [typeData, setTypeData] = useState("week");
  const [perSelected, setPerSelected] = useState(false);
  const [userHistoryData, setuserHistoryData] = useState(null);


  useEffect(() => {
    userService
      .userPerformanceHistory(1)
      .then((res) => {
        if (res.success) {
          setuserHistoryData(res.history.docs);
        } else {
          setuserHistoryData([]);
        }
      })
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    userService
      .userGraph({ typeData, perSelected })
      .then((res) => {
        if (res.success) {
          setGraphData(res.data);
        } else {
          setGraphData();
        }
      })
      .catch((err) => {
        setGraphData();
      });
  }, [user, typeData, perSelected]);

  const calculateAnnualReturn = () => {
    return `${AnnualReturn(
      user?.portfolio?.competitionStartingCash,
      user?.portfolio?.accountValue + user?.portfolio?.profitOrLossToday,  // user?.portfolio?.currentValue,
      user?.portfolio?.createdAt
    )
      ?.toFixed(2)
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    %`;
  };

  return (
    <>
      <Sidebar />
      <div className="site--content">
        <div className="page--title--block">
          <div className="grid--2">
            <div className="grid-block-left wrapper--title">
              <h3>
                Welcome,{" "}
                {user &&
                  `${user?.user?.firstName || ""} ${user?.user?.lastName ||
                    ""}`}
              </h3>
            </div>
            <SelectGame />
          </div>

          {/* port folio section  */}
          <div className="profileContainer ">
            <div className="profileContainerLeft">
              <div className="profileContainerAccount">
                <div className="profileContainerAccountblock">
                  <span className="itemAlign">
                    ACCOUNT VALUE
                    <ToolTipCustome text="Displays the total current value of your portfolio, which is updated nightly after the market’s close." />
                  </span>

                  <p>
                 ₦
                    {(
                      user?.portfolio?.accountValue +
                      user?.portfolio?.profitOrLossToday
                    )
                      ?.toFixed(2)
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                  </p>
                </div>
                <div className="profileContainerAccountblock">
                  <div>
                    <div>
                      <span className="itemAlign">
                        TODAY'S CHANGE
                        <ToolTipCustome
                          text={`Gains/losses as a result of today's market activity.`}
                        />
                      </span>


{/*                       
                      <p>
                         ₦{ user?.portfolio.profitOrLossToday?.toFixed(2)*-1}
                      </p>
                      <span>
                       ({ (user?.portfolio.profitOrLossToday * 100) / user?.portfolio.accountValue?.toFixed(2)*-1}%)
                      </span> */}

                      <p>
                        + ₦
                        {(
                          user?.portfolio?.currentValue -
                          user?.portfolio?.previousValue
                        )
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                      <span>
                        {/*   */}
                      ({((user?.portfolio?.profitOrLossToday * 100) / user?.portfolio?.accountValue).toFixed(2)*-1}%)
                      </span>
                    </div>
                    <div>
                      <span className="itemAlign">
                        ANNUAL RETURN
                        <ToolTipCustome
                          text={`Percentage of return that you have earned if your returns were extrapolated for a year.`}
                        />
                      </span>

                      <p>{calculateAnnualReturn()}</p>
                    </div>
                  </div>
                </div>
                <div className="profileContainerAccountblock">
                  <div>
                    <div>
                      <span className="itemAlign">
                        BUYING POWER
                        <ToolTipCustome
                          text={`The total value of your cash and margin accounts that can be used to make trades. Calculated as: cash + (Long Stocks x 50%) - (Shorted Stocks x 150%).`}
                        />
                      </span>
                 <p>
                        ₦
                        {(
                          user?.portfolio?.buyingPower +
                          (user?.portfolio?.gameId?.allowTradingWithMargin
                            ? user?.portfolio?.profitOrLossToday / 2
                            : user?.portfolio?.profitOrLossToday)
                        )
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                    </div>
                    <div>
                      <span className="itemAlign">
                        CASH
                        <ToolTipCustome
                          text={`Total amount of cash available for making trades.`}
                        />
                      </span>

                      <p>
                        ₦
                        {(
                          user?.portfolio?.cash 
                        )
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profileContainerRank">
                <div className="rankText">
                  <span>CURRENT RANK</span>
                </div>
                {user?.portfolio?.rank ? (
                  <div className="rank">
                    <p className="yourrank">
                      {user?.portfolio?.rank

                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>{" "}
                    <svg
                      className="ml-12"
                      width="20"
                      height="26"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z"
                        fill="#008000"
                      />
                    </svg>{" "}
                    <p className="players">
                      of{" "}
                      {user?.portfolio?.gameId?.users?.length

                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      players
                    </p>
                  </div>
                ) : (
                  <div>Your rank will update daily starting tomorrow</div>
                )}

                {user?.top &&
                  user?.user.subscriptionDuration !== "free-lifetime" && (
                    <div>
                      <div className="rankText">
                        <span>TOP PLAYER</span>
                      </div>
                      <div className="rankText">
                        <h4>
                          <span className="textBlue">
                            <Link href="/dashboard/competition-summary">
                              <a href="#"> {user?.top?.result?.username} </a>
                            </Link>
                          </span>{" "}
                          ₦
                          {user?.top?.accountValue
                            ?.toFixed(2)
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                        </h4>
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="profileContainerRight">
              <div className="profileContainerRightBlock">
                <div className="profileContainerRightGraph">
                  {graphData && (
                    <div>
                      <span
                        className={`tab-graph ${typeData == "week" &&
                          "tab-graph-active"}`}
                        onClick={() => setTypeData("week")}
                      >
                        1W
                      </span>
                      <span
                        className={`tab-graph ${typeData == "month" &&
                          "tab-graph-active"}`}
                        onClick={() => setTypeData("month")}
                      >
                        1M
                      </span>
                      <span
                        className={`tab-graph ${typeData == "threemonth" &&
                          "tab-graph-active"}`}
                        onClick={() => setTypeData("threemonth")}
                      >
                        3M
                      </span>
                      <span
                        className={`tab-graph ${typeData == "sixmonth" &&
                          "tab-graph-active"}`}
                        onClick={() => setTypeData("sixmonth")}
                      >
                        6M
                      </span>
                      <span
                        className={`tab-graph ${typeData == "year" &&
                          "tab-graph-active"}`}
                        onClick={() => setTypeData("year")}
                      >
                        1Y
                      </span>
                    </div>
                  )}
                  {graphData && <LineChart graphData={graphData} />}
                </div>
                <div className="btn--group form--actions customWidth">
                  <div className="buttonGroup">
                    <Link
                      href="/dashboard/performance-history"
                      style={{ padding: "10px 20px" }}
                    >
                      <a className="btn form--submit">Performance History</a>
                    </Link>
                  </div>
                  <div className="rightBlock">
                    <div className="spText">
                      <input type="checkbox" />
                      <label>S&P 500</label>
                    </div>
                    <div className="spText percent">
                      <div className="box_1">
                        ₦
                        <input
                          // {...register("allowTradingWithMargin")}
                          type="checkbox"
                          className="switch_1"
                          checked={perSelected}
                          value={perSelected}
                          onClick={() => setPerSelected(!perSelected)}
                        />{" "}
                        %
                      </div>
                    </div>
                    {/* <div>₦<input checked={perSelected} value={perSelected} onClick={()=>setPerSelected(!perSelected)} type='checkbox' />%</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
         <div
            className="btn--group form--actions"
            style={{ margin: "10px", width: "35vw" }}
          >
            <Link
              href="/dashboard/performance-history"
              style={{ padding: "10px 20px" }}
            >
              <a className="btn form--submit">Performance History</a>
            </Link>
          </div>
         </div> */}
          <HoldingTrades />
        </div>
      </div>
    </>
  );
}
