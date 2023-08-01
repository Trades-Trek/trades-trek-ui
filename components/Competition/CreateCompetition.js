import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NigerianCurrentTimeZone from "../../helpers/NegerianCurrentTime";
import NigerianDateConverter from "../../helpers/NegerianDateConverter";
import { gameService } from "../../services/game.service";

import ToolTipCustome from "./ToolTip";
export default function CreateCompetation() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading,setIsLoading]=useState(false)

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startingCash: "100000",
      marketDelay: "15",
      quickSell:'15',
      dailyVolume:"10",
      endDate: null,
    },
  });
  const onSubmit = async (data) => {
    setIsLoading(true)
    gameService
      .createGame(data)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("GameId", res.data._id);
          router.push("/dashboard/portfolio");
          setError("");
          setIsLoading(false)
        } else {
          setError(res.message);
          setIsLoading(false)

        }
       
      })
      .catch((err) => console.log(err));
    
  };
  return (
    <>
      <div className="createCompeation">
        {error && (
          <div
            style={{
              textAlign: "center",
              margin: "22px",
              padding: "10px 25px",
              border: "2px solid red",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}
        <form className="site--form" onSubmit={handleSubmit(onSubmit)}>
          <div className="trendingBlock">
            <div className="formTitle px-32">
              <h4 className="font-18 font--bold">
                Competition NAME & BASIC TRADING RULES
              </h4>
              <p>
                These settings cannot be changed once the competition has been
                created.
              </p>
            </div>
            <div className="grid__2 px-32">
              <div className="colLeftBlock">
                <div className="form--item">
                  <label className="form--label">Competition Name</label>

                  <input
                    className={`form--control ${
                      errors.competitionName ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="competitionName"
                    placeholder="Enter competition name here"
                    {...register("competitionName", {
                      required: true,
                      maxLength: 30,
                      minLength: 10,
                    })}
                  />

                  <div className="invalid-feedback">
                    {errors.competitionName?.type === "required" &&
                      "Competition Name is required"}
                    {errors.competitionName?.type === "minLength" &&
                      "Competition Name should be at least 10 characters"}
                    {errors.competitionName?.type === "maxLength" &&
                      "Competition Name should be less than 30 characters"}
                  </div>
                </div>
                <div className="form--item">
                  <label className="form--label">Competition Description</label>

                  <textarea
                    className={`form--control ${
                      errors.competitionDescription ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="competitionDescription"
                    placeholder="Enter competition name here"
                    {...register("competitionDescription", {
                      required: true,
                      maxLength: 70,
                      minLength: 20,
                    })}
                  />

                  <div className="invalid-feedback">
                    {errors.competitionDescription?.type === "required" &&
                      "Competition Description is required"}
                    {errors.competitionDescription?.type === "minLength" &&
                      "Competition Description should be at least 20 characters"}
                    {errors.competitionDescription?.type === "maxLength" &&
                      "Competition Description should be less than 70 characters"}
                  </div>
                </div>

                {watch("competitionType") == "Private" ? (
                  <div className="form--item ">
                    <label className="form--label">Password</label>

                    <div style={{ display: "flex" }}>
                      <input
                        style={{ width: "100%" }}
                        className={`form--control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        type={showPassword ? "text" : "password"}
                        id="pwd"
                        placeholder="Password"
                        {...register("password", {
                          required: true,
                          maxLength: 15,
                          minLength: 8,

                          pattern: {
                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[@$#!%*?_&])([a-zA-Z0-9@$#!%*?_&]{8,})$/,
                          },
                        })}
                      />
                      {showPassword ? (
                        <img
                          src="/images/view.png"
                          className="passwordView"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <img
                          onClick={() => setShowPassword(!showPassword)}
                          src="/images/invisible.png"
                          className="passwordView"
                        />
                      )}
                    </div>

                    <div className="invalid-feedback">
                      {errors.password?.type === "required" &&
                        "Password is required"}
                      {errors.password?.type === "minLength" &&
                        "Password must contain at least 8 characters"}
                      {errors.password?.type === "maxLength" &&
                        "Password should be less than 15 characters"}
                      {errors.password?.type === "pattern" &&
                        "Password must be alphanumeric with at least one special character"}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="colRightBlock">
                <div className="form--item">
                  <label className="form--label">Competition Type</label>
                  <select
                    {...register("competitionType")}
                    className="form--control"
                  >
                    <option value="Public">Public Competition</option>
                    <option value="Private">Private Competition</option>
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Starting Cash
                   <ToolTipCustome text='The total amount of cash users begin trading with.'/>
                  </label>
                  <select
                    {...register("startingCash")}
                    className="form--control"
                  >
                    <option value="1000000">₦ 1,000,000</option>

                    <option value="500000">₦ 500,000</option>

                    <option value="250000">₦ 250,000</option>

                    <option value="100000">₦ 100,000</option>

                    <option value="50000">₦ 50,000</option>

                    <option value="25000">₦ 25,000</option>

                    <option value="10000">₦ 10,000</option>
                    <option value="1000">₦ 1,000</option>
                  </select>
                </div>
                <div className="form--item toggle">
                  <label className="form--label withIcon">
                    Allow Trading with margin?
                    <ToolTipCustome text="The Simulator lets you borrow 50% of the value of long equity positions (regular stock). However, the amount you can borrow is offset by short positions. (You are required to have 150% of the short)."/>
                    
                  </label>
                  <div className="box_1">
                    <input
                      {...register("allowTradingWithMargin")}
                      type="checkbox"
                      className="switch_1"
                    />
                  </div>
                </div>
                <div className="form--item toggle">
                  <label className="form--label withIcon">
                    Allow Short Selling?
                    <ToolTipCustome text={`Short selling is an investment or trading strategy that speculates on the decline in a stock or other security's price.`} />
                  </label>
                  <div className="box_1">
                    <input
                      {...register("allowShortSelling")}
                      type="checkbox"
                      className="switch_1"
                    />
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          <div className="trendingBlock">
            <div className="grid__2 px-32">
              <div className="colLeftBlock">
                <h4 className="font-18 font--bold">BASIC COMPETITION RULES</h4>
                <p>
                  Basic game rules can be modified after the game is created.
                </p>
                <div className="form--item error-msg">
                  <label className="form--label">Game Start Date</label>
                  <input
                    {...register("startDate", { required: true })}
                    className="form--control"
                    type="date"
                    min={NigerianCurrentTimeZone()}
                  />
                  
                  <div className="invalid-feedback">
                    {errors.startDate?.type === "required" &&
                      "Start Date is required"}
                  </div>
                </div>
                {console.log(watch("startDate"))}
                <div className="form--item error-msg">
                  <label className="form--label">Game End Date</label>
                  <input
                    {...register("endDate")}
                    className="form--control"
                    type="date"
                    disabled={!watch("startDate")}
                    min={NigerianDateConverter(watch("startDate"))}
                  />
                </div>
              </div>
              <div className="colRightBlock">
                <div className="form--item toggle">
                  <label className="form--label withIcon">
                    Allow Late Entry
                   <ToolTipCustome text={`This setting dictates when users are allowed to join a game. Not allowing late entry will prevent new users from joining the game after the game has already started.`} />
                  </label>
                  <div className="box_1">
                    <input
                      {...register("allowLateEntry")}
                      type="checkbox"
                      className="switch_1"
                    />
                  </div>
                </div>
                <div className="form--item toggle">
                  <label className="form--label withIcon">
                    Allow Portfolio Viewing?
                    <ToolTipCustome  text={`This setting determines whether users in a game are allowed to view each other’s portfolio via the rankings page.`}/>
                  </label>
                  <div className="box_1">
                    <input
                      {...register("allowPortfolioViewing")}
                      type="checkbox"
                      className="switch_1"
                    />
                  </div>
                </div>
                <div className="form--item toggle">
                  <label className="form--label withIcon">
                    Allow Portfolio Resetting?
                   <ToolTipCustome text={`This setting determines whether users have the capability to reset their portfolios back to their beginning state.`} />
                  </label>
                  <div className="box_1">
                    <input
                      {...register("allowPortfolioResetting")}
                      type="checkbox"
                      className="switch_1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="trendingBlock">
            <div className="formTitle px-32">
              <h4 className="font-18 font--bold">ADVANCED COMPETITION RULES</h4>
              <p>
                Some advanced game rules can be modified after the game is
                created.
              </p>
            </div>
            <div className="grid__2 px-32">
              <div className="colLeftBlock">
                <div className="form--item">
                  <label className="form--label withIcon">
                    Market Delay
                   <ToolTipCustome text={`Because we use a 15 minute delayed datafeed, it is necessary to hold market orders for a certain time before being filled. We strongly recommend that this be set to 15.`} />
                  </label>
                  <select
                    {...register("marketDelay")}
                    className="form--control"
                  >
                    {Array.from({ length: 20 }, (_, i) => {
                      return <option key={i} value={i + 1}>{i + 1} minutes</option>;
                    })}
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Daily Volume
                    <ToolTipCustome text={`Trades cannot exceed a certain percentage of volume for the day. The default value is 10% and this applies to both stocks and options. This prevents a thinly-traded stock from being traded in the simulator when it can't be traded in the actual markets.`} />
                  </label>
                  <select
                    {...register("dailyVolume")}
                    className="form--control"
                  >
                    <option value="Disabled">Disabled</option>
                    {Array.from({ length: 20 }, (_, i) => {
                      return (
                        <option key={i} value={(i + 1) * 5}>{(i + 1) * 5} %</option>
                      );
                    })}
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Quick Sell
                    <ToolTipCustome text={`You cannot sell a security within a certain time period to reflect the fact that we are working with delayed data. The default value is 15 minutes. This is our way of ensuring that users don't "cheat" by trading in and out of a stock using real-time data.`} />
                  </label>
                  <select {...register("quickSell")} className="form--control">
                    <option value="Disabled">Disabled</option>

                    {Array.from({ length: 32 }, (_, i) => {
                      return (
                        <option key={i} value={(i + 1) * 15}>
                          {(i + 1) * 15} minutes
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Minimum Price
                    <ToolTipCustome text={`The minimum price per share for a stock to be allowed.`} />
                  </label>
                  <select
                    {...register("minimumPrice")}
                    className="form--control"
                  >
                    <option value="Disabled">Disabled</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      return (
                        <option key={i} value={i + 1}>₦ {(i + 1).toFixed(2)}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Minimum Price Short
                    <ToolTipCustome text={`The minimum price per share for a stock to be allowed in short selling.`} />
                  </label>
                  <select
                    {...register("minimumPriceShort")}
                    className="form--control"
                  >
                    <option value="Disabled">Disabled</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      return (
                        <option key={i} value={i + 1}>₦ {(i + 1).toFixed(2)}</option>
                      );
                    })}
                  </select>
                </div>
                
              </div>
              <div className="colRightBlock">
              <div className="form--item">
                  <label className="form--label withIcon">
                    Minimum Stock for Margin
                    <ToolTipCustome text={`The minimum dollar amount that allows a security to be marginable.`} />
                  </label>
                  <select
                    {...register("minimumStockForMargin")}
                    className="form--control"
                  >
                    <option value="Disabled">Disabled</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      return (
                        <option key={i} value={i + 1}>₦ {(i + 1).toFixed(2)}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Commission
                   <ToolTipCustome text={`The commission for market transactions.`} />
                  </label>
                  <select {...register("commission")} className="form--control">
                    <option value="Disabled">Disabled</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      return (
                        <option key={i} value={i + 0.99}>
                          ₦ {(i + 0.99).toFixed(2)}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Margin Intrest
                   <ToolTipCustome text={`Margin interest rate.`} />
                  </label>
                  <select
                    {...register("marginInterest")}
                    className="form--control"
                  >
                    <option value="Disabled">Disabled</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      return (
                        <option key={i} value={(i + 1) * 10}>{(i + 1) * 10} %</option>
                      );
                    })}
                  </select>
                </div>
                <div className="form--item">
                  <label className="form--label withIcon">
                    Cash Interest
                   <ToolTipCustome text={`Cash interest rate.`} />
                    
                  </label>
                  <select
                    {...register("cashInterest")}
                    className="form--control"
                  >
                    <option value="Disabled">Disabled</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      return (
                        <option key={i} value={(i + 1) * 10}>{(i + 1) * 10} %</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="form--actions">
            <button disabled={isLoading} className="btn" type="submit">
            {isLoading?<Loader color="#8000ff" />: "Create Competition"}
              
            </button>
          </div>
          {/* <div className="form--actions">
            <Link href="/dashboard/join-competation-confirm-popup">
              <button type="submit" className="btn btnBgBlue">
                Create Competation
              </button>
            </Link>
          </div> */}
        </form>
      </div>
    </>
  );
}
