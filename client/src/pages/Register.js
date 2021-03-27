import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signup } from "../redux/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    password1: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(signup(data));
  };

  return (
    <Container>
      <h1 className="green-text font-weight-bold">Create a new account</h1>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.name?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.email?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.password?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicPassword1">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="password1" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.password1?.message}
          </span>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <p className="mt-2">
          Already have an account ?{" "}
          <Link className="green-text" to="/login">
            Login
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
