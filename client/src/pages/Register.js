import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { REGISTER_SERVICE } from "../api/service";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/actions";
import { handleAuthentication } from "../auth/auth.service";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await REGISTER_SERVICE(data);
      handleAuthentication(res.data);
      dispatch(setUser(res.data));
    } catch (error) {
      console.error(error);
    }

    e.target.reset();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} />
        </Form.Group>
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
        <Form.Group controlId="formBasicPassword1">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password1"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
