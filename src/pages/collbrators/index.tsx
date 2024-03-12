import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch } from "../../redux/store";
import {
  fetchAllUsers,
  revokeUser,
} from "../../redux/features/collaboratorSlice";
import { User } from "../../interfaces/user";
import { Role } from "../../constants";
import UserTable from "../../components/layout/user-table";

const Collaborators: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersData } = useSelector((state: any) => state.collaboratorSlice);
  const [collaboratorsData, setCollaboratorsData] = useState<User[]>([]);
  const [revokeTrigger, setRevokeTrigger] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [revokeTrigger, dispatch]);

  useEffect(() => {
    if (usersData) {
      const res: User[] = usersData.filter(
        (user: User) => user.role === Role.COLLABORATOR
      );

      setCollaboratorsData(res);
    }
  }, [usersData, revokeTrigger]);

  const onRevoke = (user: User) => {
    const res = dispatch(revokeUser(user));
    res
      .then(() => {
        toast.success(
          user.isActiveCollaborate
            ? "collaborator revoked successfully"
            : "collaborator granted successfully",
          {
            position: "top-center",
          }
        );
        setRevokeTrigger((prev) => prev + 1);
      })
      .catch(() => {
        toast.error(`failed to revoke collaborator license`, {
          position: "top-center",
        });
      });
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between pb-3">
        <h3 className="fw-bold">Collaborators List</h3>
        <Link
          className="text-decoration-none collaborators-button rounded text-light ps-2 d-flex align-items-center fw-semibold"
          role="button"
          to="/"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="pe-2" />
          Go Back
        </Link>
      </div>

      <UserTable users={collaboratorsData} onRevokeClick={onRevoke} />
    </div>
  );
};

export default Collaborators;
