const todoReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TODOID":
      return action.payload;

    default:
      return state;
  }
};

export default todoReducer;
