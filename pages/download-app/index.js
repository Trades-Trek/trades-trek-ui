import React from "react";
import {
  GooglePlayButton,
  AppGalleryButton,
  ButtonsContainer,
} from "react-mobile-app-button";

const DownloadApp = () => {
  const APKUrl = "https://play.google.com/store/apps/details?id=com.tradestrek.tradestrek";
  const IOSUrl = "https://apps.apple.com/ng/app/trades-trek/id6451382635";
  return (
    <div className="flex flex-col items-center justify-center gap-y-7 md:flex-row bg-palette-one gap-x-14 h-screen">
      <div className="md:w-[579px] px-3 md:px-0">
        <br />

        <h2 className="font-bold text-[32px] text-center md:text-left mb-2 pt-12 md:pt-0">
          Download the Trades Trek Stock Trading Simulator App Today
        </h2>
        <p className=" mb-8 text-lg font-light text-center md:text-left leading-[25px]">
          Download the Trades Trek Stock Trading Simulator App Today and Start
          Learning How to Trade Stocks Risk-Free! Win weekly and monthly cash
          prizes in our Trades Trek simulation trades competitions.
        </p>
        <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-3">
          <ButtonsContainer>
            <GooglePlayButton
              url={APKUrl}
              theme={"light"}
              className={"custom-style"}
            />

            <AppGalleryButton
              url={IOSUrl}
              theme={"light"}
              className={"custom-style"}
            />
          </ButtonsContainer>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default DownloadApp;
