const initialState = {
  user: {},
  validToken: false,
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

const securityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
};

export default securityReducer;
