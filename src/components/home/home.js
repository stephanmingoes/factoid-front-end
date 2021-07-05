import React, { useEffect, useState } from "react";
import { Grow, Grid } from "@material-ui/core";
import Posts from "../posts/posts";
import Form from "../form/form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/post";

function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <>
      <div className="main">
        <Grow in>
          <Grid
            className="container"
            container
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Grow>
      </div>
    </>
  );
}

export default Home;
