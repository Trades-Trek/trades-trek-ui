import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Loader } from "@mantine/core";
import { supportService } from "./../../services/support.service";
import LeadersData from "./../../components/SectorLeaders/LeaderData";
import FullCard from "../../components/Learning/FullCard";
import HalfCard from "../../components/Learning/HalfCard";
export default function LearningTab() {
  const [allLearning, setAllLearning] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    supportService
      .GetAllLearning()
      .then((res) => {
        if (res.success) {
          setAllLearning(res.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);


  return (
    <>
      <div className="">
        {isLoading ? (
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
        ) : (
          <div className="learningWrapper">
            <div className="halfCardGrid">
              {allLearning?.map((item, i) => {
                if ((i + 1) % 3 == 0) {
                  return <FullCard item={item} key={i} />;
                } else {
                  return <HalfCard item={item} key={i} />;
                }
              })}
            </div>
            {/* <FullCard /> */}
          </div>
        )}
      </div>
    </>
  );
}
