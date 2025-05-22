import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery/Gallery";

export default function Home() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [showPopup, setShowPopup] = useState(false);

  const handleOptionClick = (option) => {
    console.log(`You chose ${option}`);

    //TODO - connect to websocket server here (then add transfer to /multipaint here as well, or keep it in <Link>?)

    setShowPopup(false);
  };

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

      <Button variant="secondary" onClick={() => setShowPopup(true)}>
        Choose an Option
      </Button>

      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select an Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to="/multipaint" className="me-5">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => handleOptionClick("create session")}
            >
              Create session
            </Button>
          </Link>
          <Button
            variant="outline-success"
            onClick={() => handleOptionClick("join session")}
          >
            Join session
          </Button>
        </Modal.Body>
      </Modal>
      <Gallery/>
    </Container>
  )
}
