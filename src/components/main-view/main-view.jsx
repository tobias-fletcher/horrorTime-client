import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Menu from '../menu/Menu';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

//add config file for url to use throughout code

class MainView extends React.Component {

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
    this.onLoggedOut = this.onLoggedOut.bind(this)
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userInfo = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token'),

      });
      this.getMovies(accessToken);
      this.getUser(accessToken, userInfo);
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
      user: authData.user.Username,
      token: authData.token
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUser(authData.token, authData.user.Username)
  }

  //rewrite as arrow function (instead of bindthis)
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  getMovies(token) {
    axios.get('https://itshorrortime.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        console.log(response.data);
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token, user) {
    axios.get(`https://itshorrortime.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('Got account Info');
        this.setState({
          userInfo: response.data,
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

  onUpdate(update) {
    this.setState({
      update
    });
    console.log(update)
  }

  render() {
    let { movies } = this.props;
    const { user, token, userInfo } = this.state;
    console.log(movies);

    return (

      <>
        <Router>


          <Menu style={{ width: "100%" }} user={user} logOut={this.onLoggedOut} />
          <br />

          <div className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view align-items-center" />;
              return <MoviesList user={user} />;
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path="/genres/:name" render={({ match }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={`/users/${user}`} render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.inLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />
              return <Col className=" align-items-center">
                <ProfileView user={user} movies={movies} getMovies={(token) => this.getMovies(token)} token={token} userInfo={userInfo} onBackClick={() => history.goBack()} />
              </Col>
            }} />



          </div>
        </Router>
      </>
    );
  }

}

let mapStateToProps = state => {
  const { user, movies } = state;
  return { movies, user }
}

export default connect(mapStateToProps, { setMovies })(MainView);