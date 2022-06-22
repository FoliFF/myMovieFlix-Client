import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './register-view.scss';
import axios from 'axios';

export function RegistrationView(porps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameError("Username is required");
            isReq = false;
        } else if (username.length < 5) {
            setUsernameError("Username must be 5 characters long");
            isReq = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            isReq = false;
        } else if (username.length < 5) {
            setPasswordError("Password must be 5 characters long");
            isReq = false;
        }

        if (!email) {
            setEmailError("Add Email");
            isReq = false;
        } else if (email.indexOf("@") === -1) {
            setEmail("Email must be a valid email address");
            isReq = false;
        }

        return isReq;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://movie-api-21197.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            }).then(response => {
                const data = response.data;
                console.log(data);
                alert("Successfully registreation. You can now precced to login.");
                window.open('/', '_self');
                // The Second argument '_self' is necessary so that the page will open inthe current tab.
            }).catch((response) => {
                console.error(response);
                alert('ERROR user registering');
            });
        }

    };

    return (
        <Container>
            <Row className='justify-content-center my-5'>
                <Col md={3}>
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
                                        placeholder='Password'
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email address: </Form.Label>
                                    <Form.Control
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        requried
                                        placeholder='Email'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Birthday: </Form.Label>
                                    <Form.Control
                                        type='date'
                                        placeholder='dd-mm-yyyy'
                                        onChange={e => setBirthday(e.target.value)}
                                        value={birthday}
                                    />
                                </Form.Group>
                                <Button variant="primary" type='submit' onClick={handleRegister}>Submit</Button>
                            </Form>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}