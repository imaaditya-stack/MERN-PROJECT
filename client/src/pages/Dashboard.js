import React, { useEffect, useState } from "react";
import {
  GET_PROFILE_SERVICE,
  DEL_EXP_SERVICE,
  DEL_EDU_SERVICE,
} from "../api/service";
import DashboardActions from "../components/DashboardActions";
import { Link } from "react-router-dom";
import Experience from "../components/Experience";
import Education from "../components/Education";
import { Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [profile, setProfile] = useState();
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.authReducer) || {};

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GET_PROFILE_SERVICE();
        setHasProfile(true);
        setProfile(res.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 400) {
          setHasProfile(false);
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, []);

  const deleteExp = async (id) => {
    const currentExp = profile.experience;

    setProfile({
      ...profile,
      experience: currentExp.filter((exp) => exp._id !== id),
    });

    try {
      await DEL_EXP_SERVICE(id);
      alert("Experience Deleted Successfully");
    } catch (error) {
      setProfile({ ...profile, experience: currentExp });
      alert("Experience Deletion Failed");
    }
  };

  const deleteEdu = async (id) => {
    const currentEdu = profile.education;

    setProfile({
      ...profile,
      education: currentEdu.filter((exp) => exp._id !== id),
    });

    try {
      await DEL_EDU_SERVICE(id);
      alert("Education Deleted Successfully");
    } catch (error) {
      setProfile({ ...profile, education: currentEdu });
      alert("Education Deletion Failed");
    }
  };

  return (
    <Container>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : hasProfile ? (
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
