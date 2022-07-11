import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../register-view/register-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navigation } from '../navbar-view/navbar-view';

import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./main-view.scss";


export class MainView extends React.Component {

    constructor() {
        super();
        //Initial state is set to null.
        this.state = {
            movies: [],
            user: null,
            selectedMovie: null,
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
        //localStorage.clear();
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
        //Use localStorage.clear(); if the movies doesn't list
        //localStorage.clear();
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        //Use localStorage.clear(); if the movies doesn't list
        //localStorage.clear();
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
            <Router>
                <Navigation user={user} />
                <Route
                    path="/movies/:movieID"
                    render={({ match }) => {
                        return (
                            <Col md={8}>
                                <MovieView
                                    movie={movies.find((m) => m._id === match.params.MovieId)}
                                />
                            </Col>
                        );
                    }}
                />
                <Route
                    exact
                    path="/"
                    render={() => {
                        if (!user)
                            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return movies.map((m) => (
                            <Col md={10} key={m._id}>
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
                    exact
                    path="/movies/:movieId"
                    render={({ match, history }) => {
                        if (!user)
                            return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return (
                            <Col md={8}>
                                <MovieView
                                    movie={movies.find((m) => m._Id === match.params.MovieId)}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }}
                />
                <Route
                    exact
                    path="/genres/:name"
                    render={({ match }) => {
                        if (!user)
                            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return (
                            <Col md={8}>
                                <GenreView
                                    genre={
                                        movies.find((m) => m.Genre.Name === match.params.name).Genre
                                    }
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }}
                />
                <Route
                    exact
                    path="/directors/:name"
                    render={({ match, history }) => {
                        if (!user)
                            return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return (
                            <Col md={8}>
                                <DirectorView
                                    director={
                                        movies.find((m) => m.Director.Name === match.params.name)
                                            .Director
                                    }
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }}
                />
                <Route
                    path="/users/:username"
                    render={({ history, match }) => {
                        if (!user)
                            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return (
                            <Col md={10}>
                                <ProfileView
                                    history={history}
                                    movies={movies}
                                    user={user === match.params.username}
                                />
                            </Col>
                        );
                    }}
                />
            </Router>
        );
    }
}