import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MarketOpenClose from "../components/MarketOpenClose/MarketOpenClose";
import { userService } from "../services";

const thankyou = () => {
  const [refrence, setrefrence] = useState();
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(false)
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    if (router.query.reference) {
      if(localStorage.getItem('token')){
 userService
        .verifyTransaction(router.query)
        .then((res) => {
          if(res.success){
            setLoading(false);
            console.log(res);
          }else{
            setError(true)
            setLoading(false);

          }
          
        })
        .catch((err) => {
          // console.log(error)
          setLoading(false);
        });
      }else{
        userService
        .withoutVerifyTransaction(router.query)
        .then((res) => {
          if(res.success){
            setLoading(false);
            console.log(res);
          }else{
            setError(true)
            setLoading(false);

          }
          
        })
        .catch((err) => {
          // console.log(error)
          setLoading(false);
        });
        
      }
   

     
    }
  }, [router.query]);
  return (
    <div>
      {/* <MarketOpenClose></MarketOpenClose> */}
      {loading === true ? (
        <div className="loading">
          <Loader color="#8000ff" />
        </div>
      ) : error?(
        <div className="errorthan">
          <div className="inside">
            <img src="/images/wrong.webp" />
          </div>
          <div className="mid">
            <img src="/images/star.webp" />
          </div>
          <div className="heading">
            <span>Transaction Failed!</span>
          </div>
          <div className="content">
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content.
            </p>
          </div>
          <div className="info--button" style={{ margin: "30px" }}>
            <Link href="/dashboard/trade-stocks">
              <a className="btn">Go App</a>
            </Link>
          </div>
        </div>
      ):(
        <div className="success">
          <div className="inside">
            <img src="/images/right.jpg" />
          </div>
          <div className="mid">
            <img src="/images/star.webp" />
          </div>
          <div className="heading">
            <span>Transaction Successfully!</span>
          </div>
          <div className="content">
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content.
            </p>
          </div>
          <div className="info--button" style={{ margin: "30px" }}>
            <Link href="/dashboard/trade-stocks">
              <a className="btn">Go App</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default thankyou;
