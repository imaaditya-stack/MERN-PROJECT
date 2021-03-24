import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ADD_POST_SERVICE } from "../api/service";
import { useHistory, Link } from "react-router-dom";

const AddPost = () => {
  const [post, setPost] = useState();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ADD_POST_SERVICE({ content: post });
      history.push("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setPost(e.target.value);
  };
  return (
    <Container>
      <h1 className="green-text font-weight-bold">Add post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>What's on your mind?</Form.Label>
          <Form.Control
            as="textarea"
            name="post"
            onChange={handleChange}
            value={post}
            rows={10}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          add
        </Button>
        <Link to="/posts" className="btn ml-3">
          Go Back
        </Link>
      </Form>
    </Container>
  );
};

export default AddPost;
