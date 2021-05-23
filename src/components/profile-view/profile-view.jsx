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



  componentDidUpdate(prevProps) {
    if (this.props.Username !== prevProps.Username) {
      this.fetchData(this.props.Username);
      console.log(this.props.Username)
    }
  }

  onUpdate(userInfo) {
    const changeData = {
      UserInfo: this.props.userInfo,
      Username: this.state.username
    }
  }
}

handleUpdate() {
  const user = user;
  axios.put(`https://itshorrortime.herokuapp.com/users/${user}`, {
    Username: newUsername,
  }).then((response) => {
    const data = response.data;
    this.onUpdate(data);
    console.log(response);
  });

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

        <Form>
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
          <Button onClick={handleUpdate} variant="dark" block >Submit</Button>
        </Form>
      </Form.Row>

    </>
  )


}
}


ProfileView.propTypes = {
  UserInfo: PropTypes.shape({
    Username: propTypes.string,
    Birthday: propTypes.string,
    Email: propTypes.string,
    _id: propTypes.strin
  })
}

