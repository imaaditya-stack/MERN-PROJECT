/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import Education from "../containers/Education";
import Experience from "../containers/Experience";
import GithubRepos from "../components/Github.Repos";
import { CLEAR_REPOS } from "../redux/actions/types";
import Loader from "../components/Loader";
import { getGithubRepos } from "../redux/actions";

const SingleProfile = (props) => {
  const dispatch = useDispatch();
  const { repos, loadingRepos } =
    useSelector((state) => state.profileReducer) || {};
  const profile = props.location.state.profile;

  useEffect(() => {
    dispatch(getGithubRepos(profile.githubusername));

    return () => dispatch({ type: CLEAR_REPOS });
  }, [profile.githubusername, dispatch]);

  return (
    <Container>
      <h1>{profile.user.name}</h1>
      <h5>
        {profile.status} at {profile.company}
      </h5>
      <h5>
        <LocationOnIcon /> {profile.location}
      </h5>
      <div className="skills d-flex flex-wrap my-3">
        {profile.skills.map((skill, index) => {
          return (
            <p key={index} className="mr-2">
              <CheckIcon /> {skill}
            </p>
          );
        })}
      </div>
      <div className="grid">
        <Education data={profile.education} />
        <Experience data={profile.experience} />
      </div>
      <h3>Github Repositories of {profile.user.name}</h3>
      {loadingRepos ? (
        <Loader />
      ) : (
        <GithubRepos repos={repos} profile={profile} />
      )}
    </Container>
  );
};

export default SingleProfile;
