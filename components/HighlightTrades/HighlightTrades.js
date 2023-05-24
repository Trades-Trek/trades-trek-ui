import { Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { stockService } from "../../services/stock.service";
import { HighlightTradeLists } from "./HighlightTradesLists";
import TradeLists from "./TradeLists";
import Carousel from "react-multi-carousel";

export default function HighlightTrades() {
  const [highLightTrade, setHighLightTrade] = useState([]);
  useEffect(() => {
    stockService
      .getAllStock()
      .then((res) => {
        if (res.success) {
          setHighLightTrade(res.data);
        } else {
          setHighLightTrade([]);
        }
      })
      .catch((err) => setHighLightTrade([]));
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 10000, min: 3000 },
      items: 12
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 12
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4
    }
  };

  // const tradeLength = HighlightTradeLists.length;
  return (
    <>
      {highLightTrade.length > 0 ? <div className="card--style card--with--border slideBlock">
        <Carousel responsive={responsive}
        autoPlay={true}
          autoPlaySpeed={900}
          keyBoardControl={true}
          // customTransition="all .5"
          // transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="topScrollContent">
          {highLightTrade.map((data, index) => {
            return <TradeLists key={index} listData={data} />;
          })}
        </Carousel>
      </div> : <div className="animated-background highLight">
        <div className="background-masker"></div>
      </div>}
    </>
  );
}
