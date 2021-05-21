import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Nav } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  getMovies(token) {
    axios.get('https://itshorrortime.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
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
          <Row>
            <Navbar style={{ width: "100%" }} bg="dark" variant="dark">
              <Navbar.Brand href="#movies">HorrorTime</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link>Movies</Nav.Link>
                <Nav.Link href="/genres">Genres</Nav.Link>
                <Nav.Link href="/directors">Directors</Nav.Link>
                <Nav.Link href="/account">Account</Nav.Link>
              </Nav>
              <Form style={{ margin: "auto" }} inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
              <Nav.Item>
                <Button variant="dark" onClick={() => { this.onLoggedOut() }}>Logout</Button>
              </Nav.Item>
            </Navbar>
            <br />
          </Row>
        </Container>
        <Router>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route exact path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route exact path="/genres/:name" render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
              </Col>
            }} />
            <Route exact path="/directors/:name" render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              </Col>
            }} />
          </Row>
        </Router>
      </>
    );
  }

}
export default MainView;