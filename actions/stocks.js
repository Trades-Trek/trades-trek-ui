export const LOGIN_P_SET_LOGIN_SPINNER_STATUS =
  "LOGIN_P_SET_LOGIN_SPINNER_STATUS";
export const SET_STOCKS = "SET_STOCKS";

export function setloginSpinner(flag) {
  return {
    type: LOGIN_P_SET_LOGIN_SPINNER_STATUS,
    payload: flag,
  };
}

export function setStocks(flag) {
  return {
    type: SET_STOCKS,
    payload: flag,
  };
}

export function setStockLists(data) {
  return async (dispatch, getState) => {
    await dispatch(setStocks(data));
  };
}

export const initialState = {
  loginSpinner: false,
  stocks: [],
};

// export const loginActions = {
//   setloginSpinner,
// };

const ACTION_HANDLERS = {
  [LOGIN_P_SET_LOGIN_SPINNER_STATUS]: (state, action) => {
    return {
      ...state,
      loginSpinner: action.payload,
    };
  },
  [SET_STOCKS]: (state, action) => {
    return {
      ...state,
      stocks: action.payload,
    };
  },
};

export default function stocks(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
