import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <>


        <Helmet bodyAttributes={{ style: 'background-color : black' }} />
        <CardGroup >
          <Card body bsPrefix="maximumW" className="bg-dark text-white mt-5 mx-4" style={{ height: "24rem" }}>
            <Card.Body className="justify-content align-items" >
              <Card.Img variant="top" src={movie.ImagePath} style={{ height: "11rem" }} />
              <Card.Title style={{ height: "3rem" }}>{movie.Title}</Card.Title>
              <Card.Footer className="mb-3">
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="dark">Movie Info</Button>
                </Link>
              </Card.Footer>
            </Card.Body>
          </Card>
        </CardGroup>
      </>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    Year: PropTypes.string.isRequired
  }).isRequired
};