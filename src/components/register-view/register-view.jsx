import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './register-view.scss';
import axios from 'axios';

export function RegistrationView(porps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://movie-api-21197.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email
        }).then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
            // The Second argument '_self' is necessary so that the page will open inthe current tab.
        }).catch(e => {
            console.log('Error registerin the user');
            alert('Something was not entered right');
        });
    }

    <Container>
        <Row>
            <Col>
                <CardGroup>
                    <Card>
                        <Form>
                            <Card.Title>Welcome to the registration page!</Card.Title>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type='test'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    requried
                                    placeholder='Enter Username'
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    requried
                                    minLength="8"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email address: </Form.Label>
                                <Form.Control
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    requried
                                />
                            </Form.Group>
                            <Button variant="primary" type='submit' onClick={handleSubmit}>Submit</Button>
                        </Form>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    </Container>
}