import { Loader } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import SelectGame from "../../components/SelectGame/SelectGame";

import Sidebar from "../../components/Sidebar/Sidebar";
import { DataConvert } from "../../helpers/DateTimeConverter";
import { orderService } from "../../services/order.service";

export default function TradeHistory() {
  const [tradeHistoryData, setTradeHistoryData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let { user } = useSelector((state) => state.userWrapper);

  useEffect(() => {
    setIsLoading(true);
    orderService
      .tradeHistory(currentPage)
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
  }, [user]);

  const handlePageClick = ({ selected }) => {
    setIsLoading(true);
    orderService
      .tradeHistory(selected + 1)
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
  const columns = [
    "Date",
    "Symbol",
    "Trade Type",
    "QTY",
    "Price",
    "Commission",
    "Total Cash Value",
  ];
  return (
    <>
      <Sidebar />
      <div className="site--content">
        <SelectGame />

        <div
          className="trade-data pageBack"
        >
          <Link href="/dashboard/portfolio">
            <a>
              Back to Portfolio
            </a>
          </Link>
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
                              
                              {/* item.createdAt updatedAt */}

                              <td>{DataConvert(item.createdAt)}</td>
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
                              <td>₦{item.commission.toFixed(2)}</td>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
