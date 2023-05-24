import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { stockService } from "../../services/stock.service";

import WatchListCard from "./WatchListCard";

export default function WatchListData() {
  const [watchListData, setWatchListData] = useState([]);
  const [showWatchList, setShowWatchList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    stockService
      .AllWathchList()
      .then((res) => {
        if (res.success) {
          setWatchListData(res.data);
          setIsLoading(false);
        } else {
          setWatchListData([]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setWatchListData([]);
        setIsLoading(false);
      });
  }, []);
  const removeItem = (sym) => {
    let arr = watchListData.filter((item) => item.stockSymbol != sym);
    setWatchListData(arr);
    stockService
      .removeItem(sym)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card--wrapper">
        <div className="wrapper--hgroup">
          <div className="wrapper--title">
            <h3>Watchlist</h3>
          </div>
          <div className="readmore--link">
            {!showWatchList ? (
              <span onClick={() => setShowWatchList(!showWatchList)}>
                See All
              </span>
            ) : (
              <span onClick={() => setShowWatchList(!showWatchList)}>
                See Less
              </span>
            )}
          </div>
        </div>

        {!isLoading ? (
          watchListData.length > 0 ? (
            !showWatchList ? (
              <div className="wrapper--text card--grid card--grid--4">
                {watchListData.map((data, index) => {
                  if (index <= 3) {
                    return (
                      <WatchListCard
                        key={index}
                        listData={data}
                        removeItem={removeItem}
                      />
                    );
                  }
                })}
              </div>
            ) : (
              <div className="wrapper--text card--grid card--grid--4">
                {watchListData.map((data, index) => {
                  return (
                    <WatchListCard
                      key={index}
                      listData={data}
                      removeItem={removeItem}
                    />
                  );
                })}
              </div>
            )
          ) : (
            <div className=" watchloader watchMessage">
              <div className="background-masker">There are no items on watchlist</div>
            </div>
          )
        ) : (
          <div className="animated-background watchloader">
            <div className="background-masker"></div>
          </div>
        )}
      </div>
    </>
  );
}
