import React, { Component } from 'react'
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Menu } from './menu';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';



export default function Menu(props) {

  let { user } = props;


  const history = useHistory();

  const onLogOut = () => {
    props.logOut();
    history.push("/");
  }


  return (
    <Container className="justify-content-end">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#movies">HorrorTime</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/">
            <Button variant="dark">Movies</Button>
          </Link>
          <Link to={`/users/${user}`}>
            <Button variant="dark">Account</Button>
          </Link>
        </Nav>
        <Form style={{ margin: "auto" }} inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        <Nav.Item>
          <Button variant="dark" onClick={onLogOut} >Logout</Button>
        </Nav.Item>
      </Navbar>
    </Container>
  )

}