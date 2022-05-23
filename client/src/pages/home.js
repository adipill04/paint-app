import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Gallery from "../components/Gallery/Gallery";

export default function Home() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <Container>
      <div className="mb-5 mt-5">
        <h2> Welcome, {userData.email}</h2>
        <h1>Let's Paint! 🎨</h1>
      </div>
      <Link to="/paint" className="me-5">
        <Button variant="primary">
          Start Painting 🖌
        </Button>
      </Link>
      <Gallery/>
    </Container>
  )
}
