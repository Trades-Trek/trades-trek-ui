import { Loader } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import SelectGame from "../SelectGame/SelectGame";

import Sidebar from "../Sidebar/Sidebar";
import FormSpinner from "../../components/Spinners/FormSpinner";
import tradeHistoryHeaders from "../../helpers/tradehistorydownloadHeaders";
import ExportExcel from "../../helpers/ExportExcel";
import { DataConvert } from "../../helpers/DateTimeConverter";
import { orderService } from "../../services/order.service";


export default function HistoryUser({ userName }) {
  const [tradeHistoryData, setTradeHistoryData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [xlsxDownloading, setXlsxDownloading] = useState(false);
  let { user } = useSelector((state) => state.userWrapper);

  useEffect(() => {
    setIsLoading(true);
    orderService
      .tradeHistoryAnotheUser(currentPage, userName)
      .then((res) => {
        if (res.success) {
          setTradeHistoryData(res.orders.docs);
          setCurrentPage(res.orders.page);
          setAllPage(res.orders.pages);
        } else {
          setTradeHistoryData([]);
          setCurrentPage(1);
          setAllPage(1);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [user, userName]);

  const handlePageClick = ({ selected }) => {
    setIsLoading(true);
    orderService
      .tradeHistoryAnotheUser(selected + 1, userName)
      .then((res) => {
        if (res.success) {
          setCurrentPage(res.orders.page);
          setAllPage(res.orders.pages);
          setTradeHistoryData(res.orders.docs);
          setIsLoading(false);
        } else {
          setTradeHistoryData([]);
          setCurrentPage(1);
          setAllPage(1);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const downloadTradeHistoryAnotherUserAll = async (str) => {
    try {
      const { success, orders } = await orderService.tradeHistoryAnotherUserAll(userName);
      if (success) {

        if(!orders.length){
          alert("No record available for download");
          return
        }

        const transformedOrders = orders.map(item => ({
          ...item,
          total_cash_value: item.rate * item.quantity
        }));

        ExportExcel(tradeHistoryHeaders, transformedOrders, `Trade_History_${userName}_`);
      }
      setXlsxDownloading(false);
    } catch (err) {
      setXlsxDownloading(false);
      alert("Download failed try again");
    }
  };

  const columns = [
    "Date",
    "Symbol",
    "Trade Type",
    "QTY",
    "Price",
    "Price At Execution",
    "Account value after sell",
    "Total Cash Value",
  ];
  return (
    <>
      <div className="">
        <div className="p-20">
          <Link
            href={`competition-summary?username=${userName}`}
            style={{ fontSize: "12px", fontWeight: "bold" }}
          >
            Go Back
          </Link>
          {/* <h1 style={{fontSize: "15px"}}>{infoData?.user?.username}</h1> */}
        </div>

        <div className="page--title--block">
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
                  {tradeHistoryData?.length > 0 ? (
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
                          {tradeHistoryData.map((item, index) => (
                            <tr key={index}>
                              <td>{DataConvert(item.updatedAt)}</td>
                              <td>{item.symbol}</td>
                              <td>
                                {item.action == "Short" ? "Short " : ""}{" "}
                                {item.action == "Buy To Cover" ? "Cover " : ""}
                                Stock:{" "}
                                {item.action == "Buy To Cover"
                                  ? "Cover"
                                  : item.action}{" "}
                                at{" "}
                                {item.orderType == "Limit"
                                  ? item.orderType
                                  : `${item.orderType} Open`}
                              </td>
                              <td>{item.quantity}</td>
                              <td>₦{item.rate.toFixed(2)}</td>
                              <td>{item.rateAtStockExecution === 0 ? "not available" : item.rateAtStockExecution.toFixed(2)}</td>
                              <td>{item.accountValueAfterSell === 0 ? "not available" : item.accountValueAfterSell}</td>
                              <td>₦{(item.rate * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "80vh",
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
              {tradeHistoryData?.length > 0 && (
                <div className="paginationReact">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={2}
                    pageCount={allPage}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                  />
                </div>
              )}

              {xlsxDownloading ? (
                <Link href="javascript:void(0)">
                  <a className="btn spinnerBtn downloadButtonStyle">
                    <FormSpinner />
                  </a>
                </Link>
              ) : (
                <Link href="javascript:void(0)">
                  <a
                    className="btn downloadButtonStyle"
                    style={{width: '100px', margin: '10px'}}
                    onClick={() => {
                      setXlsxDownloading(true);
                      downloadTradeHistoryAnotherUserAll("xlsx");
                    }}
                  >
                    Download
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
