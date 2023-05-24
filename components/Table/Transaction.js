import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";


import moment from "moment";


export default function Transaction({transactionList}) {
  
  const [pendingAllPage, setPendingAllPage] = useState(1);

  let { user } = useSelector((state) => state.userWrapper);

  const columns = [
    "Account Name",
    "Account Number",
    "Bank Name",
    "Request Amount",
    "Status",
    "Reason",
    "Request Time",
    "Last Update",
   
  ];

 


  return (
    <div className="trade-order-status">

      {transactionList && transactionList.length>0 && (
        <div className="order--table--responsive">
          <table className="order-table">
           <thead style={{background:"#8000ff",color:"white"}}>
           <tr>
              {columns.map((item,index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
           </thead>
           <tbody>
           {transactionList?.map((item,index) => {
              return (
                <tr key={index}>
                <td>{item?.accountName}</td>
                <td>{item?.accountNumber}</td>
                <td>{item?.bankName}</td>
                <td>{item?.reqAmount?.toFixed(2)}</td>
                <td>{item?.status}</td>
                <td>{item?.reason||""}</td>
                <td>{moment(item.createdAt).format("lll")}</td>
                <td>{moment(item.updatedAt).format("lll")}</td>




                </tr>
              );
            })}
           </tbody>
          </table>
        
        </div>
      )}
    </div>
  );
}
