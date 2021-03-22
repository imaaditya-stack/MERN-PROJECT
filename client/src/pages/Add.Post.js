import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ADD_POST_SERVICE } from "../api/service";

const AddPost = () => {
  const [post, setPost] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ADD_POST_SERVICE({ content: post });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setPost(e.target.value);
  };
  return (
    <div>
      <h1>Add post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Create a Post</Form.Label>
          <Form.Control
            as="textarea"
            name="post"
            onChange={handleChange}
            value={post}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddPost;
