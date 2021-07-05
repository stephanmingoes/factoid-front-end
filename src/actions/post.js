import * as api from "../api/index";
import * as actions from "../actionTypes/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: actions.FETCH_ALL,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({
      type: actions.CREATE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, postData);
    dispatch({
      type: actions.UPDATE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({
      type: actions.DELETE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: actions.LIKE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
