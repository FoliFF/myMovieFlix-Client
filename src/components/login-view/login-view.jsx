import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
//import axios from 'axios';
import PropTypes from 'prop-types';
import "./login-view.scss";

/*
 * Credentials I know works for the myMovieFlix-Client;
 * https://movie-api-21197.herokuapp.com/login?Username=Alice1&Password=new2123
 * Username=Alice1
 * Password=new2123
 */

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /*
    axios.post('https://movie-api-21197.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    }).catch(e => {
      console.log('No such user');
      alert('Wrong Username or Password. Please register if you are here for the first time.')
    });*/
    //Send a request to the server for authentication then call props.onLoggedIn(username) 
    props.onLoggedIn(username);
  };

  /* THIS IS FROM ARON SUNDAY AND ME TRYING TO UNDERSTAND THE CODE 

  const handleSubmit = (e) => {
      e.preventDefault();
      const isReq = validate();
      if (isReq) {
        axios
          .post('https://movie-api-21197.herokuapp.com/login', {
            Username: username,
            Password: password,
          })
          .then((response) => {
            const data = response.data;
            props.onLoggedIn(data);
          })
          .catch((e) => {
            console.log('no such user');
            alert(
              'Wrong Username or Password. If you are new here, please register first.'
            );
          });
      }
    }; 
  */

  return (
    <Container fluid className='loginContainer'>

      <Navbar bg='navColor' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand href='#home'>myMovieFlix</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='#logout'>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Card className='loginCard'>
        <Card.Body>
          <Card.Title className='text-center'>Welcome to myMovieFlix!</Card.Title>
          <Card.Subtitle className='mb-2 text-muted text-center'>Please Login</Card.Subtitle>

          <Form>
            <Form.Group controlId='fromUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                ype='text'
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='fromPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className='mb-3'
                type='Password'
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className='loginBotton'
              variant='secondary'
              type='submit'
              onClick={handleSubmit}>Login
            </Button>
          </Form>
        </Card.Body>

      </Card>
    </Container>
  );
}

LoginView.PropTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};