import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { EDU_SERVICE } from "../api/service";
import { Link, useHistory } from "react-router-dom";

const CreateEducation = () => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EDU_SERVICE(formData);
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <h1 className="green-text font-weight-bold mb-3">Add Education</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>School/College/Institute</Form.Label>
          <Form.Control
            type="text"
            name="school"
            onChange={handleChange}
            value={formData.school}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="text"
            name="degree"
            onChange={handleChange}
            value={formData.degree}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <Form.Label>Field Of Study</Form.Label>
          <Form.Control
            type="text"
            name="fieldofstudy"
            onChange={handleChange}
            value={formData.fieldofstudy}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSkills">
          <Form.Label>From Date</Form.Label>
          <Form.Control
            type="date"
            name="from"
            onChange={handleChange}
            value={formData.from}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Current"
            checked={formData.current}
            onChange={() => {
              setFormData({ ...formData, current: !formData.current });
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSkills">
          <Form.Label>To Date</Form.Label>
          <Form.Control
            type="date"
            name="to"
            onChange={handleChange}
            value={formData.to}
          />
        </Form.Group>
        <Form.Group controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
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
