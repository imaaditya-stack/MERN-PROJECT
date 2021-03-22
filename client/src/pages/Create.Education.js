import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { EDU_SERVICE } from "../api/service";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await EDU_SERVICE(formData);
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
          Add Profile
        </Button>
      </Form>
    </>
  );
};

export default CreateEducation;
