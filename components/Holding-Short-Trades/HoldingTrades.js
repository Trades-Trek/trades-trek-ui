import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { orderService } from "../../services/order.service";
import MarketOpenClose from "../MarketOpenClose/MarketOpenClose";
import StockPending from "../PendingTrade/StockPending";
import TradePendingOrders from "../Table/TradePendingOrders";
import HoldingTables from "./HoldingTables";
import ShortTable from "./Short-Table";

const HoldingTrades = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [modelOpened,setModelOpened]=useState(false)
  const [tableData,setTableData]=useState([])
  let { user } = useSelector((state) => state.userWrapper);

  const handleTab = (index) => {
    setTabIndex(index);
    localStorage.setItem("indexPort", index);
  };
  useEffect(() => {
    let index = localStorage.getItem("indexPort");
    setTabIndex(Number(index));
  }, []);
  useEffect(()=>{
    if(tabIndex==0){
      orderService.pendingHolding(1).then((res)=>{
        if(res.success==true){
          setTableData(res.data)
        }else{
          setTableData([])
        }
      }).catch((err)=>console.log(err))

    }else{
    orderService.pendingShort(1).then((res)=>{
      if(res.success==true){
        setTableData(res.data)
      }else{
        setTableData([])
      }
    }).catch((err)=>console.log(err))

    }
  },[tabIndex,user])

  return (
    <>
      <div className="card-no-gap">
        <div className="trade-data">
          <Tabs selectedIndex={tabIndex} onSelect={(index) => handleTab(index)}>
            <TabList>
              <Tab>Holding Order</Tab>
              <Tab>Short Order</Tab>
            </TabList>
            <MarketOpenClose />

            <TabPanel>
              <div className="tab-data order-status">
                <HoldingTables />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-data order-status">
                <ShortTable />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      {tableData.length>0 && <div className="card-no-gap">
        <h1 style={{textAlign:'center',marging:'20px 10px',fontSize:'20px'}}>Pending Trades</h1>
        <div className="trade-data">
        <StockPending modelOpened={modelOpened} setModelOpened={setModelOpened} tableData={tableData} />
        </div>
      </div>}
     
    </>
  );
};

export default HoldingTrades;
