//....................................Holding Order ............................
const initialSelected = {
    selectedStock: null,
  };
  const stockSelected = "selectedStock";
  
  export const setSelectedStock = (stocks) => {
    return {
      type: stockSelected,
      payload: stocks,
    };
  };
  
  export const SelectedStockReducer = (
    state = initialSelected,
    { type, payload }
  ) => {
    switch (type) {
      case stockSelected:
        return { ...state, selectedStock: payload };
      default:
        return state;
    }
  };
  
  // ............................ end ***************************************************************
  