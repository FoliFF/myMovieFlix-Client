import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

import "./register-view.scss";

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
<<<<<<< HEAD
        /* Send a request to the server for authentication
           then call props on registerd user (username) */
        //const isReq = validate();
        porps.onRegistration(true);
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
=======
        props.onRegistration(username);
>>>>>>> Task3_4
    };

    return (
        <Form>
            <h2 className="mb-3 mx-auto mt-5">Registration</h2>

            <Form.Group className="mb-3 mx-auto mt-4" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter a username"
                />
            </Form.Group>

            <Form.Group className="mb-3 mx-auto mt-4">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="5"
                    placeholder="at least 5 characters"
                />
            </Form.Group>

            <Form.Group className="mb-3 mx-auto mt-4">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3 mx-auto mt-4">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </Form.Group>

            <Button className="mt-4" type="submit" onClick={handleSubmit}>
                Register
            </Button>
        </Form>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};