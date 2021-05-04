import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Silence of the Lambs', Description: '..', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg' },
        { _id: 2, Title: 'You should have left', Description: 'written and directed by genre superstar screenwriter David Koepp, follows retired banker Theo Conroy (Kevin Bacon), his actress wife Susanna (Amanda Seyfried), and their young daughter Ella (Avery Tiiu Essex) to a rental house in the Welsh countryside.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/7/73/You_Should_Have_Left_Poster_2020.jpeg' },
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
