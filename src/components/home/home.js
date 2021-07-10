import React, { useEffect, useState } from "react";
import { Grow, Grid, AppBar, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Posts from "../posts/posts";
import Form from "../form/form";
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../actions/post";
import Paginate from "../pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [searchTitle, setSearchTitle] = useState("");
  const [tags, setTags] = useState([]);

  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      SearchPost();
    }
  }
  function handleAdd(tag) {
    return setTags([...tags, tag]);
  }
  function handleDelete(tagToDelele) {
    return setTags(tags.filter((tag) => tag !== tagToDelele));
  }

  function SearchPost() {
    if (searchTitle.trim() || tags) {
      dispatch(getPostBySearch({ searchTitle, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery?=${searchTitle || "none"}&tags=${tags.join(
          ","
        )}`
      );
    } else {
      history.push("/");
    }
  }

  return (
    <>
      <div className="main">
        <Grow in>
          <Grid
            spacing={2}
            className="container"
            container
            justify="space-between"
            alignItems="stretch"
          >
            <Grid className="posts-grid" item xs={12} sm={8} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <div className="searches shadow">
                <h3>Search</h3>
                <input
                  autoComplete="off"
                  className="search"
                  type="text"
                  name="searchTitle"
                  placeholder="Search Title"
                  onKeyPress={handleKeyPress}
                  onChange={(event) => setSearchTitle(event.target.value)}
                />
                <ChipInput
                  className="search-chip"
                  placeholder="Search Tags"
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                />
                <Button
                  onClick={SearchPost}
                  className="search-btn"
                  variant="contained"
                >
                  Search
                </Button>
              </div>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paginate page={page} />
            </Grid>
          </Grid>
        </Grow>
      </div>
    </>
  );
}

export default Home;
