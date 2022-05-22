import { Navbar, NavLink, Nav } from "react-bootstrap";
import { useAuth } from "../../contexts/authContext";

export default function Navigation() {
  const loggedIn = localStorage.getItem("paint-app-access-token") != null ? true : false;
  const { logout } = useAuth();
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Paint App</Navbar.Brand>
    <Nav className="justify-content-end" style={{ width: "100%" }}>
      {loggedIn !== null && !loggedIn ? 
      <>
        <NavLink href="/login">Login</NavLink>
        <NavLink href="/register">Register</NavLink>
      </> : <NavLink onClick={logout} href="/">Logout</NavLink>
        }
    </Nav>
  </Navbar>
  )
}