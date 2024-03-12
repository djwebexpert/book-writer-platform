import React from "react";
import Tooltip from "react-bootstrap/Tooltip";

import { UserTableProps } from "../../interfaces/user";
import { Button, OverlayTrigger } from "react-bootstrap";

const UserTable: React.FC<UserTableProps> = ({ users, onRevokeClick }) => {
  return (
    <table className="table table-bordered table-responsive collaborators-table">
      <thead className="thead-dark">
        <tr className="text-center">
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users?.map((user) => (
            <tr key={user?.id} className="text-center">
              <td>{user?.firstName}</td>
              <td>{user?.lastName}</td>
              <td>{user?.email}</td>
              <td className="text-center">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      {" "}
                      {user?.isActiveCollaborate
                        ? "Revoke Collaborator"
                        : "Grant Collaborator"}
                    </Tooltip>
                  }
                >
                  <Button
                    variant={
                      user?.isActiveCollaborate
                        ? "outline-danger"
                        : "outline-success"
                    }
                   
                    onClick={() => onRevokeClick(user)}
                  >
                    {user?.isActiveCollaborate ? "Revoke" : "Grant"}
                  </Button>
                </OverlayTrigger>

              </td>
            </tr>
          ))
        ) : (
          <tr style={{ textAlign: "center" }}>
            <td colSpan={4}>No collaborator found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
