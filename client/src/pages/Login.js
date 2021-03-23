import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { LOGIN_SERVICE } from "../api/service";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUser } from "../redux/actions/actions";
import { handleAuthentication } from "../auth/auth.service";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await LOGIN_SERVICE(data);
      handleAuthentication(res.data);
      dispatch(loadUser(res.data));
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }

    e.target.reset();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <h1 className="green-text font-weight-bold">Login to your account</h1>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p className="mt-2">
          Don't have an account ?{" "}
          <Link className="green-text" to="/register">
            Sign Up
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
