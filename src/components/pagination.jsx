import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post";

export default function Paginate({ page }) {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      className="page shadow"
      count={numberOfPages}
      color="primary"
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          className="page_item"
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
}
