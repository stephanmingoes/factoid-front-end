import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function Form({ currentId, setCurrentId }) {
  const history = useHistory();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    title: "",
    fact: "",
    tags: "",
    selectedFile: "",
  });
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postData.tags !== "") {
      var newTags = postData.tags.map((tag) => tag.trim());
    }
    if (currentId === 0 || currentId === null) {
      dispatch(
        createPost(
          { ...postData, tags: newTags, name: user?.result.name },
          history
        )
      );
      handleClear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result.name }));
      handleClear();
    }
  };
  const handleClear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      fact: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData((preval) => ({ ...preval, [name]: value }));
  };
  if (!user?.result.name) {
    return (
      <div className="form shadow">
        <h4>Sign in to create a fact.</h4>
        <Button component={Link} to="/auth" variant="contained" className="btn">
          Sign In
        </Button>
      </div>
    );
  }
  return (
    <div className="form shadow">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h3>{currentId ? "Edit" : "Share"} A fact</h3>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title"
          value={postData.title}
        />
        <textarea
          rows="5"
          onChange={handleChange}
          type="text"
          name="fact"
          placeholder="Fact"
          value={postData.fact}
        />
        <input
          onChange={(event) =>
            setPostData({
              ...postData,
              tags: event.target.value.split(","),
            })
          }
          type="text"
          name="tags"
          placeholder="Tags seperated by commas"
          value={postData.tags}
        />
        <div className="file-input">
          <FileBase
            className="base-64"
            type="file"
            multiple={false}
            name="selectedFile"
            value={postData.selectedFile}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button onClick={handleSubmit} className="btn-1" type="submit">
          Submit
        </button>
        <button onClick={handleClear} className="btn-2">
          Clear
        </button>
      </form>
    </div>
  );
}
