import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import { DataConvert, TimeConverter } from "../../helpers/DateTimeConverter";
import { orderService } from "../../services/order.service";

export default function TradeFailedOrders({ modelOpened }) {
  const [failedOrders, setfailedOrders] = useState();
  const [failedAllPage, setfailedAllPage] = useState(1);
  let { user } = useSelector((state) => state.userWrapper);


  const columns = [
    "Failed On",
    "ORDER DATE & TIME",
    "SYMBOL",
    "STATUS",
    "TRANSACTION",
    "QUANTITY",
    "ORDER PRICE",
    "Processed at",
    "Order Id",
  ];

  useEffect(() => {
    orderService
      .getFailedOrders(1)
      .then((res) => {
        if (res.success) {
          setfailedOrders(res.failedOrders.docs);
          setfailedAllPage(res.failedOrders.pages);
        }else{
          setfailedOrders([])
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modelOpened,user]);
  const handlePageClick = ({ selected }) => {
    orderService
      .getFailedOrders(selected + 1)
      .then((res) => {
     
        if (res.success) {
          setfailedOrders(res.failedOrders.docs);
          setfailedAllPage(res.failedOrders.pages);
        }else{
          setfailedOrders([])
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="trade-order-status">
      {failedOrders && (
        <div className="order--table--responsive">
          <table className="order-table">
            <thead>
            <tr>
              {columns.map((item,index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
            </thead>
           <thead>
           {failedOrders?.map((item ,index) => {
              return (
                <tr key={index}>
                  <td>
                    {DataConvert(item.updatedAt)}{" "}
                    <span className="order-time">
                      {TimeConverter(item.updatedAt)}
                    </span>
                  </td>
                  <td>
                    {DataConvert(item.createdAt)}{" "}
                    <span className="order-time">
                      {TimeConverter(item.createdAt)}
                    </span>
                  </td>

                  <td>{item.symbol}</td>
                  <td>failed</td>
                  <td>
                    {item.action}
                    {item.orderType == "Limit" ? (
                      <span className="order-time">at Limit</span>
                    ) : (
                      <span className="order-time">at Market Open</span>
                    )}
                  </td>
                  <td>{item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td>
                    {item.orderType == "Limit" ? (
                      <span className="order-time">Limit - ₦{(item?.rate?.toFixed(2))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    ) : (
                      "n/a"
                    )}
                  </td>
                  <td>
                    {DataConvert(item.createdAt)}{" "}
                    <span className="order-time">
                      {TimeConverter(item.createdAt)}
                    </span>
                  </td>
                  <td>{item?.orderId}</td>
                </tr>
              );
            })}
           </thead>
          </table>
          {failedAllPage > 1 && (
            <div className="paginationReact tablepaginate">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageCount={failedAllPage}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
