import React from "react";
import { Table } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Experience = ({ data, deleteExp }) => {
  return (
    <div className="exp_wrapper">
      <h3 className="text-capitalize font-weight-bold">
        Experience Information
      </h3>
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
          {data?.map((item) => {
            return (
              <tr key={item._id}>
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
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Experience;
