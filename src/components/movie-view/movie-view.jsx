import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Image from 'react-bootstrap/Image';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Nav,
  withRouter
} from "react-router-dom";
import Helmet from "react-helmet";
export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }


  render() {
    const { movie, onBackClick } = this.props;


    return (
      <>
        <Helmet bodyAttributes={{ style: 'background-color : black' }} />

        <CardGroup className="bg-dark my-5 mx-5">
          <Card className='movie-view bg-dark text-white my-5 mx-5 justify-content-center align-items-center'>
            <Image src={`/img/${movie.ImagePath}`} />
            <Card.Title className='label justify-content-center'>Title: {movie.Title} </Card.Title>
            <Card.Body className='movie-description'>Description: {movie.Description}</Card.Body>
            <Card.Body className='movie-Genre'>Genre: {movie.Genre.Name}</Card.Body>
            <Card.Body className='movie-director'>
              <span className='label'>Director: </span>
              <span className='value'>{movie.Director.Name}</span>
              <br />
              <span className='label'>Bio: </span>
              <span className='value'>{movie.Director.Bio}</span>
              <br />
              <span className='label'>Birth year: </span>
              <span className='value'>{movie.Director.Birth}</span>
            </Card.Body>
            <Card.Footer>
              <Button variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card.Footer>
          </Card>
        </CardGroup>

      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};