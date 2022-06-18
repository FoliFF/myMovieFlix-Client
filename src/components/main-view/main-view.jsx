import React from 'react';
import axios from 'axios';

import { LoginView } from '../../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./main-view.scss";

export class MainView extends React.Component {

    constructor() {
        super();
        //Initial state is set to null.
        this.state = {
            movies: [],
            /*movies: [
                { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', ImagePath: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/' },
                { _id: 2, Title: 'The Lord of the Rings: The Fellowship of the Ring', Description: 'A meek Hobit takes a journey with his friends to destroy the one ring to rule them all.', ImagePath: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/' },
                { _id: 3, Title: 'Your Name', Description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?', ImagePath: 'https://www.imdb.com/title/tt0347149/mediaviewer/rm2426685696/' }
            ],*/
            selectedMovie: null,
            user: null
        }
    }

    componentDidMount() {
        axios.get('https://flix-db-823.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            }).catch(error => {
                console.log(error);
            });
    }

    getMovies(token) {
        axios.get('https://movie-api-21197.herokuapp.com/', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            this.setState({
                movies: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

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

    onRegister() {
        this.setState({
            isRegistered: false
        });
    }



    /**
     * https://movie-api-21197.herokuapp.com/login?Username=Alice1&Password=new2123
     * 
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
     * 
     * 
     */


    /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie */
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({ user });
    }

    render() {

        const { movies, selectedMovie, user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


        //Commented out these just incase I need to revert.
        //if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0)
            return <div className='main-view'>The list of movies is empty!</div>

        // Before the movies have been loaded
        if (movies.length === 0)
            return <div className='main-view' />;

        return (
            <Row className="main-view justify-content-md-center">
                {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    )
                    : movies.map(movie => (
                        <Col md={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                        </Col>
                    ))
                }
            </Row>
        );
    }
}

export default MainView;