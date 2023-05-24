import React, { useEffect, useState } from "react";

export default function LeadersData(Props) {
    const [LeaderList, setLeaderList] = useState()

    useEffect(() => {
        let {listLeaderData} = Props
        setLeaderList(listLeaderData)
    })
    return (
      <>
        <tr>
          <td>{LeaderList?.Sector}</td>
          <td>{LeaderList?.MAKTCAP}</td>
          <td>{LeaderList?.DivYeild}</td>
          <td className={LeaderList?.ChangeClass}>{LeaderList?.Changepercent}</td>
        </tr>
      </>
    );
}