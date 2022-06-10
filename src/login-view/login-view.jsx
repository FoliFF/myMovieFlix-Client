import React, { useState } from 'react';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
    };
    /* 
        Send a request to the server for authentication
        then call props.onLoggedIn(username) 
        props.onLoggedIn(username); 
    */

    /* const handleSubmit = (e) => {
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
        </form>
    );
}