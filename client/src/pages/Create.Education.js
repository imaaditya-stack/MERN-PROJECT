import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addEducation } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateEducation = () => {
  const [current, setCurrent] = useState(false);

  const dispatch = useDispatch();

  const schema = yup.object().shape(
    {
      school: yup.string().min(3).required(),
      degree: yup.string().min(3).required(),
      fieldofstudy: yup.string().min(3).required(),
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
    dispatch(addEducation(data));
  };

  return (
    <Container>
      <h1 className="green-text font-weight-bold mb-3">Add Education</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>School/College/Institute</Form.Label>
          <Form.Control type="text" name="school" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.school?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Degree</Form.Label>
          <Form.Control type="text" name="degree" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.degree?.message}
          </span>
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <Form.Label>Field Of Study</Form.Label>
          <Form.Control type="text" name="fieldofstudy" ref={register} />
          <span className="text-danger text-capitalize">
            {errors.fieldofstudy?.message}
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
            checked={current}
            name="current"
            onChange={() => setCurrent(!current)}
            ref={register}
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
          <Form.Label>Description</Form.Label>
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

export default CreateEducation;
