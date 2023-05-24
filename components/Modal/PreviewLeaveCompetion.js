import { Modal, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { gameService } from "../../services/game.service";
import { userService } from "../../services";
import { setUser } from "../../actions/users";

function PreviewLeaveCompetition({ modelOpened, setModelOpened, id }) {
  const [error, setError] = useState("");

  const router = useRouter();
  const theme = useMantineTheme();
  const dispatch=useDispatch()
  const portfolioReset = (id) => {
    gameService
      .leaveCompetion(id)
      .then((res) => {
        if (res.success) {
          if (localStorage.getItem("GameId") == id) {
            localStorage.removeItem("GameId");
          }
    
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
          setModelOpened(false);
          setError("");
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
        setError("");
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", margin: "20px 10px" }}>
          <b>Are you sure you want to leave this competition?</b>
        </h2>
        <p>Leaving this game will cause your portfolio to be permanently deleted.</p>
        {error && (
          <h2
            style={{
              textAlign: "center",
              margin: "20px 10px",
              border: "1px solid red",
            }}
          >
            <b>{error}</b>
          </h2>
        )}

        <div style={{ border: "1px solid #c9cdd1", marginTop: "40px" }}>
          <button
            style={{
              width: "50%",
              borderRight: "0.5px solid #c9cdd1",
              padding: "10px",
            }}
            onClick={() => {
              portfolioReset(id);
            }}
            className="done"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setModelOpened(false);
              setError("");
            }}
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
  );
}

export default PreviewLeaveCompetition;
