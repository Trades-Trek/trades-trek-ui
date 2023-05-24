//....................................Holding Order ............................
const initialHoldingState = {
  holdingOrder: [],
};
const HoldingStack = "HoldingStocks";

export const setHoldingStock = (stocks) => {
  return {
    type: HoldingStack,
    payload: stocks,
  };
};

export const HoldingStocksReducer = (
  state = initialHoldingState,
  { type, payload }
) => {
  switch (type) {
    case HoldingStack:
      return { ...state, holdingOrder: payload };
    default:
      return state;
  }
};

// ............................ end ***************************************************************
