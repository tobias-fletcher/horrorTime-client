import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import './movie-card.scss';
import Col from 'react-bootstrap';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

export class MovieCard extends React.Component {


  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      user: null,
      register: true,
      director: [],
      token: null,
      userInfo: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userInfo = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token'),

      });
      // this.getMovies(accessToken);
      // this.getUser(accessToken, userInfo);
    }
  }



  addFav(movie, user, token, userInfo) {

    console.log(this.props.movie._id);
    console.log(movie);
    console.log(user.user);
    console.log(user.token);

    axios.post(`https://itshorrortime.herokuapp.com/users/${user.user}/movies/${this.props.movie._id}`, {
    },
      {
        headers: {
          'Authorization': `Bearer ${user.token} `,
          'Content-Type': 'application/json',
        }
      }
    ).then((response) => {
      const data = response;
      console.log(response);
      console.log(movie);
      this.setState({
        FavoriteMovies: response.data
      })
    })
  }


  render() {
    const { movie, token } = this.props;
    const user = this.state;

    const App = () => {
      const alert = useAlert()
    }

    return (
      <>

        <Helmet bodyAttributes={{ style: 'background-color : black' }} />


        <Card style={{ flex: 1 }} body bsPrefix="maximumW" className="bg-dark text-white mt-5 mx-2" style={{ height: "24rem" }}>

          <Card.Body className="justify-content-center align-items-center" >
            <Button block variant="dark" onClick={(e) => this.addFav(movie, user, token)}>Add</Button>
            <Card.Img variant="top" src={movie.ImagePath} style={{ height: "11rem" }} />
            <Card.Title className="my-2 align-items-center" >{movie.Title}</Card.Title>

            <Link to={`/movies/${movie._id}`}>
              <Button variant="info" className="buttonInfo">Read More</Button>
            </Link>
            <br />

          </Card.Body>
        </Card >
        <br />


      </>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    Year: PropTypes.string
  }).isRequired,


};
