//....................................Open Order ............................
const initialOpenState = {
    openOrder: [],
  };
  const OpenStock = "OpenStocks";
  
  export const setOpenStock = (stocks) => {
    return {
      type: OpenStock,
      payload: stocks,
    };
  };
  
  export const OpenStocksReducer = (
    state = initialOpenState,
    { type, payload }
  ) => {
    switch (type) {
      case OpenStock:
        return { ...state, openOrder: payload };
      default:
        return state;
    }
  };
  
  // ............................ end ***************************************************************
  