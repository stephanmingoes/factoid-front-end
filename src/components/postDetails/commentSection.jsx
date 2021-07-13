import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";
import { commentPost } from "../../actions/post";

export default function CommentSection({ post }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentsRef = useRef();

  async function handleClick() {
    setComment("");
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    commentsRef.current.scrollIntoView({ behaviour: "smooth" });
  }
  return (
    <>
      <Grid container className="comment_section">
        <Grid item className="comments" xs={12} md={5} lg={5}>
          <h3 className="comment_heading">Comments</h3>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]}</strong>:{comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Grid>
        <Grid item className="comment_input" xs={12} md={7} lg={7}>
          <textarea
            value={comment}
            disabled={!user}
            className="comment"
            type="text"
            placeholder={
              user ? "Make a comment..." : "Login to create a comment"
            }
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            className="comment_btn"
            disabled={!comment}
            onClick={handleClick}
          >
            Comment
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
