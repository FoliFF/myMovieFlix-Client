import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { RegistrationView } from '../register-view/register-view';
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
    axios.post('https://movie-api-21197.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    }).catch(e => {
      console.log('No such user');
      alert('Wrong Username or Password. Please register if you are here for the first time.')
    });
    //console.log(username, password);
    //Send a request to the server for authentication then call props.onLoggedIn(username) 
    //props.onLoggedIn(username);
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
    <Container>
      <Row className='justify-content-md-center'>
        <Col></Col>
        <Col>
          <Card style={{ marginTop: 100, marginBotton: 50, width: 30, backgroundColor: 'red' }}>
            <Form className='login-boder'>
              <Form.Group controlId='fromUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='fromPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='Password' onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>


    /* Code for task 3.4
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="sumbit" onClick={handleSubmit}>Submit</button>
    </form> */
  );
}

LoginView.PropTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};