import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { DataConvert } from "../../helpers/DateTimeConverter";
import { orderService } from "../../services/order.service";
import IncreaseDecrease from "../Table/IncreaseDecrease";

const HoldingTables = ({userName}) => {
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
  let { user } = useSelector((state) => state.userWrapper);

  const router = useRouter();

  useEffect(() => {
    getAllHolding(1,userName);
  }, [userName]);

  const getAllHolding = (page,name) => {
    setIsLoading(true);

    orderService
      .holdingProfitOrLossAnotherUser(page,name)
      .then((res) => {
        if (res.success) {
          setHolding(res.holding.docs);

          setAllPage(res.holding.pages);
          setHoldingCurrent(res.holdingCurrent);
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
    getAllHolding(selected+1,userName)
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
  ];

  
  
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
                    <h1>₦{holdingCurrent.toFixed(2)}</h1>
                  </td>
                  {IncreaseDecrease(totalTodayChange, todayChangePer)}
                  {IncreaseDecrease(totalGainOrLoss, totalChangePer)}
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
                    {columns.map((item ,index) => {
                      return <th key={index}>{item}</th>;
                    })}
                  </tr>
                  </thead>
                 <tbody>
                 {holding.map((item,index) => (
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
                     
                    </tr>
                  ))}
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
        <div
          className="btn--group form--actions nopadding"
        >
          <Link href={`competition-summary?username=${userName}&history=${userName}`}>
            <a className="btn form--submit">TradeHistory</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HoldingTables;
