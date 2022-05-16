import { useState } from 'react';
import axios from 'axios';
import  { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) => {
        // Prevent default behavior of refreshing/redirecting from page on form submit
        e.preventDefault();
        const reqBody = {
            email: email,
            password: password
        };
        axios.post('http://localhost:1337/api/register', reqBody)
        .then(response => {
            console.log("registerUser response: "+JSON.stringify(response));
        }).catch((error) => {
            console.log("ERROR: "+error);
        });
        console.log("User has been registered with email: "+email+" password: "+password);
        
    };
  return (
    <Container>
        <Row>
            <Col className="text-center">
                <h1>Register</h1>
                <Form onSubmit={registerUser}>
                    <Form.Group>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}
