import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "timeago-react";

export default function NewsListCard(Props) {
    const [newsList, setNewsList] = useState()

    useEffect(() => {
        let {listData} = Props
        setNewsList(listData)
    },[])
    return (
      <>
        <div className="card--style">
          
            <p className="card--title--label label--purple">{<TimeAgo
              datetime={newsList?.DATE}
              // locale='zh_CN'
            />}</p>
          <img src={newsList?.ImageURL} />
          
          {newsList?.Title && (
            <p className="card--title newsTitle">{newsList?.Title}</p>
          )}
          {newsList?.Snippet && (
            <p className="card--title newsTitle">{newsList?.Snippet}</p>
          )}
          
            <p className="card--title--label label--purple">Author :-               {newsList?.Author}
            </p>
            <p className="card--title--label label--purple">Source :-               {newsList?.Source}
            </p>
          
          <button><a href={newsList?.URL} target='_blank'>See more</a></button>
        </div>
      </>
    );
}