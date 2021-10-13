import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Helmet from "react-helmet";
import './genre-view.scss';

export class GenreView extends React.Component {



  render() {
    const { genre, movies } = this.props;


    return (
      <div>
        <Helmet bodyAttributes={{ style: 'background-color : black' }} />

        <Card className="bg-dark text-white mt-5 mx-4" style={{ height: "24rem" }}>
          <Card.Body className="justify-content align-items" >
            <Card.Title style={{ height: "3rem" }}>{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="dark" onClick={() => history.back()}>Back</Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })


}
