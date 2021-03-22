import React, { useEffect, useState } from "react";
import { GET_POSTS_SERVICE } from "../api/service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  POST_LIKE_SERVICE,
  POST_UNLIKE_SERVICE,
  POST_DELETE_SERVICE,
} from "../api/service";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const data = useSelector((state) => state.authReducer?.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await GET_POSTS_SERVICE();
        setPosts(res.data);
      } catch (error) {
        console.log(error);
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
    <>
      <h1>posts</h1>
      <Link className="btn btn-primary" to="/add-post">
        Add Post
      </Link>
      {posts.map((post) => {
        return (
          <>
            <div key={post._id} className="bg-light">
              <p>{post.content}</p>
              <p>Total Likes: {post.likes.length}</p>
              <Button onClick={() => handleLike(post._id)}>Like</Button>
              <Button onClick={() => handleDisLike(post._id)}>DisLike</Button>
              <Button onClick={() => handleDelete(post._id)}>Delete</Button>
              <p>{post.user === data?._id ? "Can delete" : "Cannot delete"}</p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Posts;
