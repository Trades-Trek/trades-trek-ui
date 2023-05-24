import React, { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Sidebar from "../../components/Sidebar/Sidebar";
import Stocks from "../../components/TradeStocks/Stocks";
import TradeOrderStatus from "../../components/TradeStocks/TradeOrderStatus";
import { useDispatch, useSelector } from "react-redux";
import MarketOpenClose from "../../components/MarketOpenClose/MarketOpenClose";
import { AccountValue } from "../../helpers/UserAccount";
import { useRouter } from "next/router";
import { userService } from "../../services";
import StockConfirmation from "../../components/SuggestCard/StockConfirmation";
import { setUser } from "../../actions/users";
import { orderService } from "../../services/order.service";
import { setPopularCompany } from "../../actions/topCompany";
import SelectGame from "../../components/SelectGame/SelectGame";
import SubscriptionExpiredMessage from "../../components/MarketOpenClose/SubscriptionExpiredMessage";
import ToolTipCustome from "../../components/Competition/ToolTip";

export default function TradesTrek() {
  // const [beginnerOption, setBeginnerOption] = useState(false);
  const [showTrade, setShowTrade] = useState(true);
  const [stockName, setStockName] = useState("");
  const [stockAction,setStockAction]=useState('')
  const [tabIndex, setTabIndex] = useState(0);
  const [game,setGame]=useState([])
  const [gameId,setGameId]=useState()
  // const []
  const [userData, setUserData] = useState({});
  const dispatch=useDispatch()

  const router = useRouter();
  let { user } = useSelector((state) => state.userWrapper);
  useEffect(() => {
    setUserData(user?.user);
      setGame(user?.mygame)

  }, [user]);
  useEffect(()=>{
    userService.userInfo().then((res)=>{
      // setUserData(res.message)
      dispatch(setUser(res.data))
      // setGame(res.mygame)
    }).catch((err)=>console.log(err))
  },[showTrade])
  

  useEffect(()=>{
   orderService.popularCompanies().then((res)=>{
    dispatch(setPopularCompany(res))
   }).catch((err)=>console.log('error'))
  
},[])
useEffect(() => {
 let index=localStorage.getItem('indexTrade')
 if(index){
  setTabIndex(Number(index))
 }
}, [])


const handleTab=(index)=>{
  setTabIndex(index)
  localStorage.setItem('indexTrade',index)
}
  return (
    <>
      <Sidebar />
      <div className="site--content">
        <div className="page--title--block">
          <div className="grid--2">
            <div className="grid-block-left wrapper--title">
              <h3>Welcome, {user && `${user?.user?.firstName || ""} ${user?.user?.lastName || ""}`}</h3>
            </div>
            <SelectGame />
          </div>

          <div className="top--value--bar">
            <div className="col-block">
              <p className="data-title">
              <span  className="itemAlign">
              Account Value <ToolTipCustome text={`Displays the total current value of your portfolio, which is updated nightly after the market’s close.`}/>
              </span>
                <span className="font-20 font-bold">
                {/* ₦{(userData.accountValue?.toFixed(2))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                ₦{user && ((user?.portfolio?.accountValue+user?.portfolio?.profitOrLossToday)?.toFixed(2))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </p>
            </div>
            <div className="col-block">
              <p className="data-title">
              
                <span  className="itemAlign">
                Buying Power <ToolTipCustome text={`The total value of your cash and margin accounts that can be used to make trades. Calculated as: cash + (Long Stocks x 50%) - (Shorted Stocks x 150%).`}/>
              </span>
                <span className="font-20 font-bold">
                ₦{user && ((user?.portfolio?.buyingPower+(user?.portfolio?.gameId?.allowTradingWithMargin?(user?.portfolio?.profitOrLossToday/2):user?.portfolio?.profitOrLossToday))?.toFixed(2))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </p>
            </div>
            <div className="col-block">
              <p className="data-title">
                <span  className="itemAlign">
                Cash <ToolTipCustome text={`Total amount of cash available for making trades.`}/>
              </span>
                <span className="font-20 font-bold">
                ₦{user && ((user?.portfolio?.cash+user?.portfolio?.profitOrLossToday)?.toFixed(2))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </p>
            </div>
          </div>
          <div className="card-no-gap">
            <div className="trade-data">
              <Tabs   selectedIndex={tabIndex} onSelect={(index) => handleTab(index)}>
                <TabList>
                  <Tab>Stocks</Tab>
                  <Tab>Order Status</Tab>
                </TabList>
                <MarketOpenClose />
                <TabPanel>
                  <div className="tab-data">
                    {/* <Stocks /> */}
                    {showTrade ? (
                      <Stocks
                        setShowTrade={setShowTrade}
                        setStockName={setStockName}
                        setStockAction={setStockAction}
                      />
                    ) : (
                     <StockConfirmation stockAction={stockAction}  stockName={stockName} setShowTrade={setShowTrade} />
                     )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="tab-data order-status">
                    <TradeOrderStatus setShowTrade={setShowTrade} />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
