//....................................Open Order ............................
const initialState = {
    topCompany: [],
  };
  const top = "TopComany";
  
  export const setPopularCompany = (stocks) => {
    return {
      type: top,
      payload: stocks,
    };
  };
  
  export const PopularCompanies = (
    state = initialState,
    { type, payload }
  ) => {
    switch (type) {
      case top:
        return { ...state, topCompany: payload };
      default:
        return state;
    }
  };
  
  // ............................ end ***************************************************************
  