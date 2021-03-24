import React, { useEffect, useState } from "react";
import { GET_POSTS_SERVICE } from "../api/service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  POST_LIKE_SERVICE,
  POST_UNLIKE_SERVICE,
  POST_DELETE_SERVICE,
} from "../api/service";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "../components/Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.authReducer?.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await GET_POSTS_SERVICE();
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await POST_LIKE_SERVICE(id);
      const updatedPosts = posts.map((post) =>
        post._id === id ? { ...post, likes: res.data } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisLike = async (id) => {
    try {
      const res = await POST_UNLIKE_SERVICE(id);
      const updatedPosts = posts.map((post) =>
        post._id === id ? { ...post, likes: res.data } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const currentPosts = posts;

    const updatedPosts = posts.filter((post) => post._id !== id);

    setPosts(updatedPosts);

    try {
      await POST_DELETE_SERVICE(id);
      alert("Post Deleted Successfully");
    } catch (error) {
      if (error) {
        alert("Post Deletion Failed");
        setPosts(currentPosts);
      }
    }
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
