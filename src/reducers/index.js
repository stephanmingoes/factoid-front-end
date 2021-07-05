import { combineReducers } from "redux";
import posts from "./posts";
import authReducer from "./auth";

const reducer = combineReducers({
  posts,
  authReducer,
});

export default reducer;
