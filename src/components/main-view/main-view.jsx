import React from 'react';
import axios from 'axios';

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../register-view/register-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import Navigation from "../navbar-view/navbar-view";

import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

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
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem("user")
            });
            //this.getMovies(accessToken);
            localStorage.clear();
        }
    }

    getMovies(token) {
        axios
            .get("https://movie-api-21197.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                // Assign the result to the state
                console.log("response", response.data);
                this.setState({ movies: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
        //This is when in case when the page isn't loading.
        //localStorage.clear();
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Navigation logOut={() => this.onLoggedOut()} />
                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route
                            exact
                            path="/"
                            render={() => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                            ;
                                        </Col>
                                    );

                                if (movies.length === 0) return <div className="main-view" />;

                                return movies.map((m) => (
                                    <Col
                                        sm={12}
                                        md={6}
                                        lg={3}
                                        key={m._id}
                                        className="movie-cards"
                                    >
                                        <MovieCard movie={m} />
                                    </Col>
                                ));
                            }}
                        />
                        <Route
                            path="/register"
                            render={() => {
                                if (user) return <Redirect to="/" />;
                                return (
                                    <Col>
                                        <RegistrationView />
                                    </Col>
                                );
                            }}
                        />
                        <Route
                            path={`/users/${user}`}
                            render={({ history }) => {
                                if (!user) return <Redirect to="/" />;
                                return (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            movies={movies}
                                            logOut={() => this.onLoggedOut()}
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/movies/:movieId"
                            render={({ match, history }) => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                            ;
                                        </Col>
                                    );
                                return (
                                    <Col md={8}>
                                        <MovieView
                                            movie={movies.find(
                                                (movie) => movie._id === match.params.movieId
                                            )}
                                            user={user}
                                            onBackClick={() => history.goBack()}
                                        />
                                    </Col>
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/director/:Name"
                            render={({ match }) => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                            ;
                                        </Col>
                                    );
                                if (movies.length === 0) return <div className="main-view" />;
                                return (
                                    <Col md={8}>
                                        <DirectorView
                                            director={
                                                movies.find(
                                                    (movie) => movie.Director.Name === match.params.name
                                                ).Director
                                            }
                                        />
                                    </Col>
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/genres/:id"
                            render={({ match }) => {
                                if (!user)
                                    return (
                                        <Col>
                                            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                            ;
                                        </Col>
                                    );
                                if (movies.length === 0) return <div className="main-view" />;
                                return (
                                    <Col md={8}>
                                        <GenreView
                                            genre={
                                                movies.find((movie) =>
                                                    movie.Genre.includes(match.params.id)
                                                ).Genre
                                            }
                                        />
                                    </Col>
                                );
                            }}
                        />
                    </Row>
                </Container>
            </Router>
        );
    }
}