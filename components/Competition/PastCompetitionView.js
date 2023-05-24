import { Loader } from "@mantine/core";
import { months } from "moment-timezone";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { gameService } from "../../services/game.service";
import IncreaseDecrease from "../Table/IncreaseDecrease";
import CustomeComponent from "./CustomeComponent";

export default function PastCompetitionView() {
  let { user } = useSelector((state) => state.userWrapper);
  const [top5, setTop5] = useState([]);
  const [loading,setLoading]=useState(false)

  const [date, setDate] = useState(new Date());

  const getWinner = () => {
    setLoading(true)
    gameService
      .getMYPastGame()
      .then((res) => {
        if (res.success) {
          setTop5(res.games);
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
     {top5.length!=0 && <div style={{ margin: "10px 0px" }}>
        <h1 style={{ fontSize: "18px" }}>PAST COMPETITION</h1>
      </div>}
      <div className="myConn">
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
                </div>:top5 && (
          <div>
            {top5.map((item, index) => {
              return <CustomeComponent key={index} item={item} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
