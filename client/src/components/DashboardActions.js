import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <>
      <br />
      <Link to="/create-profile" className="btn btn-block">
        Edit Profile
      </Link>
      <Link to="/add-education" className="btn btn-block">
        Add Education
      </Link>
      <Link to="/add-experience" className="btn btn-block">
        Add Experience
      </Link>
      <br />
      <br />
    </>
  );
};

export default DashboardActions;
