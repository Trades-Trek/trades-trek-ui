import Link from "next/link";
import React, { useEffect, useState } from "react";

import TradeFailedOrders from "../Table/TradeFailedOrders";
import TradePendingOrders from "../Table/TradePendingOrders";
export default function TradeOrderStatus({setShowTrade}) {
  const [modelOpened, setModelOpened] = useState(false);
  useEffect(() => {
    setShowTrade(true)
  }, [setShowTrade])
 
  return (
    <div className="trade-order-status">
      <div className="table-row-gap">
        <h4
          className="font-18 "
          style={{ marginTop: "20px", fontSize: "30px", marginBottom: "20px" }}
        >
          Open Trades
        </h4>
        <p className="font-16 font-gray">
          Note: Open trades is a list of all your pendings transactions.
        </p>
      </div>
      <TradePendingOrders modelOpened={modelOpened} setModelOpened={setModelOpened}/>

      <div className="bg-purple-block mt-31 mb-31">
        <ul>
          <li>All order times are in West Africa Time.</li>
          <li>
            Market-Open orders can only be cancelled when the markets are
            closed.
          </li>
          <li>
            Limit/Stop orders can be cancelled when the markets are closed, or
            after 20 minutes (depending on competition) of their entry if
            markets are open.
          </li>
          <li>Market orders can’t be cancelled at all.</li>
        </ul>
      </div>
      <div className="table-row-gap">
        <h4
          className="font-18 "
          style={{ marginTop: "20px", fontSize: "30px", marginBottom: "20px" }}
        >
          Failed Trades
        </h4>
        <p className="font-16 font-gray">
          Note: &lsquo;Volume At Fail&lsquo; is the volume recorded at the time
          the trade is executed. It will not be the same as the last volume
          recorded for a day, which is what is displayed in historical pricing
          details.
        </p>
      </div>
      <TradeFailedOrders modelOpened={modelOpened} setModelOpened={setModelOpened} />
      <div className="table-row-gap show-data mt-26 pb-26">
        <p className="font-16">
          Showing the most recent failed trades from the last 30 days
        </p>
        <div className="btn--group form--actions">
          <Link href="/dashboard/portfolio">
            <a className="btn form--submit">View Holdings</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
