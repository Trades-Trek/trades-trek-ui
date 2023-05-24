import getConfig from 'next/config';
import React from 'react'

const FullCard = ({item}) => {
  
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
  return (
    <div className='FullCard'>
      <div className='learningCard'>
        <div className='cardTitle'>
          <div className='cardIcon'>
           <img  src={`${baseUrl}/${item.filePath}`}/>
          </div>
          <h4>{item?.categoryName}</h4>
        </div>
        <div className='cardText blueText'>
        {item?.result?.map((data) => {
            return (
              <p>
                <a target="_blank" href={data?.url}>
                  {data?.title}
                </a>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default FullCard