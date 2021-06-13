import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import CardDeck from 'react-bootstrap/CardDeck'
import { Card } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
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
      <visibilityFilterInput visibilityFilter={visibilityFilter} />
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
    </Row>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);