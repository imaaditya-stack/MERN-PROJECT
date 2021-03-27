/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DashboardActions from "../components/DashboardActions";
import { Link } from "react-router-dom";
import Experience from "../components/Experience";
import Education from "../components/Education";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  loadCurrentProfile,
  deleteExperience,
  deleteEducation,
} from "../redux/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer) || {};
  const { profile, loadingProfile } =
    useSelector((state) => state.profileReducer) || {};

  useEffect(() => {
    dispatch(loadCurrentProfile());
  }, []);

  const deleteExp = async (id) => {
    dispatch(deleteExperience(id, profile.experience));
  };

  const deleteEdu = async (id) => {
    dispatch(deleteEducation(id, profile.education));
  };

  return (
    <Container>
      {loadingProfile ? (
        <Loader />
      ) : profile !== null ? (
        <>
          <h1 className="green-text font-weight-bold">Welcome {user?.name}</h1>
          <DashboardActions />
          <Experience data={profile?.experience} deleteExp={deleteExp} />
          <Education data={profile?.education} deleteEdu={deleteEdu} />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
