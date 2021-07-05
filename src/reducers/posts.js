import * as actions from "../actionTypes/actionTypes";

const reducer = (posts = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL:
      return action.payload;
    case actions.CREATE:
      return [...posts, action.payload];
    case actions.UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case actions.DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case actions.LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};

export default reducer;
