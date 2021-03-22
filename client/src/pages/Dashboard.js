import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GET_PROFILE_SERVICE,
  DEL_EXP_SERVICE,
  DEL_EDU_SERVICE,
} from "../api/service";
import { Table } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Dashboard = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await GET_PROFILE_SERVICE();
        console.log(res);
        setProfile(res.data);
      } catch (error) {
        if (error.response?.status === 400) {
          console.log("Profile Doesn't Exists");
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
      console.log(error);
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
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <Link to="/create-profile" className="btn btn-primary">
        Create Profile
      </Link>
      <Link to="/add-education" className="btn btn-primary">
        Add Education
      </Link>
      <Link to="/add-experience" className="btn btn-primary">
        Add Experience
      </Link>
      <div className="exp_wrapper">
        <h1>Experience Credentials</h1>
        <Table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profile?.experience.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.company}</td>
                    <td>{item.title}</td>
                    <td>
                      {item.from.split("T")[0]} -{" "}
                      {item.to ? item.to.split("T")[0] : "Present"}
                    </td>
                    <td>
                      <IconButton onClick={() => deleteExp(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="edu_wrapper">
        <h1>Education Credentials</h1>
        <Table>
          <thead>
            <tr>
              <th>School/College/Institute</th>
              <th>Degree</th>
              <th>Field Of Study</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profile?.education.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.school}</td>
                    <td>{item.degree}</td>
                    <td>{item.fieldofstudy}</td>
                    <td>
                      <IconButton onClick={() => deleteEdu(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
