import React, { useEffect } from "react";
import { CircularProgress, ButtonBase } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getPost, getPostBySearch } from "../../actions/post";
import { useParams, useHistory } from "react-router-dom";

export default function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostBySearch({ searchTitle: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;
  const RecommendedPosts = posts.filter((p) => p.title !== post.title);
  return isLoading ? (
    <div className="isLoading">
      <CircularProgress />
    </div>
  ) : (
    <div className="main">
      <div className="fact_info">
        <div>
          <h2>{post.title}</h2>
          <p className="tag">{post.tags.map((tag) => `#${tag} `)}</p>
          <p>{post.fact}</p>
          <h3>
            Created by: {post.name} {moment(post.createdAt).fromNow()}
          </h3>
          <h5>Realtime Chat - coming soon!</h5>
          <hr />
          <h5>Comments - comming soon!</h5>
          <hr />
        </div>
        <div className="img_div">
          <img src={post.selectedFile} alt={post.title} />
        </div>
      </div>{" "}
      <div className="rec_posts">
        {RecommendedPosts.length ? (
          <div>
            <h2 className="rec_head">You might also like:</h2>
            {RecommendedPosts.map((post) => (
              <div className="rec_post" key={post._id}>
                <ButtonBase
                  className="rec_btn"
                  onClick={() => {
                    history.push(`/posts/${post._id}`);
                  }}
                  component="span"
                >
                  <img
                    className="img_rec"
                    src={post.selectedFile}
                    alt={post.title}
                  />
                  <div className="rec_content">
                    <h2>{post.title}</h2>
                    <p>{post.fact}</p>
                    <h5>Likes: {post.likes.length}</h5>
                  </div>{" "}
                </ButtonBase>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
