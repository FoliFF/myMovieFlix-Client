import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../register-view/register-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar-view/navbar-view';

import { Row, Col, Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./main-view.scss";


export class MainView extends React.Component {

    constructor() {
        super();
        //Initial state is set to null.
        this.state = {
            movies: [],
            user: null,
        }
    }

    /*
     * https://movie-api-21197.herokuapp.com/login?Username=Alice1&Password=new2123
     * Username=Alice1
     * Password=new2123
     */
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        const tokens = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkxMDBkMTUxMjM0ZjhlNjVkZDA4YjIiLCJVc2VybmFtZSI6IkFsaWNlMSIsIlBhc3N3b3JkIjoiJDJiJDEwJFhHZmFhT0tMM3N3T0sxWHMzb2l6QS4xTGpvclpSRXNoNHVLTzVrS3JCR1FPVHpGUEpLa21TIiwiRW1haWwiOiJhbGllY0BnbWFpbC5jb20iLCJCaXJ0aGRheSI6IjIwMDAtMTAtMTBUMDA6MDA6MDAuMDAwWiIsIkZhdm9yaXRlTW92aWVzIjpbXSwiX192IjowLCJpYXQiOjE2NTY2OTU0NjUsImV4cCI6MTY1NjcyNDI2NSwic3ViIjoiQWxpY2UxIn0.jO1wKZstN6vWXOILCXF3xT4woPFL5YSBgjo37Ic2DcA';
        axios.get('https://movie-api-21197.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${tokens}` }
        }).then(response => {
            // Assign the result to the state
            console.log("response", response.data);
            this.setState({ movies: response.data });
        }).catch(function (error) {
            console.log(error);
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, user } = this.state;

        if (!user) return <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        </Row>
        if (movies.length === 0) return <div className="main-view" />;

        return (


            /*
                <Navbar className="mb-5" id="techFlixNav" bg="navColor" variant="dark" expand="lg" sticky="top">
                    <Container fluid>
                        <Navbar.Brand id="appName" href="#home">myMovieFlix</Navbar.Brand>
                        <Navbar.Toggle className="toggle" />
                        <Navbar.Collapse className="justify-content-end toggle">
                            <Nav.Link id="link" href="">
                                MyPage
                            </Nav.Link>
                            <Nav.Link id="link" href="">
                                Movies
                            </Nav.Link>
                            <Nav.Link id="link" href="">
                                Logout
                            </Nav.Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            */
            <Router>
                <NavbarView user={user} />
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;

                        return movies.map(m => (
                            <Col md={6} lg={4} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />

                    {/* route for link on main-view to profile-view */}
                    <Route path={`/users/${user}`} render={({ match, history }) => {
                        if (!user) return <Redirect to="/" />
                        return <Col>
                            <ProfileView user={user} history={history} movies={movies} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                </Row>
            </Router>
        );
    }
}