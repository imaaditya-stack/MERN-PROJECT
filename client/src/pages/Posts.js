/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../components/Loader";
import { loadPosts, deletePost, likePost, unlikePost } from "../redux/actions";

const Posts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authReducer?.user);
  const { posts, loading } = useSelector((state) => state.postReducer) || {};

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  const handleLike = async (id) => {
    dispatch(likePost(id));
  };

  const handleDisLike = async (id) => {
    dispatch(unlikePost(id));
  };

  const handleDelete = async (id) => {
    dispatch(deletePost(id, posts));
  };

  return (
    <Container>
      <h1 className="green-text font-weight-bold">Posts</h1>
      <Link className="btn btn-primary mb-3" to="/add-post">
        Add Post
      </Link>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => {
          return (
            <div key={post._id} className="post">
              <p>{post.content}</p>
              <IconButton onClick={() => handleLike(post._id)}>
                <ThumbUpIcon />{" "}
              </IconButton>
              <span>{post.likes.length}</span>
              <IconButton onClick={() => handleDisLike(post._id)}>
                <ThumbDownAltIcon />{" "}
              </IconButton>
              {post.user === data?._id && (
                <IconButton onClick={() => handleDelete(post._id)}>
                  <DeleteIcon />{" "}
                </IconButton>
              )}
              <p className="text-muted">
                By {post.name} on {post.date.split("T")[0]}
              </p>
            </div>
          );
        })
      )}
    </Container>
  );
};

export default Posts;
