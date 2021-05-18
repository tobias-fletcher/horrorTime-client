import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Helmet from "react-helmet";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://itshorrortime.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthdate
    }).then(response => {
      const data = response.data;
      props.onRegister(data);
    }).catch(e => {
      console.log('Cannot register');
    });
  };

  return (
    <Container className="container1 justify-content-center">
      <Helmet bodyAttributes={{ style: 'background-color : black' }} />
      <Container className="container2">
        <Form.Row className="justify-content-center mt-5">
          <Form>
            <Container>
              <Form.Row className="justify-content-center">
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type='text' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
                </Form.Group>
              </Form.Row>
            </Container>
            <Container>
              <Form.Row className="justify-content-center">
                <Form.Group controlId='formPassword'>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
              </Form.Row>
            </Container>
            <Container>
              <Form.Row className="justify-content-center">
                <Form.Group controlId='formEmail'>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control type='email' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                </Form.Group>
              </Form.Row>
            </Container>
            <Container>
              <Form.Row className="justify-content-center">
                <Form.Group controlId='formBirthdate'>
                  <Form.Label>Birthdate: </Form.Label>
                  <Form.Control type='birthdate' placeholder='Enter Birthdate' onChange={e => setBirthdate(e.target.value)} />
                </Form.Group>
              </Form.Row>
            </Container>
            <Container>
              <Form.Row className="justify-content-center mb-3">
                <Button variant="dark" block type='submit' onClick={handleSubmit}> Submit</Button>
                <Button variant="outline-dark" block onClick={props.toggleView}>Already have an account?</Button>
              </Form.Row>
            </Container>
          </Form >
        </Form.Row>
      </Container>
    </Container>
  )
}
