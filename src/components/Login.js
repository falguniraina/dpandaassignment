// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userData from './userData';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = userData.find((user) => user.username === username && user.password === password);

    if (user) {
      onLogin(user);
    } else {
      alert('You are not a registered user. Please register first.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="email" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleLogin}>
          Submit
        </Button>
      </Form>
    </div>
  );


};

export default Login;



