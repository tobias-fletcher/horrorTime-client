import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  History,
  Link
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: true
    }
    this.toggleView = this.toggleView.bind(this)
  }

  componentDidMount() {
    axios.get('https://itshorrortime.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  toggleView(e) {
    e.preventDefault();
    this.setState({
      register: !this.state.register
    })

  }


  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleView={this.toggleView} />;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleView={this.toggleView} />;
    if (movies.length === 0) return <div className="main-view" />;


    return (

      <>
        <Container>
          <Row block>
            <Navbar style={{ width: "100%" }} bg="dark" variant="dark">
              <Navbar.Brand style={{ margin: "auto" }} href="#movies">HorrorTime</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/genres">Genres</Nav.Link>
                <Nav.Link href="/directors">Directors</Nav.Link>
                <Nav.Link href="/account">Account</Nav.Link>
              </Nav>
              <Form style={{ margin: "auto" }} inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            <br />
          </Row>
        </Container>
        <Container>
          <Row className="main-view justify-content-md-center">
            {selectedMovie
              ? (
                <Col>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
              : movies.map(movie => (
                <Col>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </>
    );
  }

}
export default MainView;