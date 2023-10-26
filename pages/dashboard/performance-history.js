import { Loader } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import SelectGame from "../../components/SelectGame/SelectGame";

import Sidebar from "../../components/Sidebar/Sidebar";
import { DataConvert } from "../../helpers/DateTimeConverter";
import { userService } from "../../services";
import ExportExcel from "../../helpers/ExportExcel";
import performanceHistoryHeaders from '../../helpers/performanceHistoryHeaders'
import FormSpinner from "../../components/Spinners/FormSpinner";


export default function PerformanceHistory() {
  const [userHistoryData, setuserHistoryData] = useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [allPage,setAllPage]=useState(1)
  const [isLoading,setIsLoading]=useState(false)
  const [xlsxDownloading, setXlsxDownloading] = useState(false);

  let { user } = useSelector((state) => state.userWrapper);

  useEffect(() => {
    setIsLoading(true)
    userService
      .userPerformanceHistory(currentPage)
      .then((res) => {
        
        if (res.success) {
          setCurrentPage(res.history.page)
          setAllPage(res.history.pages)
          setuserHistoryData(res.history.docs);
        }else{
          setuserHistoryData([])
          setCurrentPage(1)
          setAllPage(1)
        }
        setIsLoading(false)

      })
      .catch((err) => console.log(err));
  }, [user]);
  const handlePageClick=({selected})=>{
    setIsLoading(true)
    userService
    .userPerformanceHistory(selected+1)
    .then((res) => {
      
      if (res.success) {
        setCurrentPage(res.history.page)
        setAllPage(res.history.pages)
        setuserHistoryData(res.history.docs);
      }else{
        setuserHistoryData([])
          setCurrentPage(1)
          setAllPage(1)
      }
      setIsLoading(false)

    })
    .catch((err) => console.log(err));
  }

  const downloadPerformanceHistory = async (str) => {
    try {
      const { success, history } = await userService.userPerformanceHistoryAll();
      if (success) {
        
        if(!history.length){
          alert("No record available for download");
          return
        }
        
        ExportExcel(performanceHistoryHeaders, history, "Performance_History_");
      }
      setXlsxDownloading(false);
    } catch (err) {
      setXlsxDownloading(false);
      alert('Download failed try again')
    }
  };
 
  const columns = [
    "Date",
    "Cash",
    "Stock Portfolio Value",
    "Shorted Stock Portfolio Value",
    "Margin Interest",
    "Cash Interest",
    "Account Value",
  ];
  return (
    <>
      <Sidebar />
      <div className="site--content">
        <div
          className="trade-data pageBack"
        >
          <Link href="/dashboard/portfolio">
            <a>
              Back to Portfolio
            </a>
          </Link>
        </div>
        <SelectGame />


        <div className="page--title--block">
          <p style={{ margin: "10px 0px" }}>Performance History</p>

          <div className="card-no-gap">
            <div className="trade-order-status">
             {isLoading?
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
            
             : <div className="order--table--responsive">
                {userHistoryData.length>0 ? (
                  <div>
                    <table className="order-table">
                      <thead>
                      <tr>
                        {columns.map((item,index) => {
                          return <th key={index}>{item}</th>;
                        })}
                      </tr>
                      </thead>
                    <tbody>
                    {userHistoryData.map((item,index) => (
                        <tr key={index}>
                          <td>{DataConvert(item.createdAt)}</td>
                          <td>{item.cash.toFixed(2)}</td>
                          <td>{item.stockPortfolio.toFixed(2)}</td>
                          <td>{item.shortedPortfolio.toFixed(2)}</td>
                          <td>{item.marginInterest?.toFixed(2)}</td>
                          <td>{item.cashInterest?.toFixed(2)}</td>
                          <td>{(item.cash + (item.stockPortfolio - item.shortedPortfolio)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                    
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "80vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1
                      style={{
                        color: "#8000ff",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Trade History Not Found
                    </h1>
                  </div>
                )}
              </div>}
             {allPage>1 && <div className="paginationReact">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">"
                      onPageChange={handlePageClick}
                      marginPagesDisplayed={2}
                      // pageRangeDisplayed={2}
                      pageCount={allPage}
                      previousLabel="<"
                      renderOnZeroPageCount={null}
                    />
                    </div>}

                    {xlsxDownloading ? (
                <Link href="javascript:void(0)">
                  <a className="btn spinnerBtn downloadButtonStyle">
                    <FormSpinner />
                  </a>
                </Link>
              ) : (
                <Link href="javascript:void(0)">
                  <a
                    className="btn downloadButtonStyle"
                   
                    onClick={() => {
                      setXlsxDownloading(true);
                      downloadPerformanceHistory("xlsx");
                    }}
                  >
                   Download
                  </a>
                </Link>
              )}  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
