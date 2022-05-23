import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';
import { useLocation, useNavigate } from 'react-router';

export default function Login() {
    const location = useLocation();
    const { loggedIn, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(loggedIn && location.state?.from) navigate(location.state.from);
    }, [loggedIn]);

    const handleLogin = async (e) => {
        // Prevent default behavior of refreshing/redirecting from page on form submit
        e.preventDefault();
        login(email, password);
        if(location.state?.from) {
            navigate(location.state.from);
        }
    };
  return (
    <Container>
        <Row>
            <Col className="text-center">
                <h1>Login</h1>
                <Form onSubmit={handleLogin}>
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
