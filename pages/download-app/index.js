import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const thankyou = () => {

  return (
   
     
      
        <div className="flex flex-col items-center justify-center gap-y-7 md:flex-row bg-palette-one gap-x-14">
        <div className="md:w-[579px] px-3 md:px-0">
        <br />

          <h2 className="font-bold text-[32px] text-center md:text-left mb-2 pt-12 md:pt-0">
          Download the Trades Trek Stock Trading Simulator App Today
          </h2>
          <p className=" mb-8 text-lg font-light text-center md:text-left leading-[25px]">

          Download the Trades Trek Stock Trading Simulator App Today and Start Learning How to Trade Stocks Risk-Free! Win weekly and monthly cash prizes in our Trades Trek simulation trades competitions.

          </p>
          <div className="flex flex-col items-center md:flex-row gap-y-4 gap-x-3">
            {/* <a 
                          href={data?.ios_download_url??''}
             target="_blank" rel="noreferrer">
                 <img src={Appstore.src} alt="appstore" />
            </a>
            <a
              href={data?.android_download_url??''}
              target="_blank"
              rel="noreferrer"
            >
                <img src={Playstore.src} alt="playstore" />
            </a> */}
            <a
              href="https://blog.tradestrek.com"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium text-black"
            >
              <button className="text-white border-0 rounded-[px] bg-palette-two" type="button" >
                See Blog
              </button>
            </a>
          </div>
          <br /><br />

        </div>
      
      </div>

  );
};

export default thankyou;
