import * as actions from "../actionTypes/actionTypes";
import * as api from "../api/index";

export const signIn = (state, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(state);
    dispatch({ type: actions.AUTH, data });
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};

export const signUp = (state, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(state);

    dispatch({ type: actions.AUTH, data });

    history.push("/");
  } catch (err) {
    console.log(err);
  }
};
