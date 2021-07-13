import * as actions from "../actionTypes/actionTypes";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case actions.START_LOADING:
      return { ...state, isLoading: true };
    case actions.STOP_LOADING:
      return { ...state, isLoading: false };
    case actions.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case actions.CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case actions.UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case actions.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case actions.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case actions.COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case actions.SEARCH:
      return { ...state, posts: action.payload };

    case actions.FETCH_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
};

export default reducer;
