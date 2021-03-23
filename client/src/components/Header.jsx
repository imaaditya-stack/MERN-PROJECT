import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CodeIcon from "@material-ui/icons/Code";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.authReducer) || {};

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    history.push("/");
  };

  const authLinks = (
    <>
      <Nav.Link as={Link} to="/posts">
        Posts
      </Nav.Link>
      <Nav.Link as={Link} to="/" onClick={handleLogout}>
        Logout
      </Nav.Link>
    </>
  );

  const guestLinks = (
    <>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </>
  );

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Navbar variant="dark" expand="lg">
        <Navbar.Brand as={Link} to={isAuthenticated ? `/dashboard` : `/`}>
          <CodeIcon fontSize="large" /> Dev Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/profiles">
              Developers
            </Nav.Link>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
