export const SET_USER = 'SET_USER';

export function setUser(data) {
  return {
    type: SET_USER,
    payload: data,
  };
}

export function setStockLists(data) {
  return async (dispatch, getState) => {
    await dispatch(setUser(data));
  };
}

export const initialState = {
  user: [],
};

const ACTION_HANDLERS = {
  [SET_USER]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  },
};

export default function users(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
