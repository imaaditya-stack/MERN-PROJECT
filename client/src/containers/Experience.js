import React from "react";

const Experience = ({ data }) => {
  return (
    <div className="grid-box">
      <h4>Experience</h4>
      {data?.map((item) => {
        return (
          <div key={item._id}>
            <p>{item.title}</p>
            <p>{item.company}</p>
            <p>
              {item.from.split("T")[0]} -{" "}
              {item.to ? item.to.split("T")[0] : "Present"}
            </p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Experience;
