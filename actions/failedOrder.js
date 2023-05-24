//....................................Failed Order ............................
const initialFailedState = {
    failedOrder: [],
  };
  const FailedStock = "FailedStocks";
  
  export const setFailedStock = (stocks) => {
    return {
      type: FailedStock,
      payload: stocks,
    };
  };
  
  export const FailedStocksReducer = (
    state = initialFailedState,
    { type, payload }
  ) => {
    switch (type) {
      case FailedStock:
        return { ...state, failedOrder: payload };
      default:
        return state;
    }
  };
  
  // ............................ end ***************************************************************
  