import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStock } from "../../actions/setStock";
import { orderService } from "../../services/order.service";
import IncreaseDecrease from "../Table/IncreaseDecrease";

const AnotherShortTable = ({userName}) => {
  const [short, setShort] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [shortCurrent, setShortCurrent] = useState(0);
  const [shortPurchase, setShortPurchanse] = useState(0);
  const [totalTodayChange, setTotalTodayChange] = useState(0);
  const [totalGainOrLoss, setTotalGainOrLoss] = useState(0);
  const [todayChangePer, setTodayChangePer] = useState(0);
  const [totalChangePer, setTotalChangePer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let { user } = useSelector((state) => state.userWrapper);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllShorts(1,userName)
  }, [userName]);
  const getAllShorts=(page,name)=>{
    setIsLoading(true);
    orderService
      .shortProfitOrLossAnotherUser(page,name)
      .then((res) => {
        if (res.success) {
          setShort(res.short.docs);
          setCurrentPage(res.short.page);
          setAllPage(res.short.pages);
          setShortCurrent(res.shortCurrent);
          setShortPurchanse(res.shortPurchase);
          setTotalTodayChange(res.totalTodayChange);
          setTotalGainOrLoss(res.totalGainOrLoss);
          setTodayChangePer(
            (res.totalTodayChange * 100) /
              (res.shortCurrent - res.totalTodayChange)
          );
          setTotalChangePer(
            (res.totalGainOrLoss * 100) /
              (res.shortCurrent - res.totalGainOrLoss)
          );
        }else{
          setShort([]) 
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }
 
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
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
    getAllShorts(selected+1,userName)
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
            {short.length > 0 && (
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
                      <h1>₦{shortCurrent.toFixed(2)}</h1>
                    </td>
                    {IncreaseDecrease(totalTodayChange, todayChangePer)}
                    {IncreaseDecrease(totalGainOrLoss, totalChangePer)}
                  </tr>
                </tbody>
              </table>
            )}
            {short.length > 0 && <hr style={{ marginTop: "50px" }} />}
            {short.length > 0 ? (
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
                    {short.map((item, index) => (
                      <tr key={index}>
                        <td>{item.symbol}</td>
                        <td>{item.description}</td>
                        <td>₦{item.currentPrice.toFixed(2)}</td>
                        {IncreaseDecrease(
                          item.todayChange,
                          item.todayChangePercentage
                        )}
                        <td>₦{item.shortPrice.toFixed(2)}</td>
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
          className="btn--group form--actions noPadding"
        >
          <Link href={`competition-summary?username=${userName}&history=${userName}`}>
            <a className="btn form--submit">TradeHistory</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnotherShortTable;
