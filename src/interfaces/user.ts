import { Role } from "../constants";

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  id: number;
  isActiveCollaborate?: boolean;
}

export interface UserTableProps {
  users: User[];
  onRevokeClick: (user: User) => void;
}


export interface collaboratorSlice {
  usersData: User[];
  isLoading: boolean;
  userData?: User;
}
