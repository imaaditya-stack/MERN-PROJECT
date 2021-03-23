import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="landing-wrapper">
        <div className="landing-content">
          <h1 className="font-weight-bold">Developer Hub</h1>
          <h5 className="mb-3">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </h5>
          <Link className="btn mr-3" style={{ width: 120 }} to="/register">
            Sign up
          </Link>
          <Link className="btn login-btn" style={{ width: 120 }} to="/login">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
