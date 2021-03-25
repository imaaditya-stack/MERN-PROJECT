/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  GET_PROFILE_SERVICE,
  DEL_EXP_SERVICE,
  DEL_EDU_SERVICE,
} from "../api/service";
import DashboardActions from "../components/DashboardActions";
import { Link } from "react-router-dom";
import Experience from "../components/Experience";
import Education from "../components/Education";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  GET_PROFILE,
  DELETE_EXP,
  DELETE_EXP_ERROR,
  DELETE_EDU,
  DELETE_EDU_ERROR,
  PROFILE_ERROR,
} from "../redux/actions/types";

const Dashboard = () => {
  const disptach = useDispatch();
  const { user } = useSelector((state) => state.authReducer) || {};
  const { profile, loadingProfile } =
    useSelector((state) => state.profileReducer) || {};

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GET_PROFILE_SERVICE();
        if (res.status === 200) {
          disptach({ type: GET_PROFILE, payload: res.data });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          disptach({ type: PROFILE_ERROR });
        }
      }
    };

    fetchProfile();
  }, []);

  const deleteExp = async (id) => {
    const currentExp = profile.experience;

    disptach({ type: DELETE_EXP, payload: id });

    try {
      const res = await DEL_EXP_SERVICE(id);
      if (res.status === 200) {
        alert("Experience Deleted Successfully");
      }
    } catch (error) {
      if (error) {
        disptach({ type: DELETE_EXP_ERROR, payload: currentExp });
        alert("Experience Deletion Failed");
      }
    }
  };

  const deleteEdu = async (id) => {
    const currentEdu = profile.education;

    disptach({ type: DELETE_EDU, payload: id });

    try {
      const res = await DEL_EDU_SERVICE(id);
      if (res.status === 200) {
        alert("Education Deleted Successfully");
      }
    } catch (error) {
      if (error) {
        disptach({ type: DELETE_EDU_ERROR, payload: currentEdu });
        alert("Education Deletion Failed");
      }
    }
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
