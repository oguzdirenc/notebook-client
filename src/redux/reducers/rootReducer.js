import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  todoId: todoReducer,
  security: securityReducer,
});
