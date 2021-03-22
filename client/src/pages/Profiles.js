import React, { useState, useEffect } from "react";
import { PROFILES_SERVICE } from "../api/service";

const Profiles = () => {
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await PROFILES_SERVICE();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfiles();
  }, []);
  return (
    <>
      <h1>Profiles</h1>
    </>
  );
};

export default Profiles;
