import * as api from "../api/index";
import * as actions from "../actionTypes/actionTypes";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({
      type: actions.FETCH_POST,
      payload: data,
    });
    dispatch({ type: actions.STOP_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({
      type: actions.FETCH_ALL,
      payload: data,
    });
    dispatch({ type: actions.STOP_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (newPost, history) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.createPost(newPost);

    history.push(`/posts/${data._id}`);
    dispatch({
      type: actions.CREATE,
      payload: data,
    });
    dispatch({ type: actions.STOP_LOADING });
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

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: actions.COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: actions.START_LOADING });
    const { data } = await api.fetchPostBySearch(searchQuery);
    dispatch({ type: actions.SEARCH, payload: data });
    dispatch({ type: actions.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};
