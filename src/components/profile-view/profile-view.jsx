import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Helmet from "react-helmet";
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import Col from 'react-bootstrap/Col';

import './profile-view.scss';
export class ProfileView extends React.Component {


  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: [],
      FavMovies: []
    }

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userInfo = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')


      });
      this.getMovies(accessToken);
      this.getUser(accessToken, userInfo);

    }

  }

  getUser(token, user) {
    axios.get(`https://horror-time.onrender.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('Got account Info');
        this.setState({
          userInfo: response.data,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });

      })
  }

  getMovies(token) {
    axios.get('https://horror-time.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log('got movies');
      })
  }


  handleDelete(user, token) {
    axios.delete(`https://horror-time.onrender.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      });

  }

  handleUpdate(user, token, e) {
    e.preventDefault();

    axios.put(`https://horror-time.onrender.com/users/${user} `,
      {
        Username: e.target.username.value,
        Password: e.target.password.value,
        Email: e.target.email.value,
        Birthday: e.target.birthday.value
      },
      {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        window.open(`/users/${data.Username}`);
      }).catch((e) => {
        console.log(e.toJSON());
        console.log(e.response.data);
      });

  }

  deleteFav(movie, user, token, userInfo) {
    axios.delete(`https://horror-time.onrender.com/users/${user}/movies/${movie}`,
      {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json',
        }
      }
    ).then((response) => {
      const data = response.data;
      let FavoriteMovies = [...this.state.FavoriteMovies];
      FavoriteMovies.splice(
        FavoriteMovies.indexOf(movie), 1)
      this.setState({
        FavoriteMovies
      });
      //window.location.reload();

    })
  }

  render() {

    const { user, token, movies, userInfo } = this.props;
    const FavMovies = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });
    const BirthDate = moment(this.state.Birthday);
    console.log(BirthDate);

    return (
      <>

        <Helmet bodyAttributes={{ style: 'background-color : black' }} />

        <Container className="align-items-center justify-content-md-center" bsPrefix="accountPage">
          <Row className="d-flex">
            <Col className="justify-content-md-center align-items-center mx-4 my-4">
              <h1 className="align-items-center">Account Information</h1>
              <Card className="bg-dark justify-content-md-center align-items-center" bsPrefix="accountCard">
                <Card.Body className="align-items-center justify-content-center">
                  <Row>
                    <Col>
                      <Card.Body>
                        <Card.Text>Username: </Card.Text>
                        <Card.Text>Email: </Card.Text>
                        <Card.Text>Birthday: </Card.Text>
                      </Card.Body>
                      <Accordion defaultActiveKey="1">
                        <Accordion.Toggle className="mb-4 mx-1" as={Button} variant="dark" eventKey="0">Update Account</Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">

                          <Form onSubmit={(e) => this.handleUpdate(user, token, e)}>
                            <Form.Row className="justify-content-center">
                              <Form.Label>Username:</Form.Label>
                              <Form.Control
                                type='text'
                                required
                                minLength="6"
                                maxLength="10"
                                placeholder='Enter Username'
                                value={this.state.username}
                                id='username'
                              />
                            </Form.Row>

                            <Form.Row className="justify-content-center">
                              <Form.Label>Password:</Form.Label>
                              <Form.Control
                                type='text'
                                required
                                minLength="6"
                                maxLength="10"
                                placeholder='Enter Password'
                                id='password'
                                value={this.state.password}


                              />
                            </Form.Row>

                            <Form.Row className="justify-content-center">
                              <Form.Label>Email:</Form.Label>
                              <Form.Control
                                type='text'
                                required
                                placeholder='Enter Email'
                                id='email'
                                value={this.state.email}
                              />
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                              <Form.Label >Birthday: </Form.Label>
                              <Form.Control
                                type='date'
                                required
                                id='birthday'
                                value={this.state.birthday}
                              />
                            </Form.Row>

                            <Button type="submit" variant="dark" block >Submit</Button>
                          </Form >
                        </Accordion.Collapse>
                      </Accordion>
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Text>{user}</Card.Text>
                        <Card.Text> {this.state.Email}</Card.Text>
                        <Card.Text>{BirthDate.format('MMM-DD-YYYY')}</Card.Text>
                      </Card.Body>
                      <Accordion defaultActiveKey="1">

                        <Accordion.Toggle as={Button} variant="dark" eventKey="0">Favorite Movies</Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div>{FavMovies.map((movie, index) => (
                              <div key={index}>{movie.Title} <Button onClick={(e) => this.deleteFav(movie._id, user, token, userInfo)} variant="dark" block>Delete</Button> </div>
                            ))}</div>
                          </Card.Body>

                        </Accordion.Collapse>
                      </Accordion>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br />
              <br />


              <Card bsPrefix="accountDeletion">
                <Card.Title>Warning: Account Deletion below</Card.Title>
                <Button block onClick={(e) => this.handleDelete(user, token)} variant="dark" >Delete My Account</Button>
              </Card>
            </Col>
          </Row>
        </Container>

      </>
    )


  }
}


ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};

export default ProfileView;


