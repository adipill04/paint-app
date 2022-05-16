import { useState } from 'react';
import  { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        console.log("User logged in with email: "+email+" password: "+password);

    };
  return (
    <Container>
        <Row>
            <Col className="text-center">
                <h1>Login</h1>
                <Form onSubmit={login}>
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
