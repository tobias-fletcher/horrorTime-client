import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Helmet from "react-helmet";
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import FormControl from 'react-bootstrap/FormControl';


export class ProfileView extends React.Component {


  constructor() {
    super();
    this.state = { Username: '' }
    this.state = { Password: '' }
    this.state = { Email: '' }
    this.state = { Birthday: '' }

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userInfo = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')

      });
      /*this.getMovies(accessToken);*/
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
          Birthday: response.data.Birthday
        });

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
        window.open(`/users/${user}`);
      }).catch((e) => {
        console.log(e.toJSON());
        console.log(e.response.data);

      });

  }




  render() {

    const { user, token, userInfo, movie } = this.props;


    console.log(userInfo);


    return (
      <>
        <Helmet bodyAttributes={{ style: 'background-color : black, text-decoration-color : white' }} />
        <Card>
          <Card.Title> Account Information</Card.Title>
          <Card.Body>
            <Card.Text>Username: {user}</Card.Text>
            {/*<Card.Text>Email:{userInfo.Email}</Card.Text>*/}
          </Card.Body>
          <Card.Body></Card.Body>
          <Card.Body>
            {/*make drop down when clicking update information to pull up update form*/}

            <Button>Update Information</Button>
            <Button>Show Movie List</Button>
          </Card.Body>

        </Card>


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

        <Button onClick={(e) => this.handleDelete(user, token)} variant="dark" block>Delete</Button>

      </>
    )


  }
}

export default ProfileView;

ProfileView.propTypes = {
  User: PropTypes.shape({
    Username: propTypes.string,
    Password: propTypes.string,
    Email: propTypes.string


  })
}

