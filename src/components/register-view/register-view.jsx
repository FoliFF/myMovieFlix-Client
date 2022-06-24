import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import './register-view.scss';
//import axios from 'axios';

export function RegistrationView(porps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    //const [usernameError, setUsernameError] = useState('');
    //const [passwordError, setPasswordError] = useState('');
    //const [emailError, setEmailError] = useState('');
    /*
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
    */

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication
           then call props on registerd user (username) */
        //const isReq = validate();
        porps.onRegistration(username);
        /*
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
        */
    };

    return (
        <Container fluid className='registerContainer'>
            <Navbar bg='navColor' variant='dark' expand='lg'>
                <Container fluid>
                    <Navbar.Brand href='#home'>myMovieFlix</Navbar.Brand>
                    <Nav className='me-auto'>
                        <Nav.Link href='#logout'>Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Row>
                <Col>
                    <CardGroup>
                        <Card className='registerCard'>
                            <Card.Body>
                                <Card.Title className='text-center'>Welcome to myMovieFlix!</Card.Title>
                                <Card.Subtitle className='mb-2 text-muted text-center'>Please register</Card.Subtitle>

                                <Form>
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

                                    <Button className='registerButton' variant="secondary" type='submit' onClick={handleRegister}>Register</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};