import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import CardGroup from 'react-bootstrap/CardGroup';
import Helmet from "react-helmet";
import './movie-card.scss';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Nav,
  Link,
  Brand,
} from "react-router-dom";

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
                <Button onClick={() => onMovieClick(movie)}
                  variant="primary">Movie Info</Button>
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