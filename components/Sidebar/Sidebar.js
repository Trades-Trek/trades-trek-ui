import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import { setUser } from "../../actions/users";
import { userService } from "../../services/user.service";
import LogOutModal from "../Modal/LogoutModal";
import moment from "moment-timezone";
import NigerianTimeZone from "../../helpers/Negerian-TimeZone";
import { notificationService } from "../../services/notification.service";

// const ENDPOINT = "http://localhost:3232";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuCollapse, setMenuCollapse] = useState(false);
  let { user } = useSelector((state) => state.userWrapper);
  const [modelOpened, setModelOpened] = useState(false);
  const [todaytime, setTodayTime] = useState(new Date());
  const [count, setCount] = useState(0);
  const { openOrder } = useSelector((state) => state.openOrderWrapper);
  useEffect(() => {
    if (router.asPath != "/dashboard/trade-stocks/") {
      localStorage.setItem("indexTrade", 0);
    }
    if (router.asPath != "/dashboard/portfolio/") {
      localStorage.setItem("indexPort", 0);
    }
    if (router.asPath == "/dashboard/notifications/") {
      setCount(0);
    } else {
      notificationService
        .notificationCount()
        .then((res) => setCount(res.data))
        .catch((err) => console.log(err));
    }
  }, [router.asPath]);

  useEffect(() => {
    userService
      .userInfo()
      .then((res) => {
        if (res.success) {
          dispatch(setUser(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    var today = new Date();
    today.setMinutes(today.getMinutes() - 10);
    setTodayTime(today);
  }, []);

 
  useEffect(() => {
    document.body.classList.remove("otp--page");

    if (router.asPath == "/dashboard/competition-summary/" || router.asPath == "/dashboard/learning/") {
      if (user && user.user && user.user.subscriptionDuration) {
        if (user?.user?.subscriptionDuration === "free-lifetime")
         router.push("/dashboard/subscription");
      }
    }
  }, [router.asPath, user]);

  return (
    <>
      <div
        className={
          menuCollapse
            ? "sideBar--nav collapse--menu desktop--menu"
            : "sideBar--nav desktop--menu"
        }
      >
        <div
          className="burger--menu"
          onClick={() => setMenuCollapse(!menuCollapse)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="form--site--logo">
          <Link href="/">
            <a>
              <Image
                src="/images/purple--logo.svg"
                alt="responsive"
                layout="responsive"
                width={206}
                height={46}
              />
            </a>
          </Link>
        </div>
        <div className="site__nav">
          <ul className="menu__list">
            <li
              className={
                router.pathname == "/dashboard"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard">
                <a>
                  <span className="menu--icons">
                    <Image
                      className="menu--icons"
                      src="/images/home-icon.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Home"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      className="menu--icons--hover"
                      src="/images/home-icon--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Home"}
                    />
                  </span>{" "}
                  Home
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/portfolio"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard/portfolio">
                <a>
                  <span className="menu--icons">
                    <Image
                      className="menu--icons"
                      src="/images/portfolio-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Portfolio"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/portfolio-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Portfolio"}
                    />
                  </span>{" "}
                  Portfolio
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/trade-stocks"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard/trade-stocks">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/trade-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Trade"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/trade-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Trade"}
                    />
                  </span>{" "}
                  Trade
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/learning"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard/learning">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/learning-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Learning"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/learning-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Learning"}
                    />
                  </span>{" "}
                  Learning
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/competition-summary"
                  ? `menu__list--item active--menu `
                  : `menu__list--item  `
              }
            >
              <Link href="/dashboard/competition-summary">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/competition-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Competition"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/competition-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Competition"}
                    />
                  </span>{" "}
                  Competition
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/subscription"
                  ? `menu__list--item active--menu `
                  : `menu__list--item  `
              }
            >
              <Link href="/dashboard/subscription">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/subscription.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Subscription"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/subscription--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Subscription"}
                    />
                  </span>{" "}
                  Subscription
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/notifications"
                  ? `menu__list--item active--menu `
                  : `menu__list--item  `
              }
            >
              <Link href="/dashboard/notifications">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/notification-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Notification"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/notification-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Notification"}
                    />
                  </span>
                  Notifications
                  {count > 0 && (
                    <span className="noti--status noti-count">{count}</span>
                  )}
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/profile"
                  ? `menu__list--item active--menu `
                  : `menu__list--item  `
              }
            >
              <Link href="/dashboard/profile">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/profile-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Profile"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      className="menu--icons--hover"
                      src="/images/profile-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Profile"}
                    />
                  </span>
                  Profile
                </a>
              </Link>
            </li>

            <li className="menu__list--item">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModelOpened(true);
                }}
              >
                <span className="menu--icons">
                  <Image
                    src="/images/logout-menu.svg"
                    layout="responsive"
                    width={24}
                    height={24}
                    alt={"Logout"}
                  />
                </span>
                <span className="menu--icons--hover">
                  <Image
                    src="/images/logout-menu--hover.svg"
                    layout="responsive"
                    width={24}
                    height={24}
                    alt={"Logout"}
                  />
                </span>
                Logout
              </a>
            </li>
            <LogOutModal
              modelOpened={modelOpened}
              setModelOpened={setModelOpened}
            />
          </ul>
        </div>
        {/* <div className="site__nav--bottom">
          <ul className="menu__list">
            <li   className={
                router.pathname == '/dashboard/notifications'
                  ? `menu__list--item active--menu `
                  : `menu__list--item  `}
>
              <Link href="/dashboard/notifications">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/notification-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={'Notification'}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/notification-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={'Notification'}
                    />
                  </span>
                  Notifications
                  {count>0 &&<span className="noti--status">{count}</span>}
                </a>
              </Link>
            </li>
            <li  className={
                router.pathname == '/dashboard/profile'
                  ? `menu__list--item active--menu `
                  : `menu__list--item  `}>
              <Link href="/dashboard/profile">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/profile-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={'Profile'}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      className="menu--icons--hover"
                      src="/images/profile-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={'Profile'}
                    />
                  </span>
                  Profile
                </a>
              </Link>
            </li>

            <li className="menu__list--item">
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setModelOpened(true);
                }}
              >
                <span className="menu--icons">
                  <Image
                    src="/images/logout-menu.svg"
                    layout="responsive"
                    width={24}
                    height={24}
                    alt={'Logout'}
                  />
                </span>
                <span className="menu--icons--hover">
                  <Image
                    src="/images/logout-menu--hover.svg"
                    layout="responsive"
                    width={24}
                    height={24}
                    alt={'Logout'}
                  />
                </span>
                Logout
              </a>
            </li>
            <LogOutModal
              modelOpened={modelOpened}
              setModelOpened={setModelOpened}
            />
          </ul>
        </div>  */}
      </div>

      <div className="mobile--menu">
        <div className="form--site--logo">
          <Link href="/">
            <a>
              <Image
                src="/images/purple--logo.svg"
                alt="responsive"
                layout="responsive"
                width={206}
                height={46}
              />
            </a>
          </Link>
        </div>
        <Menu right>
          <ul className="menu__list">
            <li
              className={
                router.pathname == "/dashboard"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard">
                <a>
                  <span className="menu--icons">
                    <Image
                      className="menu--icons"
                      src="/images/home-icon.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Home"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      className="menu--icons--hover"
                      src="/images/home-icon--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Home"}
                    />
                  </span>{" "}
                  Home
                  {/* <p onClick={() => Login()}>Time </p> */}
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/portfolio"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard/portfolio">
                <a>
                  <span className="menu--icons">
                    <Image
                      className="menu--icons"
                      src="/images/portfolio-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Portfolio"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/portfolio-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Portfolio"}
                    />
                  </span>{" "}
                  Portfolio
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/trade-stocks"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard/trade-stocks">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/trade-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Trade"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/trade-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Trade"}
                    />
                  </span>{" "}
                  Trade
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/learning"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard/learning">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/learning-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Learning"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/learning-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Learning"}
                    />
                  </span>{" "}
                  Learning
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/competition-summary"
                  ? "menu__list--item active--menu"
                  : "menu__list--item"
              }
            >
              <Link href="/dashboard/competition-summary">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/competition-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Competition"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/competition-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Competition"}
                    />
                  </span>{" "}
                  Competition
                </a>
              </Link>
            </li>
            <li className="menu__list--item">
              <Link href="/dashboard/notifications">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/notification-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Notification"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/notification-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Notification"}
                    />
                  </span>
                  Notifications
                  {count > 0 && (
                    <span className="noti--status noti-count">{count}</span>
                  )}
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == "/dashboard/subscription"
                  ? `menu__list--item active--menu `
                  : `menu__list--item  `
              }
            >
              <Link href="/dashboard/subscription">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/subscription.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Subscription"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      src="/images/subscription--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Subscription"}
                    />
                  </span>{" "}
                  Subscription
                </a>
              </Link>
            </li>
            <li className="menu__list--item">
              <Link href="/dashboard/profile">
                <a>
                  <span className="menu--icons">
                    <Image
                      src="/images/profile-menu.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Profile"}
                    />
                  </span>
                  <span className="menu--icons--hover">
                    <Image
                      className="menu--icons--hover"
                      src="/images/profile-menu--hover.svg"
                      layout="responsive"
                      width={24}
                      height={24}
                      alt={"Profile"}
                    />
                  </span>
                  Profile
                </a>
              </Link>
            </li>
            <li className="menu__list--item">
              {/* <Link href="/logout"> */}
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModelOpened(true);
                }}
              >
                <span className="menu--icons">
                  <Image
                    src="/images/logout-menu.svg"
                    layout="responsive"
                    width={24}
                    height={24}
                    alt={"Logout"}
                  />
                </span>
                <span className="menu--icons--hover">
                  <Image
                    src="/images/logout-menu--hover.svg"
                    layout="responsive"
                    width={24}
                    height={24}
                    alt={"Logout"}
                  />
                </span>
                Logout
              </a>
              {/* </Link> */}
            </li>
            <LogOutModal
              modelOpened={modelOpened}
              setModelOpened={setModelOpened}
            />
          </ul>
        </Menu>
      </div>
    </>
  );
}
