import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { DataConvert } from "../../helpers/DateTimeConverter";
import { orderService } from "../../services/order.service";
import IncreaseDecrease from "../Table/IncreaseDecrease";

const HoldingTables = () => {
  const [holding, setHolding] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [holdingCurrent, setHoldingCurrent] = useState(0);
  const [holdingPurchase, setHoldingPurchanse] = useState(0);
  const [totalTodayChange, setTotalTodayChange] = useState(0);
  const [totalGainOrLoss, setTotalGainOrLoss] = useState(0);
  const [todayChangePer, setTodayChangePer] = useState(0);
  const [totalChangePer, setTotalChangePer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [calculatedTotalValue, setCalculatedTotalValue] = useState(0);
  const [
    calculatedTodaysChangeNaira,
    setCalculatedTodaysChangeNaira,
  ] = useState(0);
  const [
    calculatedTodaysChangePercentage,
    setCalculatedTodaysChangePercentage,
  ] = useState(0);

  const [
    calculatedTotalGainOrLossNaira,
    setCalculatedTotalGainOrLossNaira,
  ] = useState(0);
  const [
    calculatedTotalGainOrLossPercentage,
    setCalculatedTotalGainOrLossPercentage,
  ] = useState(0);

  let { user } = useSelector((state) => state.userWrapper);

  const router = useRouter();

  useEffect(() => {
    getAllHolding(currentPage);
  }, [currentPage, user]);

  const getAllHolding = (page) => {
    setIsLoading(true);

    orderService
      .holdingProfitOrLoss(page)
      .then((res) => {
        if (res.success) {
          setHolding(res.holding.docs);

          setAllPage(res.holding.pages);
          setHoldingCurrent(res.holdingCurrent);

          setCalculatedTotalValue(res.calculatedTotalValue);
          setCalculatedTodaysChangeNaira(res.calculatedTodaysChangeNaira);
          setCalculatedTodaysChangePercentage(
            res.calculatedTodaysChangePercentage
          );
          setCalculatedTotalGainOrLossNaira(res.calculatedTotalGainOrLossNaira);
          setCalculatedTotalGainOrLossPercentage(
            res.calculatedTotalGainOrLossPercentage
          );

          setHoldingPurchanse(res.holdingPurchase);
          setTotalTodayChange(res.totalTodayChange);
          setTotalGainOrLoss(res.totalGainOrLoss);
          setTodayChangePer(
            (res.totalTodayChange * 100) /
              (res.holdingCurrent - res.totalTodayChange)
          );
          setTotalChangePer(
            (res.totalGainOrLoss * 100) /
              (res.holdingCurrent - res.totalGainOrLoss)
          );
        } else {
          setHolding([]);

          setAllPage(1);
          setHoldingCurrent(0);
          setHoldingPurchanse(0);
          setTotalTodayChange(0);
          setTotalGainOrLoss(0);
          setTodayChangePer(0);
          setTotalChangePer(0);
        }
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
    // getAllHolding(selected+1)
  };
  const columns = [
    "Symbol",
    "Description",
    "Current Price",
    "Today's Change",
    "Purchase Price",
    "QTY",
    "Total Value",
    "Total Gain/Loss",
    "Trade Actions",
  ];

  const handledMoreBuy = (stock) => {
    orderService
      .StockDetail(stock.symbol)
      .then((res) => {
        let data = { action: "Buy", quantity: stock.quantity, ...res };

        localStorage.setItem("stock", JSON.stringify(data));
        router.push({
          pathname: "/dashboard/trade-stocks/",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSell = (stock) => {
    orderService
      .StockDetail(stock.symbol)
      .then((res) => {
        let data = { action: "Sell", quantity: stock.quantity, ...res };
        localStorage.setItem("stock", JSON.stringify(data));
        router.push("/dashboard/trade-stocks/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card-no-gap">
      <div className="trade-order-status">
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader color="#8000ff" />
          </div>
        ) : (
          <div className="order--table--responsive">
            {holding.length > 0 && (
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
                      <h1>₦{calculatedTotalValue}</h1>
                    </td>

                    <NewTodaysChange
                      change={totalTodayChange}
                      changePer={todayChangePer}
                      calculatedTodaysChangeNaira={calculatedTodaysChangeNaira}
                      calculatedTodaysChangePercentage={
                        calculatedTodaysChangePercentage
                      }
                    />

                    <NewTodaysChange
                      change={totalGainOrLoss}
                      changePer={totalChangePer}
                      calculatedTodaysChangeNaira={
                        calculatedTotalGainOrLossNaira
                      }
                      calculatedTodaysChangePercentage={
                        calculatedTotalGainOrLossPercentage
                      }
                    />
                  </tr>
                </tbody>
              </table>
            )}
            {holding.length > 0 && <hr style={{ marginTop: "50px" }} />}
            {holding.length > 0 ? (
              <div>
                <table className="order-table">
                  <thead>
                    <tr>
                      {columns.map((item, index) => {
                        return <th key={index}>{item}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {holding.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.symbol}</td>
                          <td>{item.description}</td>
                          <td>₦{item.currentPrice.toFixed(2)}</td>
                          {IncreaseDecrease(
                            item.todayChange,
                            item.todayChangePercentage
                          )}
                          <td>₦{item.purchasePrice.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>₦{item.totalValue.toFixed(2)}</td>
                          {IncreaseDecrease(
                            item.totalGainOrLoss,
                            item.totalGainOrLossPercentage
                          )}
                          <td>
                            <div>
                              <div>
                                <button
                                  type="button"
                                  className="btn-cancel border-purple "
                                  onClick={() => handledMoreBuy(item)}
                                >
                                  + Buy More
                                </button>
                                <button
                                  type="button"
                                  className="btn-cancel border-purple"
                                  onClick={() => handleSell(item)}
                                >
                                  - Sell
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    color: "#8000ff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Trade History Not Found
                </h1>
              </div>
            )}
          </div>
        )}
        {allPage > 1 && (
          <div className="paginationReact">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              marginPagesDisplayed={2}
              // pageRangeDisplayed={2}
              pageCount={allPage}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
        <div className="btn--group form--actions noPadding">
          <Link href="/dashboard/trade-history">
            <a className="btn form--submit">TradeHistory</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HoldingTables;

const NewTodaysChange = ({
  change,
  changePer,
  calculatedTodaysChangeNaira,
  calculatedTodaysChangePercentage,
}) => {
  return (
    <>
      {change < 0 ? (
        <td className="text-red">
          <div className="flexBox">
            ₦{calculatedTodaysChangeNaira} ({calculatedTodaysChangePercentage}%)
            <svg
              className="ml-12"
              width="16"
              height="17"
              viewBox="0 0 27 29"
              fill="none"
            >
              <path
                d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z"
                fill="#F45531"
              ></path>
            </svg>
          </div>
        </td>
      ) : change == 0 ? (
        <td>
          <div className="flexBox ">
            {" "}
            ₦{calculatedTodaysChangeNaira} ({calculatedTodaysChangePercentage}
            %)-
          </div>
        </td>
      ) : (
        <td>
          <div className="flexBox text-light-green">
            ₦{calculatedTodaysChangeNaira} ({calculatedTodaysChangePercentage}%)
            <svg
              className="ml-12"
              width="16"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z"
                fill="#008000"
              />
            </svg>
          </div>
        </td>
      )}
    </>
  );
};

const TodaysChange = ({ change, changePer }) => {
  return (
    <>
      {change < 0 ? (
        <td className="text-red">
          <div className="flexBox">
            ₦{change?.toFixed(2) * -1} ({changePer?.toFixed(2) * -1}%)
            <svg
              className="ml-12"
              width="16"
              height="17"
              viewBox="0 0 27 29"
              fill="none"
            >
              <path
                d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z"
                fill="#F45531"
              ></path>
            </svg>
          </div>
        </td>
      ) : change == 0 ? (
        <td>
          <div className="flexBox ">
            ₦{change?.toFixed(2)} ({changePer?.toFixed(2)}%) -
          </div>
        </td>
      ) : (
        <td>
          <div className="flexBox text-light-green">
            ₦{change?.toFixed(2)} ({changePer?.toFixed(2)}%)
            <svg
              className="ml-12"
              width="16"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z"
                fill="#008000"
              />
            </svg>
          </div>
        </td>
      )}
    </>
  );
};
