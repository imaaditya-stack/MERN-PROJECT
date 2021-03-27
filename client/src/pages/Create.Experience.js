import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addExperience } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateExperience = () => {
  const [current, setCurrent] = useState(false);

  const dispatch = useDispatch();

  const schema = yup.object().shape(
    {
      title: yup.string().min(5).required(),
      company: yup.string().min(3).required(),
      location: yup.string().min(3).required(),
      from: yup.date().required().nullable().typeError("Invalid Date"),
      current: yup.boolean(),
      to: yup.date().when("current", {
        is: (current) => current,
        then: yup.date().notRequired(),
        otherwise: yup.date().required().nullable().typeError("Invalid Date"),
      }),
      description: yup
        .string()
        .notRequired(
          /^(|.{20,})$/,
          "Description must be at least 20 characters"
        ),
    },
    [["current", "to"]]
  );

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addExperience(data));
  };

  return (
    <Container>
      <h1 className="green-text font-weight-bold mb-3">Add Experience</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" name="title" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.title?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" name="company" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.company?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.location?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicSkills">
          <Form.Label>From Date</Form.Label>
          <Form.Control type="date" name="from" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.from?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Current"
            name="current"
            checked={current}
            ref={register}
            onChange={() => setCurrent(!current)}
          />
        </Form.Group>
        {!current && (
          <Form.Group controlId="formBasicSkills">
            <Form.Label>To Date</Form.Label>
            <Form.Control type="date" name="to" ref={register} />
            <span className="text-danger text-capitalize">
              {errors.to?.message}
            </span>
          </Form.Group>
        )}
        <Form.Group controlId="desc">
          <Form.Label>Job Description</Form.Label>
          <Form.Control as="textarea" name="description" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.description?.message}
          </span>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
        <Link to="/dashboard" className="btn ml-3">
          Go Back
        </Link>
      </Form>
    </Container>
  );
};

export default CreateExperience;
