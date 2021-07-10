import React from "react";
import Post from "./post/post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

export default function Posts({ setCurrentId }) {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!isLoading && !posts.length) {
    return "No posts";
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className="posts" spacing={3} container alignItems="stretch">
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
