import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Helmet from "react-helmet";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import Link, { useParams } from 'react-router-dom';


export class ProfileView extends React.Component {


  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: true,
      director: [],
      token: null

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
        });

      })
  }



  handleDelete() {
    axios.delete(`https://itshorrortime.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      });
  }

  handleUpdate() {
    axios.put(`https://itshorrortime.herokuapp.com/users/${user}`, {
      Username: this.state.Username,
      Birthday: this.state.Birthday,
      Email: this.state.Email,
      Password: this.state.Password

    },
      console.log('updated'),
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        alert(user + " has been updated");
        console.log(response);
      }).catch((e) => {
        console.log('error');
      })

  }



  render() {

    const { user, token, userInfo } = this.props;

    console.log(this.props);


    return (
      <>
        <Helmet bodyAttributes={{ style: 'background-color : black, text-decoration-color : white' }} />
        <Card>
          <Card.Title> Account Information</Card.Title>
          <Card.Body>
            <Card.Text>Username: {user}</Card.Text>
            <Card.Text>Birthdate: {userInfo.Birthday}</Card.Text>
            <Card.Text>Email: {userInfo.Email}</Card.Text>
          </Card.Body>

          <Card.Body>
            {/*make drop down when clicking update information to pull up update form*/}

            <Button>Update Information</Button>

          </Card.Body>

        </Card>
        <Form.Row className="justify-content-center mt-5">

          <Form onSubmit={this.handleUpdate}>
            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='validationCustomUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  required
                  minLength="6"
                  maxLength="12"
                  placeholder='Enter Username'
                  onClick={this.handleSubmit}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='validationCustomUsername'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='text'
                  required
                  minLength="6"
                  maxLength="12"
                  placeholder='Enter Password'
                  onClick={this.handleSubmit}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='validationCustomUsername'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='text'
                  required
                  placeholder='Enter Email'
                  onClick={this.handleSubmit}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='customValidationBirthdate'>
                <Form.Label >Birthdate: </Form.Label>
                <Form.Control
                  type='date'
                  onClick={this.handleSubmit}
                />
                <Form.Control.Feedback type="invalid">Please enter your birthdate</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>


            <Button type="submit" onClick={this.handleUpdate} variant="dark" block >Submit</Button>
            <Button onClick={this.handleDelete} variant="dark" block>Delete</Button>
          </Form >
        </Form.Row >

      </>
    )


  }
}

export default ProfileView;

ProfileView.propTypes = {
  UserInfo: PropTypes.shape({
    Username: propTypes.string,
    Birthday: propTypes.string,
    Email: propTypes.string,
    _id: propTypes.strin
  })
}

