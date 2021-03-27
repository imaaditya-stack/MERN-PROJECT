/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { loadProfiles } from "../redux/actions";

const Profiles = () => {
  const dispatch = useDispatch();

  const { profiles, loadingProfiles } =
    useSelector((state) => state.profileReducer) || {};

  useEffect(() => {
    dispatch(loadProfiles());
  }, []);

  return (
    <Container>
      <h1 className="green-text font-weight-bold">Developers</h1>
      {loadingProfiles ? (
        <Loader />
      ) : (
        profiles.map((profile) => {
          return (
            <div className="profile">
              <h3>{profile.user.name}</h3>
              <h5 className="text-muted">
                {profile.status} at {profile.company}
              </h5>
              <div className="skills d-flex flex-wrap my-3">
                {profile.skills.map((skill) => {
                  return (
                    <p className="mr-2">
                      <CheckIcon /> {skill}
                    </p>
                  );
                })}
              </div>
              <Link
                to={{ pathname: "/profile", state: { profile } }}
                className="btn"
              >
                View full profile
              </Link>
            </div>
          );
        })
      )}
    </Container>
  );
};

export default Profiles;
