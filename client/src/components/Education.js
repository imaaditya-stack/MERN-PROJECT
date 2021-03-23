import React from "react";
import { Table } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Education = ({ data, deleteEdu }) => {
  return (
    <div className="edu_wrapper">
      <h3 className="text-capitalize font-weight-bold">
        Education Information
      </h3>
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
          {data?.map((item) => {
            return (
              <>
                <tr key={item._id}>
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
  );
};

export default Education;
