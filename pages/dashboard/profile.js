import React, { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SubscriptionExpiredMessage from "../../components/MarketOpenClose/SubscriptionExpiredMessage";

import Account from "../../components/profileComponent/Account";
import HelpSupport from "../../components/profileComponent/HelpSupport";
import InviteFriend from "../../components/profileComponent/InviteFriend";
import RequestAmount from "../../components/profileComponent/RequesAmount";
import Security from "../../components/profileComponent/Security";
import TermCondition from "../../components/profileComponent/TermCondition";
import WriteReview from "../../components/profileComponent/WriteReview";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Profie() {
  const [tabIndex,setTabIndex]=useState(0)
  return (
    <>
      <Sidebar />
      
      <div className="site--content pageCenterWidth">

        <div className="page--title--block">

          <div className="card-no-gap">
            <div className="trade-data">
              <SubscriptionExpiredMessage />
              <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                  <Tab>Account</Tab>
                  <Tab>Security</Tab>
                  <Tab>Invite a Friend</Tab>
                  <Tab>Help & Support</Tab>
                  <Tab>Write a Review</Tab>
                  <Tab>Terms & Conditions</Tab>
                  <Tab>Accounting</Tab>
                </TabList>

                {/* account ... */}
                <TabPanel>
                  <Account />
                </TabPanel>
                {/* Security  */}
                <TabPanel>
                  <Security />
                </TabPanel>
                {/* invite Friend */}
                <TabPanel>
                  <InviteFriend setTabIndex={setTabIndex} />
                </TabPanel>
                {/* Help and support  */}
                <TabPanel>
                    <HelpSupport />
                </TabPanel>
                {/* write Review  */}
                <TabPanel>
               <WriteReview />
                </TabPanel>
                {/* Term and Conditions */}
                <TabPanel>
                 <TermCondition />
                </TabPanel>
                <TabPanel>
                 <RequestAmount />
                </TabPanel>
              </Tabs>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
