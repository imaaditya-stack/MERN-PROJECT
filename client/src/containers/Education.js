import React from "react";

const Education = ({ data }) => {
  return (
    <div className="grid-box">
      <h4>Education</h4>
      {data?.map((item) => {
        return (
          <div key={item._id}>
            <p className="text-muted">{item.school}</p>
            <p>
              <b>Degree:</b> {item.degree}
            </p>
            <p>
              <b>Field Of Study: </b> {item.fieldofstudy}
            </p>
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

export default Education;
