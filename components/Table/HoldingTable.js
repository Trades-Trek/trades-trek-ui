import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedStock } from "../../actions/setStock";
import { DataConvert, TimeConverter } from "../../helpers/DateTimeConverter";
import { orderService } from "../../services/order.service";
import CancelProduct from "../Modal/CancelProduct";
import HoldingInfo from "./HoldingInfo";
import IncreaseDecrease from "./IncreaseDecrease";

export default function HoldingTable({
  rows,
  tableStatus,
  setRefresh,
  refresh,
}) {
  const [modelOpened, setModelOpened] = useState(false);
  const [Id, setId] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const [totalValue, setTotalValue] = useState(0);
  const [todayChange, setTodayChange] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  const [effect, setEffect] = useState(false);

  const columns = [
    "SYMBOL",
    "Current Price",
    "Today's Change",
    "Purchage Price",
    "QTY",
    "Total Value",
    "Total Gain/Loss",
    "Trade Actions",
  ];
  const handledMoreBuy = (stock) => {
    orderService
      .StockDetail(stock.symbol)
      .then((res) => {
        dispatch(setSelectedStock({ ...res, action: "Buy" }));

        router.push("/dashboard/trade-stocks/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let total = 0;
    let totalCh = 0;
    let todayCh = 0;
    rows.map((item) => {
      total += item.totalValue;
      totalCh += item.totalGainOrLoss;
      todayCh += item.todayChange;
    });
    setTotalValue(total);
    setTotalChange(totalCh);
    setTodayChange(todayCh);
  }, [rows]);

  const handleSell = (stock) => {
    orderService
      .StockDetail(stock.symbol)
      .then((res) => {
        dispatch(setSelectedStock({ ...res, action: "Sell" }));

        router.push("/dashboard/trade-stocks/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <HoldingInfo
        setRefresh={setRefresh}
        refresh={refresh}
        effect={effect}
        setEffect={setEffect}
        totalValue={totalValue}
        totalChange={totalChange}
        todayChange={todayChange}
      />
      {!effect ? (
        <div className="trade-order-status">
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
              {rows &&
                rows.map((item,index) => {
                  return (
                    <tr key={index}>
                   

                      <td>{item.symbol}</td>
                    
                      <td>₦{item.currentPrice?.toFixed(2)}</td>
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
                        {item.status === 2 ? (
                          <div
                            style={{
                              color: "red",
                              padding: "5px 10px",
                              border: "1px solid red",
                              textAlign: "center",
                            }}
                          >
                            Failed
                          </div>
                        ) : (
                          <div>
                            {tableStatus !== "holding" ? (
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
                            ) : (
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
                            )}
                          </div>
                        )}
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
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      )}
    </>
  );
}
