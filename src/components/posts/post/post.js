import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { useStyles } from "../postStyles.js";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

export default function Post({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result?.googleId || user?.result?._id;
  const [likes, setLikes] = useState(post?.likes);

  const liked = post.likes.find((like) => like === userId);
  const [isLiked, setIsLiked] = useState(liked);
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (liked) {
      setIsLiked(!isLiked);
      setLikes(post?.likes.filter((id) => id !== userId));
    } else {
      setIsLiked(!isLiked);
      setLikes([...post.likes, userId]);
    }
  };
  const OpenPost = () => {
    history.push(`/posts/${post._id}`);
  };
  return (
    <Card className={`${classes.card} card shadow`}>
      <ButtonBase
        className={classes.cardAction}
        onClick={OpenPost}
        component="span"
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {post.name === user?.result?.name ? (
          <Button
            className={classes.overlay2}
            aria-label="edit"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreVertIcon />
          </Button>
        ) : null}
        <div className={classes.details}>
          <Typography
            className={classes.dull}
            variant="body2"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag.trim()} `)}
          </Typography>
        </div>{" "}
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            className={classes.white}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {post.fact}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.white}
          size="small"
          disabled={!user?.result}
          onClick={handleLike}
        >
          {isLiked ? (
            <ThumbUpAltIcon className={classes.like} />
          ) : (
            <ThumbUpAltOutlinedIcon className={classes.like} />
          )}
          {likes.length}
        </Button>
        {post.name === user?.result?.name ? (
          <Button
            className={classes.delete}
            size="small"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon />
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}
