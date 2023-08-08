import { useState, useEffect } from 'react';
import { orderService } from "../services/order.service";

const useAccountValue = (user) => {
  const [holdingCurrent, setHoldingCurrent] = useState(0);
  const [accountValueLoading, setAccountValueLoading] = useState(true);
  const [shortCurrent, setShortCurrent] = useState(0);

  useEffect(() => {
    Promise.all([
      orderService.holdingProfitOrLoss(),
      orderService.shortProfitOrLoss(),
    ])
      .then(([holdingRes, shortRes]) => {
        if (holdingRes.success) {
          setHoldingCurrent(holdingRes.holdingCurrent);
        } else {
          setHoldingCurrent(0);
        }

        if (shortRes.success) {
          setShortCurrent(shortRes.shortCurrent);
        } else {
          setShortCurrent(0);
        }

        setAccountValueLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (accountValueLoading || Array.isArray(user)) {
    return false;
  } else {

    const accountValue = (holdingCurrent  + (user?.portfolio?.cash +
        user?.portfolio?.profitOrLossToday) - shortCurrent)

        return accountValue

    return `₦${(
      holdingCurrent +
      (user?.portfolio?.cash + user?.portfolio?.profitOrLossToday) -
      shortCurrent
    )
      .toFixed(2)
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
};

export default useAccountValue;
