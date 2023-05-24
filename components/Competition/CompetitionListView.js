import { Loader } from "@mantine/core";
import { months } from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { gameService } from "../../services/game.service";
import IncreaseDecrease from "../Table/IncreaseDecrease";

export default function WinnerListView() {
  let { user } = useSelector((state) => state.userWrapper);
  const [top5, setTop5] = useState([]);
  const [currentGame, setCurrentGame] = useState();
  const [month, setMonth] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    if (user && user?.mygame) {
      let temp = user?.mygame?.filter(
        (item) => item?.gameId?._id == localStorage.getItem("GameId")
      );
      setCurrentGame(temp[0]?.gameId);
      findMonth(temp[0]?.gameId);
    }
  }, []);
  useEffect(() => {
    if (user && user?.mygame) {
      let temp = user?.mygame?.filter(
        (item) => item?.gameId?._id == localStorage.getItem("GameId")
      );
      setCurrentGame(temp[0]?.gameId);
      findMonth(temp[0]?.gameId);
    }
  }, [user]);
  const findMonth = (data) => {
    let startDate = new Date(data?.startDate);
    let today = new Date();
    let temp=  new Date(data?.startDate)
    temp.setMonth(today.getMonth())
    temp.setFullYear(today.getFullYear())
    setDate(temp)
    let months = [];
    while (startDate <= today) {
      let month = startDate.toLocaleString(undefined, { month: "long" });
      let year = startDate.getFullYear();
      let obj = {
        level: `${month} (${year})`,
        date: new Date(startDate),
      };
      months.push(obj);
      startDate.setMonth(startDate.getMonth() + 1);
    }
    setMonth(months);
  };
  const getWinner = (date) => {
    setLoading(true)
    gameService
      .getWinner(date)
      .then((res) => {
        if (res.success) {
          setTop5(res.top);
        }else{
          setTop5([])
        }
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getWinner(date);
  }, [date, user]);


  return (
    <>
      <div className="competation-">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <select
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: "10px 20px", margin: "20px 10px" }}
            value={date}
          >
            {month?.map((item, index) => (
              <option
          
                value={item?.date}
                key={index}
              >
                {item.level}
              </option>
            ))}
          </select>
        </div>
        <div className="summeyTable">
         { loading?<div
                  style={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader color="#8000ff" />
                </div>: <div className="status-summary noRadius font-18 summery-table summeyTable">
            {top5.length==0?<div style={{width:'100%',margin:'20px 0px', display:'flex',justifyContent:'center'}}>No data available</div>:<table>
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
                        item?.result?._id == user?.user?._id ? "currentUser":""
                      }
                      key={index}
                    >
                      <td>{index + 1}</td>
                      <td>{item?.userId?.username}</td>
                      <td>
                        ₦{" "}
                        {item?.accountValue
                          ?.toFixed(2)
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                      {IncreaseDecrease(
                        item?.profitOrLossToday,
                        (item?.profitOrLossToday * 100) / item?.accountValue
                      )}
                      {/* <div className='flexBox'>

                                        -$4.00 (NaN%)
                                        <svg className="ml-12" width="16" height="17" viewBox="0 0 27 29" fill="none"><path d="M13.6021 28.0854L14.462 27.2629L26.4263 15.2986L24.7064 13.5788L14.7985 23.4867L14.7985 0.081543H12.4056L12.4056 23.4867L2.4977 13.5788L0.777832 15.2986L12.7421 27.2629L13.6021 28.0854Z" fill="#F45531"></path></svg>
                                    </div> */}
                      {/* </td> */}
                      {IncreaseDecrease(
                        item?.annualReturn,
                        (item?.annualReturn * 100) / item?.accountValue
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>}
          </div>}
        </div>
      </div>
    </>
  );
}
