import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { createProfile, loadCurrentProfile } from "../redux/actions";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const { profile, loadingProfile, hasProfile } =
    useSelector((state) => state.profileReducer) || {};

  const schema = yup.object().shape({
    status: yup.string().required(),
    company: yup.string().min(3).required(),
    website: yup.string().url(),
    location: yup.string().min(2).required(),
    skills: yup.string().min(3).required(),
    githubusername: yup
      .string()
      .notRequired()
      .matches(/^(|.{3,})$/, "Github Username must be at least 3 characters"),
    bio: yup.string(),
  });

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(createProfile(data, hasProfile));
  };

  useEffect(() => {
    dispatch(loadCurrentProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <h1 className="green-text font-weight-bold mb-3">
        {hasProfile ? `Edit Profile` : `Add Profile`}
      </h1>
      {loadingProfile ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="status"
            control={control}
            defaultValue={profile?.status}
            render={(props) => (
              <Form.Group>
                <Form.Label>Select Professional Status</Form.Label>
                <Form.Control
                  as="select"
                  ref={register}
                  name="status"
                  defaultValue={profile?.status}
                >
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">
                    Student or Learning
                  </option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            )}
          ></Controller>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              defaultValue={profile?.company}
              ref={register}
            />
            <span className="text-danger text-capitalize">
              {errors.company?.message}
            </span>
          </Form.Group>
          <Form.Group controlId="formBasicCompany">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              defaultValue={profile?.website}
              ref={register}
            />
            <span className="text-danger text-capitalize">
              {errors.website?.message}
            </span>
          </Form.Group>
          <Form.Group controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              defaultValue={profile?.location}
              ref={register}
            />
            <span className="text-danger text-capitalize">
              {errors.location?.message}
            </span>
          </Form.Group>
          <Form.Group controlId="formBasicSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              defaultValue={profile?.skills}
              ref={register}
            />
            <span className="text-danger text-capitalize">
              {errors.skills?.message}
            </span>
          </Form.Group>
          <Form.Group controlId="formBasicGusername">
            <Form.Label>Github Username</Form.Label>
            <Form.Control
              type="text"
              name="githubusername"
              defaultValue={profile?.githubusername}
              ref={register}
            />
            <span className="text-danger text-capitalize">
              {errors.githubusername?.message}
            </span>
          </Form.Group>
          <Form.Group controlId="bio">
            <Form.Label>Tell us a bit about yourself</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              defaultValue={profile?.bio}
              ref={register}
            />
            <span className="text-danger text-capitalize">
              {errors.bio?.message}
            </span>
          </Form.Group>
          <Button variant="primary" type="submit">
            {hasProfile ? `Edit Profile` : `Add Profile`}
          </Button>
          <Link to="/dashboard" className="btn ml-3">
            Go Back
          </Link>
        </Form>
      )}
    </Container>
  );
};

export default CreateProfile;
