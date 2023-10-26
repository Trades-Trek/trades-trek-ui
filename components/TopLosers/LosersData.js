import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function LosersData(Props) {
    const [LoserList, setLoserList] = useState()
    const router=useRouter()

    useEffect(() => {
        let {listLoserData} = Props
        setLoserList(listLoserData)
    })
    const handleClick=(data)=>{
      router.push(`/dashboard/learning/?tab=stockdetails&symbol=${data.Symbol}`)
    }
    return (
      <>
        <li className="stock-box" onClick={()=>handleClick(LoserList)}>
          <div className="stock--detail">
            <div className="light--purple--circle">{LoserList?.Name[0]}</div>
            <div>
              {LoserList?.Symbol && (
                <p className="stock--title">{LoserList?.Symbol}</p>
              )}
              {LoserList?.Name && (
                <p className="stock--sub--title">{LoserList?.Name}</p>
              )}
            </div>
          </div>
          <div className="stock--positions loser--stock--position">
            {LoserList?.Last && (
              <div className="stock--dat">{LoserList?.Last}</div>
            )}
            <div>
            
                <p className="stock--position">{LoserList?.PerChange?.toFixed(2)}%</p>
            
             
                <p className="stock--subposition">
                {LoserList?.Change?.toFixed(2)}
                </p>
             
            </div>
          </div>
        </li>
      </>
    );
}