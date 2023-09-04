import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { userService } from "../../services";
import Router, { withRouter } from "next/router";

function UnsubscribeModel({
  modelOpened,
  setModelOpened,
  setSubcriptionLink,
  subcriptionLink,
}) {
  const router = useRouter();

  const theme = useMantineTheme();

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
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", margin: "20px 10px" }}>
          <b>
            Do you want to Resubscribe to this package once your current plan
            expires?
          </b>
        </h2>

        <div style={{ border: "1px solid #c9cdd1", marginTop: "40px" }}>
          <button
            style={{
              width: "50%",
              borderRight: "0.5px solid #c9cdd1",
              padding: "10px",
            }}
            onClick={() => {
              setModelOpened(false);
              if (subcriptionLink) {
                Router.push(subcriptionLink);
              }
            }}
            className="done"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setSubcriptionLink("");
              setModelOpened(false);
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

export default UnsubscribeModel;
