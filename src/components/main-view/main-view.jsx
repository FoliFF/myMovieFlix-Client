import React from 'react';
import axios from 'axios';

//import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            /*movies: [
                { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', ImagePath: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/' },
                { _id: 2, Title: 'The Lord of the Rings: The Fellowship of the Ring', Description: 'A meek Hobit takes a journey with his friends to destroy the one ring to rule them all.', ImagePath: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/' },
                { _id: 3, Title: 'Your Name', Description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?', ImagePath: 'https://www.imdb.com/title/tt0347149/mediaviewer/rm2426685696/' }
            ],*/
            selectedMovie: null
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

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {

        const { movies, selectedMovie } = this.state;
        //Commented out these just incase I need to revert.
        //if (selectedMovie) return <MovieView movie={selectedMovie} />;

        /*if (movies.length === 0)
            return <div className='main-view'>The list of movies is empty!</div>*/

        if (movies.length === 0)
            return <div className='main-view' />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} /> //onMovieClick={(movie) => { this.setSelectedMovie(movie)
                    ))
                }
            </div>
        );
    }
}

export default MainView;