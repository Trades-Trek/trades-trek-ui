import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import { useRouter } from "next/router";


const SuggestCard = ({setShowTrade}) => {
  const [topCompanies, setTopCompanies] = useState()
  const router=useRouter()
  const { topCompany } = useSelector((state) => state.popularCompanyWrapper)
  useEffect(() => {
    setTopCompanies(topCompany)
  }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 10000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const handleClick=(data)=>{
    localStorage.setItem('stock',JSON.stringify(data))
    setShowTrade(true)
  }
  return (
    <div className="explore--comp">
      <h3 className="heading3">Explore Other Popular Companies</h3>
      <div className="explore_flex">
       {topCompanies && <Carousel responsive={responsive}
          autoPlay={false}
          autoPlaySpeed={1500}
          keyBoardControl={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="topScrollContent">
          {topCompanies && topCompanies.map((item, index) => {
            return (
              <div key={index} className="card--style tradeConfirm" onClick={()=>handleClick(item)}>
                <div className="card--data p--16">
                  <div className="card--row">
                    <ul className="listItem">
                      <li>
                        <h4 className="card--title--label">Stock Name</h4>
                        <p className="card--title">{item.Symbol}</p>
                        <p className="card--title">{item.Name}</p>

                      </li>
                    </ul>
                    <ul className="listItem">
                      <li>
                        <p className="card--title--label">Current Price</p>
                        <p className="card--title">{item.Last?.toFixed(2)}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="card--row">
                    <ul className="listItem">
                      <li>
                        <p className="card--title--label">Volume</p>
                        <p className="card--title">{item?.Volume}</p>
                      </li>

                      <li>
                        <p className="card--title--label">Change</p>
                        <p className="card--title">{item?.Change}</p>
                      </li>

                      <li>
                        <p className="card--title--label">%Change</p>
                        <p className="card--title">{item?.PerChange}%</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </Carousel>}
      </div>

    </div>
  );
};

export default SuggestCard;
