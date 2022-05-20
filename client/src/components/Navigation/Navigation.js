import { Navbar, Nav } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Paint App</Navbar.Brand>
    <Nav className="me-auto">
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/gallery">Gallery</Nav.Link>
    </Nav>
  </Navbar>
  )
}