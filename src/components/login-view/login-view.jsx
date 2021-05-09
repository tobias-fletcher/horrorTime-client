import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RegistrationView } from '../registration-view/registration';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Nav
} from "react-router-dom";

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
    <>
      <Form>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant='success' type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <Router>
        <Link to="/users">Register</Link>
        <Route
          path='/users'
          component={RegistrationView}
          exact
        />
      </Router>
    </>
  )
}