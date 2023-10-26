import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";

import { stockService } from "../../services/stock.service";
import { orderService } from "../../services/order.service";
import Select, { AriaOnFocus } from "react-select";
import PreviewModal from "../Modal/PreviewModal";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedStock } from "../../actions/setStock";
import { StockChangePercent } from "../../helpers/StockChangePercent";
import FormSpinner from "../Spinners/FormSpinner";
import { useRouter } from "next/router";
import { DataConvert, TimeConverter } from "../../helpers/DateTimeConverter";
import LineChartStock from "../Chart/LineChartStock";
import { toast, ToastContainer } from "react-toastify";
import ToolTipCustome from "../Competition/ToolTip";

export default function Stocks({ setShowTrade, setStockName, setStockAction }) {
  const [showMax, setShowMax] = useState(false);
  const [watchListData, setWatchListData] = useState([]);
  const [isWatchListLoading, setIsWatchListLoading] = useState(true);
  const [stockAllData, setStockAllData] = useState([]);
  const [filterStock, setFilterStock] = useState([
    { Symbol: "Search For Symbol", value: "demo" },
  ]);
  const [opened, { open, close }] = useDisclosure(false);
  const [ariaFocusMessage, setAriaFocusMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stockData, setStockData] = useState();
  const [modelOpened, setModelOpened] = useState(false);
  const [action, setAction] = useState("Buy");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("Day Only");
  const [orderType, setOrderType] = useState("Market");
  const [rate, setRate] = useState("");
  const [quantityError, setQuantityError] = useState(null);
  const [rateError, setRateError] = useState(null);
  const [currentGame, setCurrentGame] = useState();
  const [allowShortSelling, setAllowShortSelling] = useState(true);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [graph, setGraph] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  let { user } = useSelector((state) => state.userWrapper);

  const data = router.state;
  useEffect(() => {
    setShowTrade(true);
  }, []);
  useEffect(() => {
    stockService
      .AllWathchList()
      .then((res) => {
        if (res.success) {
          setWatchListData(
            res?.data.length ? res?.data.map((e) => e.stockSymbol) : []
          );
          isWatchListLoading, setIsWatchListLoading(false);
        } else {
          setWatchListData([]);
          setIsWatchListLoading(false);
        }
      })
      .catch((err) => {
        setWatchListData([]);
        setIsWatchListLoading(false);
      });
  }, []);
  useEffect(() => {
    if (user) {
      setToken(user?.token?.token);
      const game = user?.mygame?.filter(
        (item) => item?.gameId._id == localStorage.getItem("GameId")
      );

      if (game) {
        setCurrentGame(game);
        setAllowShortSelling(game[0]?.gameId?.allowShortSelling);
      }
    }
  }, [user]);
  useEffect(() => {
    let data = localStorage.getItem("stock");

    data = JSON.parse(data);

    if (data) {
      localStorage.removeItem("stock");

      setAction(data.action || "Buy");
      setStockData(data);
      const date = new Date();
      setGraph(
        `https://test.infowarelimited.com/IWGraphEngAsAService/charts3/${
          user?.token?.token
        }?Theme=light&GT=3&P=8145%7C${data?.Symbol}%7C${date.getFullYear() -
          1}-${date.getMonth() +
          1}-${date.getDate()}%7C${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()}`
      );
      setQuantity(data.quantity);
    }
  }, []);

  const inputChange = (inputValue) => {
    setSearch(inputValue);
    if (inputValue) {
      let searchData = stockAllData.filter(
        (item) =>
          item.Symbol?.toLowerCase()?.includes(
            inputValue.trim()?.toLowerCase()
          ) ||
          item.Name?.toLowerCase()?.includes(inputValue.trim()?.toLowerCase())
      );
      setFilterStock(searchData);
    } else {
      setFilterStock([{ Symbol: "Search For Symbol", value: "demo" }]);
    }
  };
  // set selected stock
  const onchange = (selectedOptions) => {
    if (selectedOptions?.value !== "demo") {
      const date = new Date();
      setGraph(
        `https://test.infowarelimited.com/IWGraphEngAsAService/charts3/${token}?Theme=light&GT=3&P=8145%7C${
          selectedOptions?.Symbol
        }%7C${date.getFullYear() - 1}-${date.getMonth() +
          1}-${date.getDate()}%7C${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()}`
      );
      setSearch(selectedOptions?.Symbol);
      setStockData(selectedOptions);
      setShowMax(false);
      setQuantity("");
    }
  };

  useEffect(() => {
    stockService
      .getAllStock()
      .then((res) => {
        setStockAllData(res.data);
      })
      .catch((err) => {
        setStockAllData([]);
      });
  }, []);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const checkLimitPrice = () => {
    if (quantity <= 0) {
      setQuantityError("Quantity must be greater than 0");
    } else if (orderType === "Limit" && rate <= 0) {
      setModelOpened(false);
      setRateError("Price must be greater than 0");
    } else if (
      orderType == "Limit" &&
      action == "Sell" &&
      rate <= stockData.Last
    ) {
      setRateError(`Price must be greater than ${stockData.Last}`);
    } else if (
      orderType == "Limit" &&
      action == "Buy" &&
      rate >= stockData.Last
    ) {
      setRateError(`Price must be less than ${stockData.Last}`);
    } else {
      setRateError(null);
      setQuantityError(null);
      setModelOpened(true);
      setStockName(stockData?.Symbol), setStockAction(stockData.action);
    }
  };

  const handlerShowMax = () => {
    if (showMax) {
      setQuantity(1);
      setShowMax(false);
    } else {
      orderService
        .showMax(stockData?.Last, action, stockData?.Symbol)
        .then((res) => {
          setQuantity(res?.showMax);
          setShowMax(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "blue",
      primary: "pink",
    },
  });
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = "white";
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : blue,
        color: "#FFF",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };
  const handleAddRemoveFromWatchList = () => {
    setIsWatchListLoading(true);
    if (watchListData.includes(stockData.Symbol)) {
      stockService
        .removeItem(stockData.Symbol)
        .then((res) => {
          if (res.success) {
            const updatedWatchlistData = watchListData.filter(
              (stock) => stockData.Symbol !== stock
            );

            // Update the state with the new array
            setWatchListData(updatedWatchlistData);
            setIsWatchListLoading(false);
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            setIsWatchListLoading(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          setIsWatchListLoading(false);
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      stockService
        .addToWatchListStock(stockData)
        .then((res) => {
          if (res.success) {
            setWatchListData([stockData.Symbol, ...watchListData]);
            setIsWatchListLoading(false);
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            setIsWatchListLoading(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          setIsWatchListLoading(false);
        });
    }
  };


  const handleQuantityChange = (event) => {
    const quantityWithoutLeadingZeros = event.target.value.replace(/^0+/g, '');
    const quantityWithoutDecimals = quantityWithoutLeadingZeros.replace(/\.|\,/, '');
    setQuantity(quantityWithoutDecimals);
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
      <div className="stocks-form market--data">
        <form className="site--form">
          <div className="stocks--form--group">
            <div
              className="readmore--link"
              onClick={handlerShowMax}
              style={{ display: stockData ? "block" : "none" }}
            >
              <svg
                width="23"
                height="12"
                viewBox="0 0 23 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6772 0.0410156C5.63315 0.0410156 0.910151 5.63707 0.910151 5.63707C0.761395 5.80708 0.761395 6.06209 0.910151 6.23209C0.910151 6.23209 5.63315 11.8281 11.6772 11.8281C17.7213 11.8281 22.4443 6.23209 22.4443 6.23209C22.5931 6.06209 22.5931 5.80708 22.4443 5.63707C22.4443 5.63707 17.7213 0.0410156 11.6772 0.0410156ZM11.6772 0.947718C12.8691 0.947718 14.0077 1.19387 15.0632 1.57108C15.7716 2.37152 16.2108 3.41813 16.2108 4.57453C16.2108 7.0839 14.1866 9.10804 11.6772 9.10804C9.16787 9.10804 7.14373 7.0839 7.14373 4.57453C7.14373 3.41813 7.56875 2.37152 8.27711 1.57108C9.33611 1.1921 10.4819 0.947718 11.6772 0.947718ZM6.77538 2.23694C6.43537 2.9453 6.23703 3.73866 6.23703 4.57453C6.23703 7.57444 8.67733 10.0147 11.6772 10.0147C14.6772 10.0147 17.1175 7.57444 17.1175 4.57453C17.1175 3.7422 16.928 2.9453 16.5933 2.23694C19.154 3.53855 20.9957 5.42633 21.4668 5.93458C20.7301 6.73149 16.6517 10.9214 11.6772 10.9214C6.70277 10.9214 2.62438 6.73149 1.88769 5.93458C2.35875 5.42456 4.20934 3.53855 6.77538 2.23694ZM11.6772 2.30777C10.4252 2.30777 9.41049 3.3225 9.41049 4.57453C9.41049 5.82656 10.4252 6.84128 11.6772 6.84128C12.9293 6.84128 13.944 5.82656 13.944 4.57453C13.944 3.3225 12.9293 2.30777 11.6772 2.30777Z"
                  fill="black"
                />
              </svg>
              {showMax ? "Hide Max" : "Show Max"}
            </div>
            <div className="form--item">
              <label className="form--label" htmlFor="email">
                Symbol
              </label>
              <Select
                aria-labelledby="aria-label"
                isDisabled={
                  stockAllData && stockAllData.length > 0 ? false : true
                }
                placeholder="Search for Symbol"
                onInputChange={inputChange}
                onChange={onchange}
                inputId="aria-example-input"
                name="aria-live-color"
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                options={filterStock}
                isClearable={stockData ? false : true}
                getOptionLabel={(option) =>
                  `${option?.Symbol} ${option.Name ? "-" : ""} ${option.Name ||
                    ""}`
                }
              />
              {/* <input
                className="form--control"
                type="email"
                id="email"
                placeholder="Look up Symbol/Company Name"
              /> */}
            </div>
            <div className="form--item">
              <label className="form--label" htmlFor="email">
                <span className="itemAlign">
                  Action{" "}
                  <ToolTipCustome
                    text={`Buy/Sell allow you add/remove stocks from your portfolio. Sell Short/Buy to Cover relate to shorting stocks.`}
                  />
                </span>
              </label>
              <select
                className="form--control"
                disabled={stockData ? false : true}
                onChange={(e) => {
                  setAction(e.target.value);
                  setShowMax(false);
                  setQuantity(1);
                }}
                defaultValue={action}
              >
                <option selected={action == "Buy" ? true : false}>Buy</option>
                <option selected={action == "Sell" ? true : false}>Sell</option>
                <option
                  disabled={!allowShortSelling}
                  selected={action == "Short" ? true : false}
                >
                  Short
                </option>
                <option
                  disabled={!allowShortSelling}
                  selected={action == "Buy To Cover" ? true : false}
                >
                  Buy To Cover
                </option>
              </select>
            </div>
            <div className="form--item">
              <label className="form--label" htmlFor="email">
                Quantity
              </label>
              <input
                className="form--control"
                type="number"
                min={1}
                value={quantity}
                disabled={stockData ? false : true}
                onChange={handleQuantityChange}
              />
              {quantityError && (
                <div
                  className=""
                  style={{ border: "1px solid red", margin: "20px" }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "red",
                    }}
                  >
                    {quantityError}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/*ShowMax Data Block*/}
          {stockData && (
            <div className="showMax">
              <div className="grid--2">
                <div className="gridColLeft showMaxData">
                  <div className="logoArea">
                    {/* <div className="trade-stock-icon">
                      <Image
                        src="/images/Apple_logo_black.png"
                        layout="responsive"
                        width={32}
                        height={40}
                        alt="Logo"
                      />
                    </div> */}
                    <div className="brandName">
                      <h4>
                        {stockData?.Name}
                        <span>{stockData?.Symbol}</span>
                      </h4>
                    </div>
                  </div>
                  <div className="titleRow">
                    <h3 className="font-30">
                      {stockData?.Last?.toFixed(2)
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      <sub>{stockData?.Currency}</sub>
                      <span>
                        <sub>
                          {stockData?.Change >= 0
                            ? `+ ${stockData?.Change?.toFixed(2)
                                ?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                            : `- ${stockData?.Change?.toFixed(2)
                                ?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                          (
                          {StockChangePercent(
                            stockData?.Change,
                            stockData?.Last,
                            stockData?.Open
                          ) + "%"}
                          ){" "}
                        </sub>
                      </span>
                      <span className="font-12">
                        At Close {DataConvert(stockData?.PrevCloseDate)}{" "}
                        {TimeConverter(stockData?.PrevCloseDate)}
                      </span>
                    </h3>
                    {/* <h3 className="font-16">
                      No trade
                      <span className="font-12 selected">+Pre Market</span>
                    </h3> */}
                    {/* <h3 className="font-16">
                      August 2<span className="font-12">Upcoming Earning</span>
                    </h3> */}
                    <h3 className="font-16">
                      {Number(stockData?.EPS)
                        ?.toFixed(2)
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      <span className="font-12">Eps</span>
                    </h3>
                    <h3 className="font-16">
                      {Number(stockData?.MktCap)
                        ?.toFixed(2)
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      <span className="font-12">Market Cap</span>
                    </h3>
                    {/* <h3 className="font-16">
                      2.1465
                      <span className="font-12">Div Yield</span>
                    </h3> */}
                    <h3 className="font-16">
                      {Number(stockData?.PE)
                        ?.toFixed(2)
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                      <span className="font-12">P/E</span>
                    </h3>
                  </div>
                  <div className="innerRow grid--2">
                    <div className="volumeDataLeft">
                      <div className="currentData">
                        <p className="font-16">Volume(current)</p>
                        <p className="font-14">
                          {stockData?.Volume?.toString().replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </p>
                      </div>
                      <div className="currentData">
                        <p className="font-16">Day&apos;s High(₦)</p>
                        <p className="font-14">
                          {Number(stockData?.High)
                            ?.toFixed(2)
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                        </p>
                      </div>
                      <div className="currentData">
                        <p className="font-16">Day&apos;s LOW(₦)</p>
                        <p className="font-14">
                          {Number(stockData?.Low)
                            ?.toFixed(2)
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                        </p>
                      </div>
                    </div>
                    <div className="volumeDataRight">
                      <div className="currentData">
                        <p className="font-16">52 Week High(₦)</p>
                        <p className="font-14">
                          {Number(stockData?.High52Week)
                            ?.toFixed(2)
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                        </p>
                      </div>
                      <div className="currentData">
                        <p className="font-16">Bid/Ask price(₦)</p>
                        <p className="font-14">
                          {(
                            (Number(stockData?.Bid) || 0) /
                            (Number(stockData?.Ask) || 1)
                          )
                            .toFixed(2)
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                        </p>
                      </div>
                      <div className="currentData">
                        <p className="font-16">52 Week Low(₦)</p>
                        <p className="font-14">
                          {Number(stockData?.Low52Week)
                            ?.toFixed(2)
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridColRight">
                  {/* <LineChartStock /> */}
                  <iframe className="graphBox" src={graph}></iframe>
                </div>
              </div>
              {/* <div className='bar--image-data'>
                                <img src="/images/graph.png" alt="Graph Image" />
                            </div> */}
            </div>
          )}
          <div className="stocks--form--group">
            <div className="form--item">
              <label className="form--label" htmlFor="email">
                <span className="itemAlign">
                  Duration{" "}
                  <ToolTipCustome
                    text={`How long the trade is open for. Most applicable to limit orders and those placed after market hours.`}
                  />
                </span>
              </label>
              <select
                className="form--control"
                disabled={stockData ? false : true}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option>Day Only</option>
                <option>Good Until Cancelled</option>
              </select>
            </div>
            <div className="form--item">
              <label className="form--label" htmlFor="email">
                <span className="itemAlign">
                  Order Type{" "}
                  <ToolTipCustome
                    text={`To trade at the current market price, choose Market Order.`}
                  />
                </span>
              </label>
              <select
                className="form--control"
                disabled={stockData ? false : true}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option>Market</option>
                <option>Limit</option>
              </select>
            </div>
            {orderType == "Limit" && (
              <div className="form--item">
                <label className="form--label" htmlFor="email">
                  Price
                </label>
                <input
                  className="form--control"
                  type="number"
                  min={0}
                  value={rate}
                  disabled={stockData ? false : true}
                  onChange={(e) => setRate(e.target.value)}
                />
                {rateError && (
                  <div
                    className=""
                    style={{ border: "1px solid red", margin: "20px" }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        color: "red",
                      }}
                    >
                      {rateError}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* <div className='dummy-block'>
                        <img src="/images/graph.png" alt="Graph Image" />
                    </div> */}
          <div className="btn--group form--actions">
            <button
              type="reset"
              className="btn reset--btn"
              onClick={() => {
                // setStockData();
                setQuantity("");
                setRate("");
                setOrderType("Market");
                // setShowMax(false);
              }}
            >
              Clear
            </button>
            {/* <Link href="/dashboard/confirm-dialog-box"> */}
            {stockData && (
              <a
                className="btn form--submit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  checkLimitPrice();
                }}
              >
                Preview Order
              </a>
            )}
            {stockData && (
              <a
                className="btn form--submit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (isWatchListLoading) return;

                  if (user?.user?.subscriptionDuration === "free-lifetime") {
                    open();
                    return;
                  }
                  handleAddRemoveFromWatchList();
                }}
              >
                {isWatchListLoading
                  ? "Loading.."
                  : watchListData.includes(stockData.Symbol)
                  ? "Remove from WatchList"
                  : "Add to WatchList"}
              </a>
            )}
            <Modal
              opened={opened}
              onClose={close}
              title="Subscribe to a Plan to Add to Watchlist"
            ></Modal>
            <PreviewModal
              modelOpened={modelOpened}
              setModelOpened={setModelOpened}
              setShowTrade={setShowTrade}
              data={{
                ...stockData,
                duration,
                quantity,
                action,
                orderType,
                rate,
              }}
            />
            {/* </Link> */}
          </div>
        </form>
      </div>
    </>
  );
}
