import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar-view.scss";

export function Navigation({ logOut }) {
    const user = localStorage.getItem('user');
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    const isAuth = () => {
        //if (typeof window == 'undefined') {
        //  return false;
        // }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    };

    return (
        <Navbar
            id="main-nav"
            className="mb-5"
            bg="dark"
            variant="dark"
            expand="lg"
            sticky="top"
        >
            {/*<Container>*/}
            <Navbar.Brand id="appName" href="/">
                techFlix
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
                className="justify-content-end"
                id="responsive-navbar-nav"
            >
                <Nav>
                    {isAuth() && (
                        <Nav.Link className="navbar-link" href={`/users/${user}`}>
                            MyPage
                        </Nav.Link>
                    )}

                    {isAuth() && (
                        <Button
                            className="navbar-button"
                            variant="outline-danger"
                            onClick={logOut}
                        >
                            LogOut
                        </Button>
                    )}
                </Nav>
            </Navbar.Collapse>
            {/*</Container>*/}
        </Navbar>
    );
}

export default Navigation;