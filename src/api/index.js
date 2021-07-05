import axios from "axios";

const API = axios.create({ baseURL: "https://factoid-backend.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
// const url = "https://factoid-api.herokuapp.com/posts";

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (state) => axios.post("/user/signin", state);
export const signUp = (state) => API.post("/user/signup", state);
