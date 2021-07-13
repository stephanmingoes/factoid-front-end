import axios from "axios";

// https://factoid-backend.herokuapp.com
const API = axios.create({ baseURL: "https://factoid-backend.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.searchTitle || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (state) => API.post("/user/signin", state);

export const signUp = (state) => API.post("/user/signup", state);
