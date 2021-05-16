import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Nav,
  withRouter
} from "react-router-dom";
import Helmet from "react-helmet";
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(' https://itshorrortime.herokuapp.com/login', {
      Username: username,
      Password: password
    })//.then(result => {
    props.onLoggedIn(username);
    //console.log(result);
    //})
    /// .catch(e => {
    //  console.log('Invalid User');
    // });
  };


  return (

    <Container className="container1">
      <Helmet bodyAttributes={{ style: 'background-color : black' }} />

      <Container>
        <Form.Row className="justify-content-center mt-5">
          <Form className="container2 justify-content-enter">
            <Form.Row className="justify-content-center">
              <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center">
              <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center mb-3">
              <Button variant="dark" block type='submit' onClick={handleSubmit}>Submit</Button>
              <Button variant="outline-dark" block onClick={props.toggleView}>Don't have an account?</Button>
            </Form.Row>
          </Form>
        </Form.Row >
      </Container >
    </Container >
  )
}