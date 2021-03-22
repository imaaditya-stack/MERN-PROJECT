import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { PROFILE_SERVICE, GET_PROFILE_SERVICE } from "../api/service";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubUsername: "",
    bio: "",
  });

  const [updateProfile, setUpdateProfile] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await PROFILE_SERVICE({
        company: formData.company,
        website: formData.website,
        location: formData.location,
        status: formData.status,
        skills: formData.skills,
        bio: formData.bio,
        githubusername: formData.githubUsername,
      });
      updateProfile
        ? alert("Profile Updated Successfully")
        : alert("Profile Created Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getProfile = async () => {
    try {
      const res = await GET_PROFILE_SERVICE();
      setFormData({
        company: !res.data.company ? "" : res.data.company,
        status: !res.data.status ? "" : res.data.status,
        website: !res.data.website ? "" : res.data.website,
        location: !res.data.location ? "" : res.data.location,
        skills: !res.data.skills ? "" : res.data.skills.toString(),
        githubUsername: !res.data.githubusername ? "" : res.data.githubusername,
        bio: !res.data.bio ? "" : res.data.bio,
      });
      setUpdateProfile(true);
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Profile Doesn't Exists");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select Professional Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            onChange={handleChange}
            value={formData.status}
          >
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </Form.Control>
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
        <Form.Group controlId="formBasicCompany">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            name="website"
            onChange={handleChange}
            value={formData.website}
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
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            name="skills"
            onChange={handleChange}
            value={formData.skills}
          />
        </Form.Group>
        <Form.Group controlId="formBasicGusername">
          <Form.Label>Github Username</Form.Label>
          <Form.Control
            type="text"
            name="githubUsername"
            onChange={handleChange}
            value={formData.githubUsername}
          />
        </Form.Group>
        <Form.Group controlId="bio">
          <Form.Label>Tell us a bit about yourself</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            onChange={handleChange}
            value={formData.bio}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Profile
        </Button>
      </Form>
    </>
  );
};

export default CreateProfile;
