import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
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
    }; */

  return (
    <Form>
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