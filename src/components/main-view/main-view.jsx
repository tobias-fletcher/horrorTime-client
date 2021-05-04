import React from 'react';
<<<<<<< HEAD
import { MovieCard } from '../movieCard/movie-card';
import { MovieView } from '../movieView/movie-view';
=======
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
>>>>>>> 2b37eff4332fb61c84c4a29a4c8ab3a6fe90c713


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...' },
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
