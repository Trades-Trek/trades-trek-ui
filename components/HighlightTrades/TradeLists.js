import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function TradeLists(Props) {
    const [list,setList]=useState()
    const router=useRouter()

    useEffect(()=>{
        let {listData}=Props
        setList(listData)
    },[])
    const handleClick=(data)=>{
    
      // router.push('/dashboard/trade-stocks')
    }
    return (
      <>
        <li className="trade-box" onClick={()=>handleClick(list)}>
          <div className="trade--image">
            <Image
              src={list?.PerChange>=0?"/images/position-up.svg":"/images/position-down.svg"}
              layout="responsive"
              width={34}
              height={20}
              alt=""
            />
          </div>
          <div className="trade--detail">
            <p className="trade--name">{list?.Symbol ||""}</p>
            <p className="trade--position">{list?.PerChange>=0?`+ ${list?.PerChange?.toFixed(2)}%`:`${list?.PerChange?.toFixed(2)}%`}</p>
          </div>
        </li>
      </>
    );
}