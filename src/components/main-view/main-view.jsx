import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Silence of the Lambs', Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.', ImagePath: 'https://s3.amazonaws.com/criterion-production/films/46014912ca0c20592c472f5bbe33e4f8/L9AQ95Y7z2vOIUf1ntwvpZsZx3kp8B_large.jpg' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...' }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty</div>;


    if (selectedMovie) return (
      <div className="main-view">
        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
      </div>
    )


    return (
      <div className="main-view">
        {
          movies.map(
            movie => <MovieCard key={movie._id} movie={movie} onMovieClick={movie => { this.setSelectedMovie(movie) }} />
          )
        }
      </div>
    );




  }
}
