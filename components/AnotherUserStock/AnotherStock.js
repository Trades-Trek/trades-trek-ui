import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import HoldingTables from '../Holding-Short-Trades/HoldingTables'
import ShortTable from '../Holding-Short-Trades/Short-Table'
import MarketOpenClose from '../MarketOpenClose/MarketOpenClose'
import AnotherUserHoldings from './Holdings'
import AnotherShortTable from './Shorts'

const AnotherStock = ({userName}) => {
  return (
          <div className="card-no-gap">
          <div className="trade-data">
            <Tabs >
              <TabList>
                <Tab>Holding Order</Tab>
                <Tab>Short Order</Tab>
              </TabList>
              <MarketOpenClose />
  
              <TabPanel>
                <div className="tab-data order-status">
                  <AnotherUserHoldings userName={userName} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-data order-status">
                  <AnotherShortTable userName={userName} />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
  )
}

export default AnotherStock