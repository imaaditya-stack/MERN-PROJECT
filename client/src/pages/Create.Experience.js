import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { EXP_SERVICE } from "../api/service";

const CreateExperience = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await EXP_SERVICE(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            onChange={handleChange}
            value={formData.company}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            onChange={handleChange}
            value={formData.location}
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
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Profile
        </Button>
      </Form>
    </>
  );
};

export default CreateExperience;
