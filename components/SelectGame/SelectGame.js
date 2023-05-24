import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/users';
import { userService } from '../../services';

const  SelectGame = ({value}) => {
  const [beginnerOption, setBeginnerOption] = useState(false);
  const [game,setGame]=useState()
  const [gameId,setGameId]=useState()
 
  const dispatch = useDispatch();

  let { user } = useSelector((state) => state.userWrapper);
  useEffect(() => {
    setGame(user?.mygame)
    if(!localStorage.getItem('GameId') && user?.mygame?.length>0){
      localStorage.setItem('GameId',user?.mygame[0]?.gameId?._id)
      getInfo()
    }
  }, [user,user?.mygame])
  useEffect(()=>{
      setGameId(localStorage.getItem('GameId'))
      getInfo()
  },[gameId])

  const getInfo=()=>{
    userService
      .userInfo()
      .then((res) => {
      if(res.success ){
        dispatch(setUser(res.data));

      }
      // else
      //   if(router.asPath=='/dashboard/competition-summary/'){
      //     dispatch(setUser(res.message));
      //     router.push('/dashboard/subscription')
      //   }

      // // 
      
      }
      )
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className="grid-block-right right-align rightSelect">
    {/* <label>Current Competition</label> */}
    <select
            className="form--control"
            onChange={(e)=>{
              setGameId(e.target.value)
              localStorage.setItem('GameId',e.target.value)
            }}
            value={gameId}
            disabled={value}
          >
           {
            game?.map((item,index)=>{
              return <option key={index} value={item?.gameId?._id}  >{item?.gameId?.competitionName}</option>
            })
           }
          </select>
      
    </div>
  
  )
}

export default SelectGame