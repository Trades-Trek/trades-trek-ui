import React, { useEffect, useState } from "react";
import Link from "next/link";
import { gameService } from "../../services/game.service";
import PreviewGameModel from "../Modal/PreviewGameModel";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { Loader } from "@mantine/core";
export default function JoinCompetation() {
  const [allGame, setAllGame] = useState();
  const [modelOpened, setModelOpened] = useState(false);
  const [selectedData, setSelectedDate] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [loading, setLoading] = useState(false);
  let { user } = useSelector((state) => state.userWrapper);
  const router = useRouter();
  useEffect(() => {
    if (!modelOpened) {
      GetAllGame(search, 1);
      setPage(1);
    }
  }, [search, modelOpened]);
  const GetAllGame = (input, page) => {
    setLoading(true);
    gameService
      .getAllGame(input, page)
      .then((res) => {
        if (res.success) {
          setAllGame(res?.data?.docs);
          setAllPage(res?.data?.pages);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const joinGame = (id) => {
    const data = allGame.filter((item) => item._id == id);
    setSelectedDate(data);
    setModelOpened(true);
  };
  const handleJoin = (item) => {
    if (item.users.includes(user?.user?._id)) {
      localStorage.setItem("GameId", item?._id);
      router.push("/dashboard/portfolio");
    } else {
      joinGame(item._id);
    }
  };
  const handlePageClick = ({ selected }) => {
    GetAllGame(search, selected + 1);
    setPage(selected + 1);
  };
  return (
    <>
      <div className="col-40">
        <div className="form--item">
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
      <div className="status-summary noRadius font-18 summery-table joinCompetation table-view">
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
          <table>
            <thead className="no-bg">
              <tr>
                <th>competition Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>No of Players</th>
                <th>Starting Cash</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allGame?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="font--normal font-16">
                        <div className="flexBox">
                          <span className="flexBox font--bold font-14">
                            {item?.competitionName}
                          </span>{" "}
                          &nbsp;
                          {item.competitionType == "Private" && (
                            <svg
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                d="M8 0.25C5.24609 0.25 3 2.49609 3 5.25V6.5H2.375C1.34473 6.5 0.5 7.34473 0.5 8.375V14.625C0.5 15.6553 1.34473 16.5 2.375 16.5H13.625C14.6553 16.5 15.5 15.6553 15.5 14.625V8.375C15.5 7.34473 14.6553 6.5 13.625 6.5H13V5.25C13 2.49609 10.7539 0.25 8 0.25ZM8 1.5C10.0801 1.5 11.75 3.16992 11.75 5.25V6.5H4.25V5.25C4.25 3.16992 5.91992 1.5 8 1.5ZM2.375 7.75H13.625C13.9766 7.75 14.25 8.02344 14.25 8.375V14.625C14.25 14.9766 13.9766 15.25 13.625 15.25H2.375C2.02344 15.25 1.75 14.9766 1.75 14.625V8.375C1.75 8.02344 2.02344 7.75 2.375 7.75Z"
                                fill="#8000FF"
                              />
                            </svg>
                          )}
                        </div>

                        {item?.username}
                      </div>
                    </td>
                    <td>{item?.dateRange.split(" ")[0]}</td>
                    <td>
                      {item?.dateRange.split(" ")[1] == "null"
                        ? "No End"
                        : item?.dateRange.split(" ")[1]}
                    </td>
                    <td>{item?.users?.length}</td>
                    <td>₦ {item?.startingCash.toFixed(2)}</td>
                    <td>
                      {/* <Link > */}
                      <a
                        onClick={() => joinGame(item?._id)}
                        className="border-bottom text--purple"
                        style={{ cursor: "pointer" }}
                      >
                        View Details
                      </a>
                      {/* </Link> */}
                    </td>
                    <td>
                      <div className="btn--group form--actions">
                        {/* <Link href="#"> */}
                        <a
                          className="btn form--submit"
                          onClick={() => handleJoin(item)}
                        >
                          {item.users.includes(user?.user?._id) ? (
                            <button>GO TO COMPETITION</button>
                          ) : (
                            <button>JOIN COMPETITION</button>
                          )}
                        </a>
                        {/* </Link> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <PreviewGameModel
          modelOpened={modelOpened}
          setModelOpened={setModelOpened}
          //   setShowTrade={setShowTrade}
          data={selectedData}
        />
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
    </>
  );
}
