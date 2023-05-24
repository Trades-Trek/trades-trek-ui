import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import { DataConvert, TimeConverter } from "../../helpers/DateTimeConverter";
import { orderService } from "../../services/order.service";
import CancelProduct from "../Modal/CancelProduct";
import OrderExpired from "../OrderExpired/OrderExpired";

export default function StockPending({setModelOpened,modelOpened,tableData}) {
  const [pendingOrders, setPendingOrders] = useState();
  const [pendingAllPage, setPendingAllPage] = useState(1);
  const [Id, setId] = useState();
  let { user } = useSelector((state) => state.userWrapper);

  const columns = [
    "Order Date & Time",
    "Symbol",
    "Status",
    "Transaction",
    "Quantity",
    "Order Price",
    "Processed at",
    // "Expire On",
    "Order Id",
    "Action",
  ];

 
useEffect(()=>{
    orderService
    .getPendingOrders(1)
    .then((res) => {
     
      if (res.success) {
        setPendingOrders(res.pendings.docs);
        setPendingAllPage(res.pendings.pages);
      }else{
        setPendingOrders([])
        setPendingAllPage(1)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },[modelOpened,user])

  return (
    <div className="trade-order-status">

      {tableData && (
        <div className="order--table--responsive">
          <table className="order-table">
           <thead>
           <tr>
              {columns.map((item,index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
           </thead>
           <tbody>
           {tableData?.map((item,index) => {
              return (
                <tr key={index}>
                  <td>
                    {DataConvert(item.createdAt)}{" "}
                    <span className="order-time">
                      {TimeConverter(item.createdAt)}
                    </span>
                  </td>

                  <td>{item.symbol}</td>
                  <td>Pending</td>
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
                      <span className="order-time">Limit - ₦{item?.rate?.toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
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
                  {/* <td>
                    <OrderExpired data={item} />
                  </td> */}
                  <td>{item._id}</td>

                  <td>
                    <button
                      onClick={() => {
                        setModelOpened(true);
                        setId(item._id);
                      }}
                      type="button"
                      className="btn-cancel border-purple"
                    >
                      <svg
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.07185 2.76702C-0.341055 5.17992 -0.341055 9.11109 2.07185 11.524C4.48476 13.9369 8.41593 13.9369 10.8288 11.524C13.2417 9.11109 13.2417 5.17992 10.8288 2.76702C8.41593 0.354108 4.48476 0.354108 2.07185 2.76702ZM2.74547 3.44063C4.79525 1.39084 8.10544 1.39084 10.1552 3.44063C12.205 5.49042 12.205 8.8006 10.1552 10.8504C8.10544 12.9002 4.79525 12.9002 2.74547 10.8504C0.695679 8.8006 0.695679 5.49042 2.74547 3.44063ZM3.75589 5.12467L5.77673 7.14551L3.75589 9.16635L4.4295 9.83997L6.45034 7.81912L8.47119 9.83997L9.1448 9.16635L7.12396 7.14551L9.1448 5.12467L8.47119 4.45105L6.45034 6.47189L4.4295 4.45105L3.75589 5.12467Z"
                          fill="#8000FF"
                        />
                      </svg>
                      Cancel
                    </button>
                  </td>
                  {modelOpened && (
                    <CancelProduct
                      modelOpened={modelOpened}
                      setModelOpened={setModelOpened}
                      id={Id}
                    />
                  )}
                </tr>
              );
            })}
           </tbody>
          </table>
        
        </div>
      )}
    </div>
  );
}
