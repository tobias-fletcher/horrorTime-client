import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {
  const { visibilityFilter, movies } = state;
  return { visibilityFilter, movies };
};

function MoviesList(props) {

  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list my-3">
    <Row>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
    </Row>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);