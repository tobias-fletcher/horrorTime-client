import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Helmet from "react-helmet";
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import FormControl from 'react-bootstrap/FormControl';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalDialog from 'react-bootstrap/ModalDialog';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col'

export class ProfileView extends React.Component {


  constructor() {
    super();
    this.state = { Username: '' }
    this.state = { Password: '' }
    this.state = { Email: '' }
    this.state = { Birthday: '' }
    this.state = { FavoriteMovies: [] }
    this.state = { FavMovies: [] }
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
    axios.get(`https://itshorrortime.herokuapp.com/users/${user}`, {
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
    axios.get('https://itshorrortime.herokuapp.com/movies', {
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
    axios.delete(`https://itshorrortime.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      });

  }

  handleUpdate(user, token, e) {
    console.log('you are in handleUpdate');
    console.log(this.state.Username);
    console.log(this.state.Password);

    console.log(e.target.username.value);

    e.preventDefault();

    axios.put(`https://itshorrortime.herokuapp.com/users/${user} `,
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
        console.log(response);
        const data = response.data;
        localStorage.setItem("user", data.Username);
        console.log(data);
        window.open(`/users/${data.Username}`);
      }).catch((e) => {
        console.log(e.toJSON());
        console.log(e.response.data);

      });

  }

  deleteFav(movie, user, token, userInfo) {
    console.log(movie);
    console.log(token);

    axios.delete(`https://itshorrortime.herokuapp.com/users/${user}/movies/${movie}`,
      {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json',
        }
      }
    ).then((response) => {
      console.log(response);
      const data = response.data;
      this.setState({
        FavMovies: response.data
      });
      window.location.reload();

    })
  }

  render() {

    const { user, token, movies, userInfo } = this.props;
    const FavMovies = movies.filter((movie) => {
      return userInfo.FavoriteMovies.includes(movie._id);
    });

    return (
      <>
     
              <Helmet bodyAttributes={{ style: 'background-color : black' }} />
              <Container className="align-items-center justify-content-md-center">
<Row className="justify-content-md-center align-items-center d-flex">
  <Col xs={8} md={7} className="justify-content-md-center mx-4 my-4">
        <h1 className="align-items-center">Account Information</h1>
        <Card className="bg-dark justify-content-md-center align-items-center">
          
         
          <Card.Body>
            <Card.Text>Username: {user}</Card.Text>
            <Card.Text>Email:{this.state.Email}</Card.Text>
            <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
            </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card>
             

             
          <Accordion defaultActiveKey="0">
         
           <Accordion.Toggle as={Button} variant="dark" eventKey="0">
            Update Information
           </Accordion.Toggle>
        
        <Accordion.Collapse eventKey="0">
      

           <Form onSubmit={(e) => this.handleUpdate(user, token, e)}>
            <Form.Row className="justify-content-center">
             <Form.Label>Username:</Form.Label>
               <Form.Control
                type='text'
                required
                minLength="6"
                maxLength="12"
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
              maxLength="12"
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
      
          </Card>
       
          
          </Col>
        
        <Card>
          <Col xs={8} md={12}>
            <Card.Title>FavoriteMoviesList</Card.Title>
            <Card.Body>

              <div>{FavMovies.map((movie, index) => (
                <div key={index}>{movie.Title} <Button onClick={(e) => this.deleteFav(movie._id, user, token, userInfo)} variant="dark" block>Delete</Button> </div>
              ))}</div>

            </Card.Body>
          </Col>
        </Card>
        </Row>
        </Container>
                <br/>


      

        <Button onClick={(e) => this.handleDelete(user, token)} variant="dark" block>Delete My Account</Button>




      </>
    )


  }
}


ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};

export default ProfileView;


