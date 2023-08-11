import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gameService } from "../../services/game.service";
import { useSelector } from "react-redux";
import { useState } from "react";
import IncreaseDecrease from "../Table/IncreaseDecrease";
import  OverallChange from '../Table/OverallChange'
import ReactPaginate from "react-paginate";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import HighlightTrades from "../HighlightTrades/HighlightTrades";
import LineChart from "../Chart/LineChart";
import AnotherStock from "../AnotherUserStock/AnotherStock";
import ProfileAnotherUser from "../AnotherUserStock/ProfileAnotherUser";
import HistoryUser from "../AnotherUserStock/history-user";
import { CSVLink } from "react-csv";
import PerformanceHistory from "../AnotherUserStock/performance-history";

export default function CompetationSummeryView({ setDisabled, disabled }) {
  let { user } = useSelector((state) => state.userWrapper);
  const router = useRouter();
  const [top5, setTop5] = useState([]);
  const [nearResult, setNearResult] = useState([]);
  const [yourRank, setYourRank] = useState(0);
  const [showAllUser, setShowAllUser] = useState(false);
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [myGame, setMyGame] = useState();
  const [userName, setUserName] = useState("");
  const [historyName, setHistoryName] = useState("");
  const [perform, setPerform] = useState("");
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const linktarget = useRef();

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
  const check = (item) => {
    return item?.userId == user?.user?._id;
  };
  useEffect(() => {
    if (router?.query?.username) {
      setUserName(router?.query?.username);
      setDisabled(true);
    } else {
      setUserName("");
      setDisabled(false);
    }
    if (router?.query?.username) {
      setHistoryName(router?.query?.history);
    }
    if (router?.query?.username) {
      setPerform(router?.query?.perform);
    }
  }, [router]);
  useEffect(() => {
    if (!userName) {
      if (showAllUser) {
        setTop5([]);
        setNearResult([]);
        AllRank(page);
      } else {
        MyRank();
        setAllPage(1);
      }
    }
  }, [user, showAllUser, userName]);
  const MyRank = () => {
    setLoading(true);
    gameService
      .myRank()
      .then((res) => {
        const { success, data, currentGame } = res;
        if (success) {
          const { topRanked, nearRank, rank } = data;

          if (!data.rank) {
            setTop5(topRanked);
            setNearResult([]);
            setMyGame(currentGame);
            setYourRank(0);
          } else {
            setTop5(topRanked);
            setNearResult(nearRank);
            setYourRank(rank);
            setMyGame(currentGame);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const AllRank = (current) => {
    setLoading(true);
    gameService
      .allRank(current)
      .then((res) => {
        if (res.success) {
          if (res.data) {
            setTop5(res.data);
            setMyGame(res.currentGame);

            // console.log(res.pages)
            setAllPage(res.pages);
          } else {
            setTop5(res.data);
            setMyGame(res.currentGame);

            setNearResult([]);
            setYourRank(0);
          }
        } else {
          setTop5([]);
          setNearResult([]);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const downloadLeaderBoard = async (id) => {
    setLoadingLeaderboard(true);
    const { data } = await gameService.getLeaderBoard(id);
    setCsvData(data);
    setTimeout(() => {
      linktarget.current.link.click();
      setLoadingLeaderboard(false);
    }, 2000);
  };
  const handlePageClick = ({ selected }) => {
    AllRank(selected + 1);
    setPage(selected + 1);
  };

  return (
    <>
      {userName && perform ? (
        <PerformanceHistory userName={userName} />
      ) : userName && historyName ? (
        <HistoryUser userName={userName} />
      ) : userName ? (
        <div className="page--title--block">
          <ProfileAnotherUser userName={userName} />
          <AnotherStock userName={userName} />
        </div>
      ) : (
        <div>
          <div className="summeyTable">
            <div className="p-20">
              <h4 className="font-16">LEADERBOARD</h4>
            </div>
            <div className="status-summary noRadius font-18 summery-table table-view">
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader color="#8000ff" />
                </div>
              ) : top5.length == 0 ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    margin: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1>You have not been ranked yet</h1>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Account Value</th>
                      <th>Today’s Change</th>
                      <th>Overall Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top5?.map((item, index) => {
                      return (
                        <tr
                          className={
                            item?.result?._id == user?.user?._id
                              ? "currentUser"
                              : ""
                          }
                          key={index}
                        >
                          <td>{item?.rank}</td>
                          {item?.result?._id == user?.user?._id ? (
                            <td>
                              <Link href={`portfolio`}>
                                <a>
                                  <u>{`${item?.result?.username || ""} `}</u>{" "}
                                </a>
                              </Link>{" "}
                            </td>
                          ) : myGame?.allowPortfolioViewing ? (
                            <td>
                              <Link
                                href={`competition-summary?username=${item?.result?.username}`}
                              >
                                <a>
                                  <u>{`${item?.result?.username || ""} `}</u>{" "}
                                </a>
                              </Link>{" "}
                            </td>
                          ) : (
                            <td>{`${item?.result?.username || ""} `}</td>
                          )}

                          {/* <td>{`${item?.result?.username || ""} `}</td> */}
                          <td>
                            ₦{" "}
                            {item?.accountValue +
                              item?.profitOrLossToday
                                ?.toFixed(2)
                                ?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </td>

                          {IncreaseDecrease(
                            item?.profitOrLossToday,
                            (item?.profitOrLossToday * 100) / item?.accountValue
                          )}

                          {OverallChange(
                            item?.accountValue +
                            item?.profitOrLossToday 
                            ,
                            item?.competitionStartingCash
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {allPage > 1 && (
            <div className="paginationReact">
              <ReactPaginate
                forcePage={page - 1}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageCount={allPage}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
          {showAllUser && (
            <div className="wrapper--hgroup">
              <div className="wrapper--title"></div>
              <div className="readmore--link">
                <Link href="#">
                  <a
                    className="text--purple"
                    onClick={() => {
                      setShowAllUser(false);
                      setPage(1);
                    }}
                  >
                    Collapse View
                  </a>
                </Link>
              </div>
            </div>
          )}
          {nearResult.length > 0 && (
            <div className="wrapper--hgroup">
              <div className="wrapper--title">
                <h3>RESULTS NEAR YOUR RANK</h3>
              </div>
            </div>
          )}
          {!showAllUser && top5.length != 0 && (
            <div className="wrapper--hgroup">
              <div className="wrapper--title"></div>
              <div className="readmore--link">
                <Link href="#">
                  <a
                    className="text--purple"
                    onClick={() => {
                      setShowAllUser(true);
                    }}
                  >
                    See All
                  </a>
                </Link>
              </div>
            </div>
          )}
          {nearResult.length > 0 && (
            <div className="innerTable">
              <div className="summeyTable">
                <div className="status-summary noRadius font-18 summery-table summeyTable">
                  <table>
                    <tbody>
                      {nearResult?.map((item, index) => {
                        return (
                          <tr
                            className={
                              item?.result?._id == user?.user?._id
                                ? "currentUser"
                                : ""
                            }
                            key={index}
                          >
                            <td>{item?.rank}</td>
                            {myGame?.allowPortfolioViewing ? (
                              <td>
                                <Link
                                  href={`competition-summary?username=${item?.result?.username}`}
                                >
                                  <a>
                                    <u>{`${item?.result?.username || ""} `}</u>{" "}
                                  </a>
                                </Link>{" "}
                              </td>
                            ) : (
                              <td>{`${item?.result?.username || ""} `}</td>
                            )}
                            <td>
                              ₦{" "}
                              {item?.accountValue
                                ?.toFixed(2)
                                ?.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </td>
                            {IncreaseDecrease(
                              item?.profitOrLossToday,
                              (item?.profitOrLossToday * 100) /
                                item?.accountValue
                            )}

                            {IncreaseDecrease(
                              item?.annualReturn,
                              (item?.annualReturn * 100) / item?.accountValue
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {top5.length != 0 &&
        myGame?.creatorId == user?.user?._id &&
        userName == "" && (
          <div className="downloadLeaderBoard">
            <button onClick={() => downloadLeaderBoard(myGame?._id)}>
              {loadingLeaderboard ? "Loading..." : "DOWNLOAD LEADERBOARD"}
            </button>
            <CSVLink
              style={{ display: "none" }}
              ref={linktarget}
              headers={leaderHeaders}
              data={csvData}
            >
              Download me
            </CSVLink>
          </div>
        )}
    </>
  );
}
