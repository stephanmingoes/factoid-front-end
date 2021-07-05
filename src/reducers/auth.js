import * as actions from "../actionTypes/actionTypes";

const authReducer = (state = [], action) => {
  switch (action.type) {
    case actions.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case actions.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
