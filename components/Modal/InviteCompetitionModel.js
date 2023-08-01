import { Modal, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gameService } from "../../services/game.service";
import { toast, ToastContainer } from "react-toastify";
import ToolTipCustome from "../Competition/ToolTip";

function InviteCompetitionModel({ modelOpened, setModelOpened, id, data }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");
  const [password, setPasswod] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const theme = useMantineTheme();
  //   const LogoutUser = () => {
  //     router.push("/logout");
  //   };

  useEffect(() => {
    if (!modelOpened) {
      setEmail("");
      setEmails([]);
      setError("");
      setPasswordError("");
      setPasswod("");
      setShowPassword(false);
    }
  }, [modelOpened]);

  const handleEmail = (e) => {
    if (e.key === "Enter") {
      if (
        !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
          email
        )
      ) {
        setError("Invalid Email");
      } else {
        if (!emails.includes(email)) {
          setEmails((prev) => [...prev, email]);
          setEmail("");
          setError("");
        } else {
          setError("Already Added");
        }
      }
    }
  };
  const handleDelete = (name) => {
    const tmp = emails.filter((item) => item !== name);
    setEmails(tmp);
  };
  const handlePasswod = (e) => {
    setPasswod(e.target.value);

    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[@$#!%*?_&])([a-zA-Z0-9@$#!%*?_&]{8,})$/.test(
        e.target.value
      )
    ) {
      setPasswordError(
        "Password must be alphanumeric with at least one special character and must be 8 characters"
      );

      return false;
    } else {
      setPasswordError("");

      return true;
    }
  };
  const InviteGame = () => {
    let formdata = {
      emails: emails,
      gameId: data[0]?._id,
    };
    if (data[0].competitionType == "Private") {
      formdata.password = password;
    }

    gameService
      .inviteGame(formdata)
      .then((res) => {
        if (res.success == false) {
          setError(res.message);
        } else {
          setError();
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setModelOpened(false);
        }
      })
      .catch((err) => console.log(err));
    // setModelOpened(false);
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
          <span className="itemAlign">
            <b>Enter email to invite friends?</b>
            <ToolTipCustome
              text={`Enter email and press enter key to activate send button or enter  additional email(s)`}
            />
          </span>
        </h2>
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid red",
              color: "red",
            }}
          >
            <p>{error}</p>
          </div>
        )}
        {/* <p style={{ textAlign: "center", margin: "20px 10px" }}>
          Type emails with comma(,) separated
        </p> */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {emails.map((item) => {
            return (
              <div
                style={{
                  color: "white",
                  margin: "5px",
                  background: "#8000ff",
                  padding: "5px 0px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                }}
              >
                <span>
                  {item}{" "}
                  <span
                    onClick={() => handleDelete(item)}
                    style={{
                      background: "white",
                      color: "#8000ff",
                      padding: "5px 8px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        <div className="inputEmail">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => handleEmail(e)}
            placeholder="Enter Email"
          />
        </div>
        {data[0]?.competitionType == "Private" && (
          <div className="form--item">
            <label className="form--label" htmlFor="email">
              PRIVATE GAME
            </label>
            <div>
              <input
                className="form--control"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={handlePasswod}
                style={{
                  width: "100%",
                  padding: "5px 10px",
                  border: " 3px solid #e0e0e0",
                }}
              />
              {showPassword ? (
                <img
                  src="/images/view.png"
                  className="passwordView"
                  style={{ display: "inline", height: "25px" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <img
                  style={{ display: "inline", height: "25px" }}
                  onClick={() => setShowPassword(!showPassword)}
                  src="/images/invisible.png"
                  className="passwordView"
                />
              )}
              {passwordError && (
                <div
                  className=""
                  style={{ border: "1px solid red", margin: "20px" }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "red",
                    }}
                  >
                    {passwordError}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div style={{ border: "1px solid #c9cdd1", marginTop: "40px" }}>
          <button
            style={
              emails.length !== 0
                ? {
                    background: "#8000FF",
                    color: "white",
                    width: "50%",
                    borderRight: "0.5px solid #c9cdd1",
                    padding: "10px",
                  }
                : {
                    width: "50%",
                    borderRight: "0.5px solid #c9cdd1",
                    padding: "10px",
                  }
            }
            onClick={() => {
              InviteGame();
            }}
            className="done"
            disabled={emails.length == 0}
            // style={{ margin: "20px" }}
          >
            Send
          </button>
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
    </>
  );
}

export default InviteCompetitionModel;
