import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import Iframe from "react-iframe";

function PaymentPopup({ modelOpened, setModelOpened ,slug}) {


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
      size="100%"
      centered={true}
      onClose={() => {
        setModelOpened(false);
      }}
    >
      <div
      
      >
     <Iframe url={`https://paystack.com/pay/${slug}`}
        width="400px"
        height="520px"
        id=""
        className=""
        display="block"
        position="relative"/>
      
      </div>
    </Modal>
  );
}

export default PaymentPopup;
