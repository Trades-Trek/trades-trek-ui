import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CompetationSummeryView from "../../components/Competition/CompetitionSummaryView";
import MyCompetationView from "../../components/Competition/MyCompetitionView";
import JoinCompetation from "../../components/Competition/JoinCompetition";
import CreateCompetation from "../../components/Competition/CreateCompetition";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SelectGame from "../../components/SelectGame/SelectGame";
import WinnerListView from "../../components/Competition/CompetitionListView";
import PastCompetitionView from "../../components/Competition/PastCompetitionView";
import SubscriptionExpiredMessage from "../../components/MarketOpenClose/SubscriptionExpiredMessage";

export default function CompetationSummery() {
  const [beginnerOption, setBeginnerOption] = useState(false);
  let { user } = useSelector((state) => state.userWrapper);
  const [disabled,setDisabled]=useState(false)
  const router = useRouter();
  useEffect(() => {    
    if (user.subscription == "Freemium") {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <>
      <Sidebar />
      <div className="site--content competation-page">
        <div className="page--title--block">
          <div className="grid--2">
            <div className="grid-block-left wrapper--title">
              <h3>
                Welcome,{" "}
                {user &&
                  `${user?.user?.firstName || ""} ${user?.user?.lastName ||
                    ""}`}{" "}
              </h3>
            </div>
            <SelectGame value={disabled} />
            {/* <div className="grid-block-right right-align">
                            <div className="beginner-option">
                                Current Competition
                                <span
                                    className="btn"
                                    onClick={() => setBeginnerOption(!beginnerOption)}
                                >
                                    Beginners
                                </span>
                                {beginnerOption && (
                                    <div className="option--list">
                                        <ul>
                                            <li>Beginners </li>
                                            <li>Beginners 1</li>
                                            <li>Beginners 2</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div> */}
          </div>
        </div>

        <div className="card--wrapper learning-research">

          <div className="trade-data">
            <div className="">
              <Tabs>
                <TabList>
                  <Tab>Summary</Tab>
                  <Tab onClick={()=>setDisabled(false)}><Link href='competition-summary'>My Competitions</Link></Tab>
                  <Tab onClick={()=>setDisabled(false)}><Link href='competition-summary'> Join Competition </Link></Tab>
                  <Tab onClick={()=>setDisabled(false)}><Link href='competition-summary'> Create Competition </Link></Tab>
                  <Tab onClick={()=>setDisabled(false)}><Link href='competition-summary'> Winner List </Link></Tab>
                </TabList>
                <TabPanel className="tab-content-gap">
                  <div className="myCompetation">
                    <CompetationSummeryView setDisabled={setDisabled} disabled={disabled} />
                  </div>
                </TabPanel>
                <TabPanel className="tab-content-gap">
                  <div className="myCompetation">
                    <MyCompetationView  />
                    
                    <PastCompetitionView />
                  </div>
                </TabPanel>
                <TabPanel className="tab-content-gap">
                  <div className="summeryData">
                    <JoinCompetation />
                  </div>
                </TabPanel>
                <TabPanel className="tab-content-gap">
                  <div className="summeryData">
                    <CreateCompetation />
                  </div>
                </TabPanel>
                <TabPanel className="tab-content-gap">
                  <div className="summeryData">
                    <WinnerListView />
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
