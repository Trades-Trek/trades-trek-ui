import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment-timezone";
import ToolTipCustome from "../Competition/ToolTip";
import { userService } from "../../services";
import { setUser } from "../../actions/users";
import { toast, ToastContainer } from "react-toastify";
import { Loader, Modal, useMantineTheme } from "@mantine/core";
import getConfig from "next/config";

export default function Account() {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = `${publicRuntimeConfig.apiUrl}`;
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [modelOpened, setModelOpened] = useState(false);
  const [modelOpened1, setModelOpened1] = useState(false);
  const [modelOpened2, setModelOpened2] = useState(false);

  const [url, setUrl] = useState("");
  const theme = useMantineTheme();
  const { user } = useSelector((state) => state.userWrapper);
  const [status, setStaus] = useState(false);
  const dispatch = useDispatch();
  const [imageLoader, setImageLoader] = useState(true);
  const [clearLoading, setClearLoading] = useState(false);

  useEffect(() => {
    setStaus(user?.user?.allowNotification);
    setUrl(user?.user?.profilePic);
    setImageLoader(false);
  }, [user]);

  useEffect(() => {
    userService
      .userInfo()
      .then((res) => {
        if (res.success) {
          dispatch(setUser(res.data));
          setFirstName(res?.data?.user?.firstName || "");
          setLastName(res?.data?.user?.lastName || "");
          setPhone(res?.data?.user?.phone || "");
          setUrl(res?.data?.user?.baseUrl);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleStatus = (value) => {
    setStaus(value);
    userService
      .allowNotificationStatus(value)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const submit = async () => {
    if (!firstName) {
      return setFirstNameError("First Name is Required");
    } else if (firstName.length < 3) {
      return setFirstNameError("First Name should be atleast 3 characters");
    } else if (firstName.length > 20) {
      return setFirstNameError("First Name should be less than 20 characters");
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      return setLastNameError("Last Name is Required");
    } else if (lastName.length < 3) {
      return setLastNameError("Last Name should be atleast 3 characters");
    } else if (lastName.length > 20) {
      return setLastNameError("Last Name should be less than 20 characters");
    } else {
      setLastNameError("");
    }

    if (!phone) {
      return setPhoneError("Phone Number is Required");
    } else if (phone.length < 8) {
      return setPhoneError("Phone Number should be atleast 8 characters");
    } else if (phone.length > 15) {
      return setPhoneError("Last Name should be less than 16 characters");
    } else {
      setPhoneError("");
    }
    setModelOpened2(true);
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
      setModelOpened1(true);
    }
  };
  const handleImageUpload = (img) => {
    userService
      .updateProfile(img)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setModelOpened1(false);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const clearPhoto = () => {
    setClearLoading(true);
    userService
      .removeProfile()
      .then((res) => {
        if (res.success) {
          setUrl("");
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setModelOpened(false);
          setClearLoading(false);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setModelOpened(false);
          setClearLoading(false);
        }
      })
      .catch((err) => {
        setModelOpened(false);
        setClearLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleImagePresetOrNot = () => {
    if (user?.user?.profilePic) {
      setUrl(user?.user?.profilePic);
    } else {
      setUrl(null);
    }
    setModelOpened1(false);
  };
  const updateYourAccount = () => {
    setIsLoading(true);
    setModelOpened2(false);
    userService
      .updateAccount({ phone, firstName, lastName })
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsLoading(false);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card-no-gap p--20 pageHeight">
        <div className="block--title block--back--link text--left mb--64">
          <h1>Your Profile</h1>
        </div>
        {/* <form className="site--form"> */}
        <div className="profileDetail">
          <div className="profileLeftDetail">
            <input
              id="SelectPic"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleImage(e)}
              accept="image/png, image/jpeg"
            />
            <div className="mb--32 profileImage">
              {/* <div className="light--purple--circle1">{user?.user?.firstName[0]}</div> */}

              <img
                src={
                  url
                   
                }
              />
              {url ? (
                <label onClick={() => setModelOpened(true)}>
                  <div className="deleteProfile">
                    <svg width="22" height="22" viewBox="0 0 50 56" fill="none">
                      <path
                        d="M31.27 0.5C32.4243 0.500299 33.5493 0.863785 34.4856 1.53897C35.4219 2.21416 36.122 3.16681 36.4868 4.262L37.98 8.75H47C47.7293 8.75 48.4288 9.03973 48.9445 9.55546C49.4603 10.0712 49.75 10.7707 49.75 11.5C49.75 12.2293 49.4603 12.9288 48.9445 13.4445C48.4288 13.9603 47.7293 14.25 47 14.25L46.9917 14.4453L44.6075 47.8385C44.4587 49.9192 43.5272 51.8663 42.0006 53.2878C40.474 54.7093 38.4655 55.4998 36.3795 55.5H13.6205C11.5345 55.4998 9.52605 54.7093 7.99941 53.2878C6.47277 51.8663 5.5413 49.9192 5.3925 47.8385L3.00825 14.4425C3.00327 14.3784 3.00052 14.3142 3 14.25C2.27065 14.25 1.57118 13.9603 1.05546 13.4445C0.539731 12.9288 0.25 12.2293 0.25 11.5C0.25 10.7707 0.539731 10.0712 1.05546 9.55546C1.57118 9.03973 2.27065 8.75 3 8.75H12.02L13.5132 4.262C13.8782 3.16637 14.5787 2.21339 15.5155 1.53817C16.4523 0.86294 17.5779 0.499722 18.7327 0.5H31.27ZM41.4917 14.25H8.50825L10.8787 47.4452C10.9281 48.1388 11.2384 48.7879 11.7471 49.2619C12.2558 49.736 12.9252 49.9997 13.6205 50H36.3795C37.0748 49.9997 37.7442 49.736 38.2529 49.2619C38.7616 48.7879 39.0719 48.1388 39.1213 47.4452L41.4917 14.25ZM19.5 22.5C20.1736 22.5001 20.8237 22.7474 21.327 23.195C21.8304 23.6426 22.1519 24.2593 22.2308 24.9283L22.25 25.25V39C22.2492 39.7009 21.9808 40.3751 21.4997 40.8848C21.0185 41.3944 20.3609 41.7011 19.6612 41.7422C18.9614 41.7833 18.2725 41.5556 17.735 41.1058C17.1975 40.6559 16.852 40.0178 16.7692 39.3218L16.75 39V25.25C16.75 24.5207 17.0397 23.8212 17.5555 23.3055C18.0712 22.7897 18.7707 22.5 19.5 22.5ZM30.5 22.5C31.2293 22.5 31.9288 22.7897 32.4445 23.3055C32.9603 23.8212 33.25 24.5207 33.25 25.25V39C33.25 39.7293 32.9603 40.4288 32.4445 40.9445C31.9288 41.4603 31.2293 41.75 30.5 41.75C29.7707 41.75 29.0712 41.4603 28.5555 40.9445C28.0397 40.4288 27.75 39.7293 27.75 39V25.25C27.75 24.5207 28.0397 23.8212 28.5555 23.3055C29.0712 22.7897 29.7707 22.5 30.5 22.5ZM31.27 6H18.73L17.8143 8.75H32.1857L31.27 6Z"
                        fill="#f00"
                      />
                    </svg>
                  </div>
                </label>
              ) : null}
              <label htmlFor="SelectPic">
                <div className="changeProfile">
                  <svg width="25" height="25" viewBox="0 0 32 32" fill="none">
                    <g clipPath="url(#clip0_435_11941)">
                      <path
                        d="M12.5942 2.58105C11.514 2.58105 10.5099 3.14889 9.95396 4.07549L9.00416 5.6589H4.31646C2.34645 5.6589 0.734863 7.27049 0.734863 9.2405V23.0078C0.734863 24.9773 2.34645 26.5882 4.31646 26.5882H27.9329C29.9024 26.5882 31.5133 24.9766 31.5133 23.0066V9.2405C31.5133 7.27049 29.9017 5.6589 27.9317 5.6589H23.244L22.2918 4.07188C21.7372 3.14809 20.7365 2.58105 19.6588 2.58105H12.5942ZM16.1241 8.12117C20.5365 8.12117 24.1265 11.7112 24.1265 16.1236C24.1265 20.536 20.5365 24.1259 16.1241 24.1259C11.7117 24.1259 8.12169 20.536 8.12169 16.1236C8.12169 11.7112 11.7117 8.12117 16.1241 8.12117ZM16.1241 9.35231C12.3907 9.35231 9.35282 12.3901 9.35282 16.1236C9.35282 19.857 12.3907 22.8948 16.1241 22.8948C19.8575 22.8948 22.8953 19.857 22.8953 16.1236C22.8953 12.3901 19.8575 9.35231 16.1241 9.35231ZM16.1241 10.8912C19.0092 10.8912 21.3564 13.2384 21.3564 16.1236C21.3564 19.0087 19.0092 21.3559 16.1241 21.3559C13.2389 21.3559 10.8917 19.0087 10.8917 16.1236C10.8917 13.2384 13.2389 10.8912 16.1241 10.8912ZM16.1241 12.1224C15.0629 12.1224 14.0452 12.5439 13.2948 13.2943C12.5444 14.0447 12.1229 15.0624 12.1229 16.1236C12.1229 17.1847 12.5444 18.2025 13.2948 18.9528C14.0452 19.7032 15.0629 20.1248 16.1241 20.1248C17.1853 20.1248 18.203 19.7032 18.9533 18.9528C19.7037 18.2025 20.1253 17.1847 20.1253 16.1236C20.1253 15.0624 19.7037 14.0447 18.9533 13.2943C18.203 12.5439 17.1853 12.1224 16.1241 12.1224Z"
                        fill="#8000FF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_435_11941">
                        <rect
                          width="30.7784"
                          height="30.7784"
                          fill="white"
                          transform="translate(0.734863 0.734375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </label>
            </div>
            <form className="site--form">
              <div className="input--group">
                <div className="form--item">
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className="form--control"
                    // readOnly={true}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor="firstName" className="form--label">
                    First Name
                  </label>
                  <div className="invalid-feedback">
                    {firstNameError && firstNameError}
                  </div>
                </div>
                <div className="form--item">
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className="form--control"
                    // readOnly={true}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label htmlFor="lastName" className="form--label">
                    Last Name
                  </label>
                  <div className="invalid-feedback">
                    {lastNameError && lastNameError}
                  </div>
                </div>
              </div>
              <div className="input--group">
                <div className="form--item">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="form--control"
                    readOnly={true}
                    value={(user && user?.user?.username) || ""}
                  />
                  <label htmlFor="username" className="form--label">
                    Username
                  </label>
                </div>
                <div className="form--item">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="form--control"
                    readOnly={true}
                    onClick={(e) => {}}
                    value={(user && user?.user?.email) || ""}
                  />
                  <label htmlFor="email" className="form--label">
                    Email
                  </label>
                </div>
              </div>

              <div className="form--item ">
                <PhoneInput
                  className="form--control"
                  placeholder="Enter phone number"
                  value={phone}
                  country={"ng"}
                  enableSearch={true}
                  // disabled={true}
                  defaultCountry="NG"
                  onChange={(phone) => setPhone(phone)}
                />
                <div className="invalid-feedback">
                  {phoneError && phoneError}
                </div>
              </div>
              <div className="form--actions">
                <button
                  disabled={isLoading}
                  className="btn"
                  type="button"
                  onClick={submit}
                >
                  {isLoading ? <Loader color="#8000ff" /> : "Update"}
                </button>
              </div>
            </form>
          </div>
          <div className="profileRightDetail">
            <div className="flexBox justifyBetween referralNo">
              <h4 className="">Your Total Wallet Amount</h4>
              <h4 className="">
                ₦{" "}
                {user?.user?.walletAmount
                  ?.toFixed(2)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
              </h4>
            </div>
            <div className="flexBox justifyBetween referralNo">
              <h4 className="">Your Total Requested Amount</h4>
              <h4 className="">
                ₦{" "}
                {user?.user?.requestAmount
                  ?.toFixed(2)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
              </h4>
            </div>
            <div className="flexBox justifyBetween referralNo">
              <h4 className="">Your Total Withdraw Amount</h4>
              <h4 className="">
                ₦{" "}
                {user?.user?.withdrawAmount
                  ?.toFixed(2)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
              </h4>
            </div>
            <div className="flexBox justifyBetween referralNo">
              <h4 className="">Join Date</h4>
              <h4 className="">
                {moment(user?.user?.createdAt).format("lll")}
              </h4>
            </div>
            <div className="flexBox justifyBetween referralNo">
              <h4 className="">Subscription Expired Date</h4>
              <h4 className="">
                {user && user.user
                  ? user.user.subscriptionDuration === "free-lifetime"
                    ? "free-lifetime"
                    : moment(user.user.currentSubscriptionExpiryDate).format("lll")
                  : "Loading..."}
              </h4>
            </div>
          </div>
        </div>
        <Modal
          withCloseButton={false}
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={modelOpened}
          size="35%"
          centered={true}
          onClose={() => {
            setModelOpened(false);
          }}
        >
          <div>
            <h2 style={{ textAlign: "center", margin: "20px 10px" }}>
              <b>Do you want to Delete your Profile Picture ?</b>
            </h2>

            <div style={{ border: "1px solid #c9cdd1", marginTop: "40px" }}>
              {
                <button
                  style={{
                    width: "50%",
                    borderRight: "0.5px solid #c9cdd1",
                    padding: "10px",
                  }}
                  onClick={() => {
                    clearPhoto();
                  }}
                  disabled={clearLoading}
                  className="done"
                >
                  Yes
                </button>
              }

              <button
                onClick={() => setModelOpened(false)}
                style={{
                  width: "50%",
                  borderRight: "0.5px solid #c9cdd1",
                  padding: "10px",
                }}
                className="cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          withCloseButton={false}
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={modelOpened1}
          size="35%"
          centered={true}
          onClose={() => {
            setModelOpened1(false);
          }}
        >
          <div>
            <h2 style={{ textAlign: "center", margin: "20px 10px" }}>
              <b>Do you want to Update your Profile Picture ? </b>
            </h2>

            <div style={{ border: "1px solid #c9cdd1", marginTop: "40px" }}>
              {
                <button
                  style={{
                    width: "50%",
                    borderRight: "0.5px solid #c9cdd1",
                    padding: "10px",
                  }}
                  onClick={() => {
                    handleImageUpload(image);
                  }}
                  disabled={clearLoading}
                  className="done"
                >
                  Yes
                </button>
              }

              <button
                onClick={() => handleImagePresetOrNot()}
                style={{
                  width: "50%",
                  borderRight: "0.5px solid #c9cdd1",
                  padding: "10px",
                }}
                className="cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          withCloseButton={false}
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={modelOpened2}
          size="35%"
          centered={true}
          onClose={() => {
            setModelOpened2(false);
          }}
        >
          <div>
            <h2 style={{ textAlign: "center", margin: "20px 10px" }}>
              <b>Do you want to Update your Profile Account ? </b>
            </h2>

            <div style={{ border: "1px solid #c9cdd1", marginTop: "40px" }}>
              {
                <button
                  style={{
                    width: "50%",
                    borderRight: "0.5px solid #c9cdd1",
                    padding: "10px",
                  }}
                  onClick={() => {
                    updateYourAccount();
                  }}
                  disabled={clearLoading}
                  className="done"
                >
                  Yes
                </button>
              }

              <button
                onClick={() => setModelOpened2(false)}
                style={{
                  width: "50%",
                  borderRight: "0.5px solid #c9cdd1",
                  padding: "10px",
                }}
                className="cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        {/* </form> */}
      </div>
      <Footer />
    </>
  );
}
