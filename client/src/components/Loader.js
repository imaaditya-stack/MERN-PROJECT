import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" />
    </div>
  );
};

export default Loader;
