import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, FormGroup, FormControl, FormLabel, Button, Table, Navbar } from 'react-bootstrap';

// jshint ignore:start

async function loginUser(credentials) {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

   
function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }
  return(
      <Container>
          <Row className="custLoginRow">
              <Col className="custColStyle">
                  <Form onSubmit={handleSubmit}>
                      <FormGroup>
                          <FormLabel>User Name : </FormLabel>
                          <FormControl type="text" onChange={e => setUserName(e.target.value)}></FormControl>
                      </FormGroup>
                      <FormGroup>
                          <FormLabel>Password : </FormLabel>
                          <FormControl type="password" onChange={e => setPassword(e.target.value)}></FormControl>
                      </FormGroup>
                      <FormGroup>
                          <Button type="submit" className="custBtnShowLog">Login</Button>
                      </FormGroup>
                  </Form>
              </Col>
          </Row>
      </Container>
    
    // <form onSubmit={handleSubmit}>
    //     <label>
    //       <p>Username</p>
    //       <input type="text" onChange={e => setUserName(e.target.value)} />
    //     </label>
    //     <label>
    //       <p>Password</p>
    //       <input type="password" onChange={e => setPassword(e.target.value)} />
    //     </label>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;