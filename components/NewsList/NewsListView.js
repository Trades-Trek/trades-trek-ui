import React from "react";
import NewsListCard from "./NewsListCard";

export default function NewsListData({news}) {
    return (
      <>
        {news?.map((data, index) => {
          if (index <= 3) {
            return <NewsListCard key={index} listData={data} />
          }
        })}
      </>
    );
}

export const NewsListData2 = ({news}) => {
    return(
        <>
            {news?.map((data, index) => {
                return(
                    
                        <NewsListCard key={index} listData={data} />
                 
                )
            })}
        </>
    )
}