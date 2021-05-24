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
      Username: "",
      Password: "",
      Email: "",
      Birthdate: "",
      movies: [],
      selectedMovie: null,
      register: true,

      userInfo: null


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
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          // Birthdate: response.data.Birthdate,

        });

      })
  }



  /*handleDelete(user, token) {
    axios.delete(`https://itshorrortime.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      });
  }*/

  handleUpdate(user, token, e) {
    axios.put(`https://itshorrortime.herokuapp.com/users/${user}`, {
      Username: this.state.Username,
      Birthdate: this.state.Birthdate,
      Email: this.state.Email,
      Password: this.state.Password

    },
      console.log(this.state.Username),
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        console.log(response.data);
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
            <Card.Text>Birthdate: {userInfo.Birthdate}</Card.Text>
            <Card.Text>Email: {userInfo.Email}</Card.Text>
          </Card.Body>

          <Card.Body>
            {/*make drop down when clicking update information to pull up update form*/}

            <Button>Update Information</Button>

          </Card.Body>

        </Card>
        <Form.Row className="justify-content-center mt-5">

          <Form onSubmit={this.handleUpdate(user, token, userInfo)}>
            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='validationCustomUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  required
                  minLength="6"
                  maxLength="12"
                  placeholder='Enter Username'

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

                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='customValidationBirthdate'>
                <Form.Label >Birthdate: </Form.Label>
                <Form.Control
                  type='date'

                />
                <Form.Control.Feedback type="invalid">Please enter your birthdate</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>


            <Button type="submit" onClick={this.handleUpdate(user, token)} variant="dark" block >Submit</Button>
          </Form >
        </Form.Row >
        { /*  <Button onClick={this.handleDelete(user, token)} variant="dark" block>Delete</Button>*/}

      </>
    )


  }
}

export default ProfileView;

ProfileView.propTypes = {
  UserInfo: PropTypes.shape({
    Username: propTypes.string,
    Birthdate: propTypes.string,
    Email: propTypes.string,
    _id: propTypes.strin
  })
}

