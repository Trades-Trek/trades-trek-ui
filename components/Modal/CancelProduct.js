import { Modal, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { orderService } from "../../services/order.service";
import { useDispatch } from "react-redux";
import { setOpenStock } from "../../actions/openOrder";
import PropTypes from "prop-types";
function CancelProduct({ modelOpened, setModelOpened, id }) {
  const router = useRouter();
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const cancelOrder = (id) => {
    orderService
      .cancelOrder(id)
      .then((res) => {
        setModelOpened(false);
        orderService
          .getPendingOrders(1)
          .then((res) => {
            if (res.success) {
              dispatch(setOpenStock(res.pendings.docs));
            } else {
              dispatch(setOpenStock([]));
            }
          })
          .catch((err) => console.log(err));
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
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", margin: "20px 10px" }}>
          <b>Do you want to Cancel Trade</b>
        </h2>

        <div style={{ border: "1px solid #c9cdd1", marginTop: "40px" }}>
          <button
            style={{
              width: "50%",
              borderRight: "0.5px solid #c9cdd1",
              padding: "10px",
            }}
            onClick={() => {
              cancelOrder(id);
            }}
            className="done"
          >
            Yes
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
  );
}
CancelProduct.propTypes={
  modelOpened:PropTypes.bool,
  setModelOpened:PropTypes.func,
  id:PropTypes.string
}
export default CancelProduct;
