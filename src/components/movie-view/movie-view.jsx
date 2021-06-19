import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Row from 'react-bootstrap/Row';
import Helmet from "react-helmet";
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: ''

    }

  }
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
    const { movie, onBackClick, user } = this.props;

    return (
      <>


        <Helmet bodyAttributes={{ style: 'background-color : black' }} />
        <Container className="justify-content-center align-items-center">
          <Button variant="dark" onClick={() => history.back()}>Back</Button>

          <CardGroup className="bg-dark my-5 mx-5 ">
            <Card className='movie-view bg-dark text-white my-5 mx-5 justify-content-center align-items-center'>

              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body className='movie-description'>Description: {movie.Description}</Card.Body>

              <Card.Body>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="dark" className='my-5'>Genre: {movie.Genre.Name} </Button>
                </Link>

                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="dark">Director: {movie.Director.Name} </Button>
                </Link>
              </Card.Body>


              <Row>
                <Col className="justify-content-center my-5">

                </Col>
                <Col className="justify-content-center">


                </Col>
              </Row>
            </Card>
          </CardGroup>
        </Container>

      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
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
  }).isRequired
};