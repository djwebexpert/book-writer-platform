// Navbar component
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getCookie,
  getLocalStorageItem,
  removeCookie,
  removeLocalStorageItem,
} from "../../utils/common";

import { User } from "../../interfaces/user";
import { Role } from "../../constants";
import { Dropdown } from "react-bootstrap";

// NavBar component definition
const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to control navbar visibility
  const [navbarVisible, setNavbarVisible] = useState(false);
  const user = getLocalStorageItem("user")! as User;

  // State to store user details
  useEffect(() => {
    if (getCookie("accessToken")!) {
      setNavbarVisible(true);
    } else {
      setNavbarVisible(false);
    }

    if (
      location.pathname === "/collabrators" &&
      user?.role === Role.COLLABORATOR
    ) {
      setNavbarVisible(false);
    }
  }, [location.pathname, user]);

  // Function to handle logout
  const logout = () => {
    removeCookie("accessToken");
    removeLocalStorageItem("user");
    toast.success("Logged out successfully", {
      position: "top-center",
    });
    navigate("/login");
  };

  const userName =
    user?.firstName?.charAt(0)?.toUpperCase() +
    "" +
    user?.lastName?.charAt(0)?.toUpperCase();

  return (
    <>
      {navbarVisible && (
        <nav className="navbar navbar-dark sticky-top p-0">
          <div className="container-fluid d-flex justify-content-between">
            <div className="">
              <span
                className="fw-bold fs-5 text-light"
                onClick={() => navigate("/")}
                role="button"
              >
                Cloud Book
              </span>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="position-relative dropdown-icon d-flex rounded fw-bold p-0"
                >
                  <div className="navbar-profile text-light">{userName}</div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-box">
                  <Dropdown.Item onClick={() => navigate("/profile")}>
                    Edit profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
