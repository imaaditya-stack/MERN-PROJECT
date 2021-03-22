import React, { useEffect, useState } from "react";
import { GET_POSTS_SERVICE } from "../api/service";
import { useSelector } from "react-redux";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const data = useSelector((state) => state.authReducer?.user);
  console.log(data);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await GET_POSTS_SERVICE();
        setPosts(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      <h1>posts</h1>
      {posts.map((post) => {
        return (
          <>
            <p>{post.content}</p>
            <p>{post.user}</p>
          </>
        );
      })}
    </>
  );
};

export default Posts;
