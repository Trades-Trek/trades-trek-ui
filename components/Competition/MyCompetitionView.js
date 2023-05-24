import React, { useEffect, useState } from "react";
import Link from "next/link";
import { gameService } from "../../services/game.service";
import { useDispatch, useSelector } from "react-redux";
import PreviewGameRules from "../Modal/PreviewGameRules";
import { useRouter } from "next/router";
import PreviewEditGame from "../Modal/PreviewEditGame";
import PreviewDeleteGame from "../Modal/PreviewDeleteGame";
import PreviewResetPortfolio from "../Modal/PreviewResetPortfolio";
import ReactPaginate from "react-paginate";
import { set } from "react-hook-form";
import InviteCompetitionModel from "../Modal/InviteCompetitionModel";
import PreviewLeaveCompetition from "../Modal/PreviewLeaveCompetion";
import { Loader } from "@mantine/core";
import { userService } from "../../services";
import { setUser } from "../../actions/users";
import CurrentComponent from "./CurrentComponent";

export default function MyCompetationView() {
  const router = useRouter();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.userWrapper);
  const [myGame, setMyGame] = useState();
  const [search, setSearch] = useState("");
  const [modelOpened, setModelOpened] = useState(false);
  const [selectedData, setSelectedDate] = useState([]);
  const [editData, setEditData] = useState([]);
  const [modelOpened1, setModelOpened1] = useState(false);
  const [modelOpened2, setModelOpened2] = useState(false);
  const [modelOpened3, setModelOpened3] = useState(false);
  const [modelOpened4, setModelOpened4] = useState(false);
  const [modelOpened5, setModelOpened5] = useState(false);
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [deleteGameId, setDeleteGameId] = useState();
  useEffect(() => {
    getAllGame(search, 1);
    setPage(1);
  }, [search]);
  useEffect(() => {
    if (
      !modelOpened1 &&
      !modelOpened2 &&
      !modelOpened3 &&
      !modelOpened4 &&
      !modelOpened5
    ) {
      getAllGame(search, page);
    }
  }, [modelOpened1, modelOpened2, modelOpened3, modelOpened4, modelOpened5]);

  const getAllGame = (search, current) => {
    setLoading(true);
    gameService
      .getMYGame(search, current)
      .then((res) => {
        setMyGame(res.games);
        setAllPage(res.pages);
        setLoading(false);
        userService
          .userInfo()
          .then((res) => {
            if (res.success) {
              dispatch(setUser(res.data));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };
  const handleSelectGame = (id) => {
    const data = myGame.filter((item) => item._id == id);
    setSelectedDate(data);
    setModelOpened(true);
  };
  const handleGoToHome = (id) => {
    localStorage.setItem("GameId", id);
    router.push("/dashboard/portfolio");
  };
  const handleEditGame = (id) => {
    const data = myGame.filter((item) => item._id == id);
    setEditData(data);
    setModelOpened1(true);
  };
  const handleDeleteGame = (id) => {
    setDeleteGameId(id);
    setModelOpened2(true);
  };
  const handlePortfolioReset = (id) => {
    setDeleteGameId(id);
    setModelOpened3(true);
  };
  const handlePageClick = ({ selected }) => {
    getAllGame(search, selected + 1);
    setPage(selected + 1);
  };
  const handleInvite = (id) => {
    setDeleteGameId(id);
    const data = myGame.filter((item) => item._id == id);
    setEditData(data);
    setModelOpened4(true);
  };
  const handleLeaveCompetition = (id) => {
    setDeleteGameId(id);
    setModelOpened5(true);
  };
 
  return (
    <>
      <div className="myConn">
        <div className="col-40">
          <div className="form--item noMargin pl--8">
            <label>Competition Lookup</label>
            <input
              className="form--control"
              type="text"
              value={search}
              autoComplete="false"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Look up competition name or creator"
            />
            <span className="search">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.12927 0.0878906C10.8191 0.0878906 13.8233 3.09206 13.8233 6.7819C13.8233 8.35662 13.2538 9.79189 12.3357 10.9366L19.7386 18.3395L18.6927 19.3971L11.284 11.9884C10.1392 12.9065 8.70399 13.4759 7.12927 13.4759C3.43942 13.4759 0.435253 10.4717 0.435253 6.7819C0.435253 3.09206 3.43942 0.0878906 7.12927 0.0878906ZM7.12927 1.57545C4.24712 1.57545 1.92281 3.89976 1.92281 6.7819C1.92281 9.66405 4.24712 11.9884 7.12927 11.9884C10.0114 11.9884 12.3357 9.66405 12.3357 6.7819C12.3357 3.89976 10.0114 1.57545 7.12927 1.57545Z"
                  fill="#AFAFAF"
                ></path>
              </svg>
            </span>
          </div>
        </div>
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
        ) : (
          <div>
            {myGame &&
              myGame.map((item, index) => {
                return (
                  <CurrentComponent
                    key={index}
                    item={item}
                    user={user}
                    handleEditGame={handleEditGame}
                    handleSelectGame={handleSelectGame}
                    handlePortfolioReset={handlePortfolioReset}
                    handleLeaveCompetition={handleLeaveCompetition}
                    handleDeleteGame={handleDeleteGame}
                    handleInvite={handleInvite}
                    handleGoToHome={handleGoToHome}
                    length={myGame.length}

                  />
                );
              })}
          </div>
        )}
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
      <PreviewGameRules
        modelOpened={modelOpened}
        setModelOpened={setModelOpened}
        //   setShowTrade={setShowTrade}
        data={selectedData}
      />
      <PreviewEditGame
        modelOpened={modelOpened1}
        setModelOpened={setModelOpened1}
        //   setShowTrade={setShowTrade}
        data={editData}
      />
      <PreviewDeleteGame
        modelOpened={modelOpened2}
        setModelOpened={setModelOpened2}
        id={deleteGameId}
      />
      <PreviewResetPortfolio
        modelOpened={modelOpened3}
        setModelOpened={setModelOpened3}
        id={deleteGameId}
      />
      <InviteCompetitionModel
        modelOpened={modelOpened4}
        setModelOpened={setModelOpened4}
        id={deleteGameId}
        data={editData}
      />
      <PreviewLeaveCompetition
        modelOpened={modelOpened5}
        setModelOpened={setModelOpened5}
        id={deleteGameId}
      />
      {/* <div className="innerBlock">
        <div className="p-20">
          <h4 className="font-16">PAST COMPETITIONS</h4>
        </div>
        <div className="myConn px-32 py-16">
          <p className="flexBox gap--4">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path
                d="M8.04297 0C3.63432 0 0.0429688 3.59135 0.0429688 8C0.0429688 12.4087 3.63432 16 8.04297 16C12.4516 16 16.043 12.4087 16.043 8C16.043 3.59135 12.4516 0 8.04297 0ZM8.04297 1.23077C11.7882 1.23077 14.8122 4.25481 14.8122 8C14.8122 11.7452 11.7882 14.7692 8.04297 14.7692C4.29778 14.7692 1.27374 11.7452 1.27374 8C1.27374 4.25481 4.29778 1.23077 8.04297 1.23077ZM7.42758 3.69231V9.84615H8.65835V3.69231H7.42758ZM7.42758 11.0769V12.3077H8.65835V11.0769H7.42758Z"
                fill="#2525BB"
              />
            </svg>
            No Data Available
          </p>
        </div>
      </div> */}
    </>
  );
}
