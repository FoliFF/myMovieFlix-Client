import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../register-view/register-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col, Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "./main-view.scss";

export class MainView extends React.Component {

    constructor() {
        super();
        //Initial state is set to null.
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            isRegistered: null
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
        axios.get('https://movie-api-21197.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
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

    //For a successfully registered user.
    onRegistration(isRegistered) {
        this.setState({
            isRegistered
        });
    }

    /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie */
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    render() {
        const { movies, selectedMovie, user, isRegistered } = this.state;
        if (!user) {
            return (<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />);
        }

        if (!isRegistered) {
            return (<RegistrationView onRegistration={(isRegistered) => this.onRegistration(isRegistered)} />);
        }



        if (movies.length === 0) { return <div className="main-view" />; }

        return (
            <div className="main-view justify-content-md-center">
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
                <Container>
                    {selectedMovie ? (
                        <Row className="justify-content-lg-center">
                            <Col md={9}>
                                <MovieView
                                    movie={selectedMovie}
                                    onBackClick={(newSelectedMovie) => {
                                        this.setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Row className="justify-content-lg-center">
                            {movies.map((movie) => (
                                <Col md={4}>
                                    <MovieCard
                                        key={movie._id}
                                        movie={movie}
                                        onMovieClick={(movie) => {
                                            this.setSelectedMovie(movie);
                                        }}
                                    />
                                </Col>
                            ))
                            }
                        </Row>)}

                </Container>
            </div>
        );
    }
}