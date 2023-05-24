import { Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { stockService } from "../../services/stock.service";
import GainersData from "./GainersData";


export default function GainerView({showGainersList}) {
    const [GainersList,setGainersList]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(() => {
        setIsLoading(true)
        stockService.getTopGainer().then((res)=>{
           setGainersList(res?.data)
           setIsLoading(false)
        }).catch((err)=>{
            setGainersList([])
            setIsLoading(false)
           console.log(err)
        })
       }, [])
  
     
    return(
        <>
            <div className="card--style card--list--style">
                {isLoading?<div className="animated-background loserLoader">
            <div className="background-masker"></div></div>:<ul>
                    {showGainersList?GainersList?.map((data, index) => {
                        if(index <= 5){
                            return <GainersData key={index} listGainerData={data} />
                        }
                    }):GainersList?.map((data, index) => {
                        
                            return <GainersData key={index} listGainerData={data} />
                        
                    })}
                </ul>}
            </div>
        </>
    )
}

