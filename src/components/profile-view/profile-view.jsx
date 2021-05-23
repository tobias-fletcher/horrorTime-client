import React, { useState } from 'react';
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


export class ProfileView extends React.Component {




  render() {

    const { user, token, userInfo, handleSubmit } = this.props;

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
            {/*make drop down when clicking update information to pull up update form */}

            <Button>Update Information</Button>

          </Card.Body>

        </Card>
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