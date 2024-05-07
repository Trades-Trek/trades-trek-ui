import { Modal, Button, Radio, NumberInput } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { stockService } from "../../services/stock.service";

export default function WatchListCard({
  listData,
  removeItem,
  refetchPriceAlert,
}) {
 
  const [isPriceAlertModalOpen, setPriceAlertModalOpen] = useState(false);
  const [isPriceAlertLoading, setIsPriceAlertLoading] = useState(false);
  const [targetPrice, setTargetPrice] = useState(listData.targetPrice);
  const [range, setRange] = useState(listData.range);

  const openPriceAlertModal = () => setPriceAlertModalOpen(true);
  const closePriceAlertModal = () => setPriceAlertModalOpen(false);

  const handleClick = () => setPriceAlertModalOpen(true);

  const resetPriceAlertModal = () => closePriceAlertModal();

  const cancelPriceAlert = async () => {
    setIsPriceAlertLoading(true);

    try {
      const res = await stockService.cancelPriceAlert(listData.stockSymbol);
      setIsPriceAlertLoading(false);

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      if (res.success) {
        resetPriceAlertModal();
        refetchPriceAlert();
      }
    } catch (error) {
      setIsWatchListLoading(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  const handleEditPriceAlertSubmit = async () => {
    setIsPriceAlertLoading(true);

    try {
      const res = await stockService.editPriceAlert(
        {
          Symbol: listData.stockSymbol,
          targetPrice,
          range,
        },
        priceAlertId
      );
      setIsPriceAlertLoading(false);

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      if (res.success) {
        refetchPriceAlert()
        setPriceAlertModalOpen(false);
      }
    } catch (error) {
      setIsPriceAlertLoading(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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

      <Modal
        opened={isPriceAlertModalOpen}
        onClose={resetPriceAlertModal}
        title="Price Alert"
      >
        <Button
          className="mb-4"
          style={{ background: "red", width: "100%" }}
          variant="filled"
          type="submit"
          onClick={() => {
            cancelPriceAlert();
          }}
        >
          {isPriceAlertLoading ? "Loading.." : "Cancel price alert"}
        </Button>

        <>
          <NumericFormat
            value={targetPrice}
            onValueChange={(values) => {
              setTargetPrice(values.floatValue);
            }}
            placeholder="target Price"
            customInput={TextField}
          />

          <Radio.Group
            label="Price Range"
            value={range}
            onChange={setRange}
            className="mt-4"
          >
            <Radio value="above" label="Above" />
            <Radio value="below" label="Below" />
            <Radio value="exact" label="Exact" />
          </Radio.Group>
          {
            <Button
              className="mt-4"
              style={{ background: "blue" }}
              disabled={!targetPrice || isPriceAlertLoading}
              variant="filled"
              type="submit"
              onClick={() => {
                handleEditPriceAlertSubmit();
              }}
            >
             Update Price alert
             
            </Button>
          }
        </>
      </Modal>

      <div
        className="card--style cardSelect"
        onClick={() => handleClick()}
      >
        <div className="card--data">
          <div className="card--row">
            <ul>
              <li>
                <p className="card--title--label">Stock Symbol</p>
                <p className="card--title">{listData?.stockSymbol}</p>
              </li>

              <li>
                <p className="card--title--label">Alert Price</p>
                <p className="card--title">{listData?.targetPrice}</p>
              </li>

              <li>
                <p className="card--title--label">Range</p>
                <p className="card--title">{listData?.range}</p>
              </li>

              <li>
                <div className="card--data">
                  {/* <div
                    className="removeWatch"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(listData?.stockSymbol);
                    }}
                  >
                    <svg
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div> */}
                </div>
                {/* <span className="card--image">
                  <Image
                    src={
                      listData?.result?.PerChange >= 0
                        ? "/images/position-up.svg"
                        : "/images/position-down.svg"
                    }
                    layout="responsive"
                    width={100}
                    height={40}
                    alt=""
                  />
                </span> */}
              </li>
            </ul>
          </div>
          {/* <div className="card--row">
            <ul>
              <li>
                <p className="card--title--label">Volume</p>
                <p className="card--title">
                  {listData?.result?.Volume?.toString().replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                </p>
              </li>

              <li>
                <p className="card--title--label">Change</p>
                <p className="card--title">
                  {listData?.result?.Change?.toFixed(2)
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </li>

              <li>
                <p className="card--title--label">%Change</p>
                <p className="card--title">
                  {listData?.result?.PerChange?.toFixed(2)
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  %
                </p>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}
