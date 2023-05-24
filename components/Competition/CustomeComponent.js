import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';
import { gameService } from '../../services/game.service';

const CustomeComponent = ({item}) => {
    const [loadingLeaderboard,setLoadingLeaderboard]=useState(false)
    const [loadingTrade,setLoadingTrade]=useState(false)
  let { user } = useSelector((state) => state.userWrapper);
    
    const linktarget = useRef();
    const tradehistory=useRef()
  
    const [date, setDate] = useState(new Date());
    const [csvData, setCsvData] = useState([]);
    const [tradeData,setTradeData]=useState([])
    const [leaderHeaders, setLeaderHeaders] = useState([
      {
        label: "Rank",
        key: "rank",
      },
      { label: "Username", key: "result.username" },
      { label: "Account Value", key: "accountValue" },
      { label: "Overall Naira Change", key: "annualReturn" },
      { label: "Overall Percent Change", key: "profitOrLossToday" },
    ]);
    const [tradeHeaders, setTradeHeaders] = useState([
      {
        label: "Username",
        key: "username",
      },
      { label: "Date", key: "updatedAt" },
      { label: "Symbol", key: "symbol" },
      { label: "Trade Type", key: "action" },
      { label: "Quantity", key: "quantity" },
      { label: "Price", key: "rate" },
  
    ]);
  
    
  
    const downloadLeaderBoard = async (id) => {
      setLoadingLeaderboard(true)
      const { data } = await gameService.getLeaderBoard(id);
      setCsvData(data);
      setTimeout(() => {
        linktarget.current.link.click();
        setLoadingLeaderboard(false)
      }, 2000);
    };
    const downloadTradeHistory = async (id) => {
      setLoadingTrade(true)
      const { data } = await gameService.getTradeHistory(id);
      setTradeData(data);
      setTimeout(() => {
          tradehistory.current.link.click();
        setLoadingTrade(false)
      }, 2000);
    };
   
  return (
    <div
    className={
      item._id === localStorage.getItem("GameId")
        ? "connectionBlock CurrentJoined"
        : "connectionBlock"
    }
  >
    <div className="titleBox px-32 py-16">
      <h4 className="font-18 font--bold mb-12">
        {item.competitionName}{" "}
        {item.creatorId == user?.user?._id && (
          <span
            style={{
              fontWeight: "bold",
              color: "#8000ff",
              marginLeft: "20px",
            }}
          >
            Admin
          </span>
        )}
        {item.competitionType == "Private" && (
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M8 0.25C5.24609 0.25 3 2.49609 3 5.25V6.5H2.375C1.34473 6.5 0.5 7.34473 0.5 8.375V14.625C0.5 15.6553 1.34473 16.5 2.375 16.5H13.625C14.6553 16.5 15.5 15.6553 15.5 14.625V8.375C15.5 7.34473 14.6553 6.5 13.625 6.5H13V5.25C13 2.49609 10.7539 0.25 8 0.25ZM8 1.5C10.0801 1.5 11.75 3.16992 11.75 5.25V6.5H4.25V5.25C4.25 3.16992 5.91992 1.5 8 1.5ZM2.375 7.75H13.625C13.9766 7.75 14.25 8.02344 14.25 8.375V14.625C14.25 14.9766 13.9766 15.25 13.625 15.25H2.375C2.02344 15.25 1.75 14.9766 1.75 14.625V8.375C1.75 8.02344 2.02344 7.75 2.375 7.75Z"
              fill="#8000FF"
            />
          </svg>
        )}
      </h4>
    </div>
    <div className="gridRow">
      <div className="grid--2 px-32 pb-32">
        <div className="colLeftBlock">
          <p>{item.competitionDescription}</p>
        </div>
        <div className="colRightBlock">
          <div className="flexBox endBlock">
            <div className="colBlock">
              <p className="font-17 font--normal">TIMING</p>
              <h2 className="font-17 font--bold">
                {item?.dateRange.split(" ")[0]} -{" "}
                {item?.dateRange.split(" ")[1] == "null"
                  ? "No End"
                  : item?.dateRange.split(" ")[1]}
              </h2>
            </div>
            <div className="colBlock">
              <p className="font-17 font--normal">CURRENT RANK</p>
              <h2 className="font-17 font--bold flexBox">
                {item.result.rank || "--"}
                <span className="font-17 font--normal flexBox">
                  <svg
                    className="ml-12 mr-12"
                    width="13"
                    height="14"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M9 0.445312L8.46094 0.960937L0.960938 8.46094L2.03906 9.53906L8.25 3.32812V18H9.75V3.32812L15.9609 9.53906L17.0391 8.46094L9.53906 0.960937L9 0.445312Z"
                      fill="#00FFA0"
                    ></path>
                  </svg>
                  of {item.users.length} Players
                </span>
              </h2>
            </div>
            <div className="colBlock">
              <p className="font-17 font--normal">
                YOUR ACCOUNT VALUE
              </p>
              <h2 className="font-17 font--bold text--purple">
                ₦{" "}
                {item?.result?.accountValue
                  ?.toFixed(2)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="grid--2 px-32 pb-26">
        <div className="colLeftBlock">
       {item.creatorId==user?.user?._id && <div className="competation-rules flexBox">
            
                <h5
                  style={{ cursor: "pointer" }}
                  className="font-16 text--purple mt-32"
                  onClick={() => downloadTradeHistory(item?._id)}
                >
                  {loadingTrade ?"Loading...":"Download Trade Histories"}
                  <span>
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 8 13"
                      fill="none"
                    >
                      <path
                        d="M0.734375 0.0234375L0.015625 0.726562L5.67578 6.5L0.015625 12.2773L0.734375 12.9727L7.07422 6.5L0.734375 0.0234375Z"
                        fill="#8000FF"
                      />
                    </svg>
                  </span>
                </h5>
              
            <CSVLink
              style={{ display: "none" }}
              ref={tradehistory}
              headers={tradeHeaders}
              data={tradeData}
            >
              Download me
            </CSVLink>
            
            
          </div>}
          <div className="competation-rules flexBox">
            
                <h5
                  style={{ cursor: "pointer" }}
                  className="font-16 text--purple mt-32"
                  onClick={() => downloadLeaderBoard(item?._id)}
                >
                  {loadingLeaderboard?"Loading...":"Download Leaderboard"}
                  <span>
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 8 13"
                      fill="none"
                    >
                      <path
                        d="M0.734375 0.0234375L0.015625 0.726562L5.67578 6.5L0.015625 12.2773L0.734375 12.9727L7.07422 6.5L0.734375 0.0234375Z"
                        fill="#8000FF"
                      />
                    </svg>
                  </span>
                </h5>
              
            <CSVLink
              style={{ display: "none" }}
              ref={linktarget}
              headers={leaderHeaders}
              data={csvData}
            >
              Download me
            </CSVLink>
            
            
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CustomeComponent