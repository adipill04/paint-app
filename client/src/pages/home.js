import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery/Gallery"

export default function Home() {
  return (
    <Container>
      <div className="mb-5 mt-5">
        <h1>Let's Paint! 🎨</h1>
      </div>
        <Link to="/paint" className="me-5">Start 🖌</Link>
        <Gallery/>
    </Container>
  )
}
