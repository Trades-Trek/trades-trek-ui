import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { stockService } from "../../services/stock.service";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions/users";
import { setSelectedStock } from "../../actions/setStock";
import { gameService } from "../../services/game.service";

function  PreviewGameRules({ modelOpened, setModelOpened, data, setShowTrade }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const dispatch = useDispatch();
  const [password, setPasswod] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let { user } = useSelector((state) => state.userWrapper);

  const theme = useMantineTheme();
 
  const handleJoin = () => {
    if (data[0].competitionType == "Private") {
      if (passwordCorrect) {
        gameService
          .joinGame({ gameId: data[0]._id, password: password })
          .then((res) => {
            if (res.success == false) {
              setErrorStatus(true);
              setError(res.message);
            } else {
              setError();
              setErrorStatus(false);
              setModelOpened(false);
            }
          })
          .catch((err) => console.log(err));
       
      }
    } else {
      gameService
        .joinGame({ gameId: data[0]._id })
        .then((res) => {
          setError();
          setErrorStatus(false);
          setModelOpened(false);
        })
        .catch((err) => console.log(err));
      
    }
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modelOpened}
      size="80%"
      overflow="inside"
      onClose={() => {
        setError("");
        setPasswod("");
        setErrorStatus(false);
        setModelOpened(false);
        setShowPassword(false);
      }}
    >
      {data.length > 0 && (
        <div className="" style={{ padding: "10px 20px" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: " 10px",
            }}
          >
            {data[0]?.competitionName}
          </h1>
          <span style={{ fontSize: "18px" }}>by: {data[0]?.username}</span>

          

          {errorStatus && (
            <div
              className=""
              style={{ border: "1px solid red", margin: "20px" }}
            >
              <p style={{ textAlign: "center", padding: "10px", color: "red" }}>
                {error}
              </p>
            </div>
          )}
          <div className="box-align" style={{ marginTop: "10px" }}>
            <div className="row-block">
              <p className="font-18 ">
                <span className="font--bold">Timing :- </span>
                <span>{`${data[0]?.dateRange.split(" ")[0]} - ${
                  data[0]?.dateRange.split(" ")[1] == "null"
                    ? "No End"
                    : data[0]?.dateRange.split(" ")[1]
                } `}</span>{" "}
              </p>
              <p className="font-18 ">
                <span className="font--bold">NUMBER OF PLAYERS :- </span>
                <span>{data[0]?.users?.length}</span>
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">
                <span className="font--bold"> STARTING CASH :- </span>
                <span>{data[0]?.startingCash.toFixed(2)}</span>
              </p>
            </div>
           

            <h1
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "10px 0px",
              }}
            >
              COMPETITION RULES
            </h1>
            <h1
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                margin: "10px 0px",
              }}
            >
              COMPETITION NAME & BASIC TRADING RULES
            </h1>
            {/* <hr style={{margin:'0px 10px',width:'10px'}} /> */}
            <div className="row-block">
              <p className="font-18 ">Margin Trading </p>
              <p className="font-18 ">
                {data[0]?.allowTradingWithMargin ? "Yes" : "No"}
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Short Selling </p>
              <p className="font-18 ">
                {data[0]?.allowShortSelling ? "Yes" : "No"}
              </p>
            </div>
           
            <h1
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                margin: "10px 0px",
              }}
            >
              BASIC COMPETITION RULES
            </h1>
            <div className="row-block">
              <p className="font-18 ">Late Entry</p>
              <p className="font-18 ">
                {data[0]?.allowLateEntry ? "Yes" : "No"}
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Portfolio Viewing</p>
              <p className="font-18 ">
                {data[0]?.allowPortfolioViewing ? "Yes" : "No"}
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Portfolio Resetting</p>
              <p className="font-18 ">
                {data[0]?.allowPortfolioResetting ? "Yes" : "No"}
              </p>
            </div>

            <h1
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                margin: "10px 0px",
              }}
            >
              ADVANCED COMPETITION RULES
            </h1>
            {/* <div className='row-block'>
                <p className='font-18'>Stock Rate</p>
                <p className='font-18'>{(data.orderType == 'Market' ? data?.Last : data.rate )}</p>
            </div> */}

<div className="row-block">
              <p className="font-18 ">Market Delay</p>
              <p className="font-18 ">{`${data[0]?.marketDelay=='Disabled'?data[0]?.marketDelay:`${data[0]?.marketDelay} minutes`} `}</p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Daily Volume</p>
              <p className="font-18 ">
                {`${data[0]?.dailyVolume=='Disabled' ?  data[0]?.dailyVolume:`${data[0]?.dailyVolume} %`}`}
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Quick Sell</p>
              <p className="font-18 ">
                {`${data[0]?.quickSell=='Disabled' ? data[0]?.quickSell : `${data[0]?.quickSell} minutes`}`}
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Minimum Price</p>
              <p className="font-18 ">
              {`${
                  data[0]?.minimumPrice=='Disabled' ?data[0]?.minimumPrice: `₦ ${Number(data[0]?.minimumPrice)?.toFixed(2)}` 
                }`}
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Minimum Price Short</p>
              <p className="font-18 ">
              {`${
                  data[0]?.minimumPriceShort=='Disabled' ?data[0]?.minimumPriceShort: `₦ ${Number(data[0]?.minimumPriceShort)?.toFixed(2)}` 
                }`}
               
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Minimum Stock For Margin</p>
              <p className="font-18 ">
              {`${
                  data[0]?.minimumStockForMargin=='Disabled' ?data[0]?.minimumStockForMargin: `₦ ${Number(data[0]?.minimumStockForMargin)?.toFixed(2)}` 
                }`}
                
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Commission</p>
              <p className="font-18 ">
              {`${
                  data[0]?.commission=='Disabled' ?data[0]?.commission: `₦ ${Number(data[0]?.commission)}` 
                }`}
               
              </p>
            </div>
         
            <div className="row-block">
              <p className="font-18 ">Margin Interest</p>
              <p className="font-18 ">
              {`${data[0]?.marginInterest=='Disabled' ?  data[0]?.marginInterest:`${data[0]?.marginInterest} %`}`}
               
              </p>
            </div>
            <div className="row-block">
              <p className="font-18 ">Cash Interest</p>
              <p className="font-18 ">
              {`${data[0]?.cashInterest=='Disabled' ?  data[0]?.cashInterest:`${data[0]?.cashInterest} %`}`}

                
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default PreviewGameRules;
