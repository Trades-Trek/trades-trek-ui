import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { userService } from "../../services";

function UnsubscribeModel({ modelOpened, setModelOpened,id }) {
  const router = useRouter();

  const theme = useMantineTheme();
  const unsubscribePackage = (id) => {
          userService.cancelTransaction(id).then((res)=>{
                    if(res.success){
                         router.push('/dashboard')     
                    }

          }).catch((err)=>{
                    console.log(err)
          })

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
      }}
    >
      <div
      
      >
        <h2 style={{ textAlign: "center", margin: "20px 10px" }}>
          <b>Do you want to Unsubscribe from this package?</b>
        </h2>
       
        <div style={{border: "1px solid #c9cdd1",marginTop:"40px"}}>
          <button style={{width:"50%",borderRight: "0.5px solid #c9cdd1",padding:'10px'}}
            onClick={() => {
              setModelOpened(false);
              unsubscribePackage(id);
            }}
            className='done'
            // style={{ margin: "20px" }}
          >
            Yes
          </button>
          <button
            onClick={() => setModelOpened(false)}
            style={{width:"50%",borderRight: "0.5px solid #c9cdd1",padding:'10px'}}
            className='cancel'

          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default UnsubscribeModel;
