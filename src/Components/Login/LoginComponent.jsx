import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import SimpleReactValidator from "simple-react-validator";
import { useHistory } from 'react-router-dom';




export default function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setValidEmail] = useState(true);
    const [isValidPassword, setValidPassword] = useState(true);
    const history = useHistory();
    let validator =  new SimpleReactValidator();

    useEffect(() => window.localStorage.clear(), []);

    useEffect(() => setValidEmail(validator.fieldValid('email')), [email]);

    useEffect(() => setValidPassword(validator.fieldValid('password')), [password]);
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      fakeLoginApi(email, password)
      .then(({status, admin}) => history.push(admin ? '/users' : '/products'))
      .catch(() => setValidPassword(false))
    }

    const fakeLoginApi = (email, password) => new Promise((resolve, reject) => {
        if (email === 'admin@xyz.com' && password === 'Admin_007') {
            window.localStorage.setItem('username', email)
            resolve({status: 200, admin: true})
        } else if (email === 'admin@xyz.com') {
            reject();
        } else {
            window.localStorage.setItem('username', email);
            resolve({status: 200, admin: false})
        }
    });
  
    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              isInvalid={!isValidEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidEmail && 
            <Form.Text>
                Enter {email.length > 0 && 'valid'} email address.
            </Form.Text>}
            {validator.message('email', email, 'required|email')}
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              isInvalid={!isValidPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isValidPassword && 
            <Form.Text>
                Enter {password.length > 0 && 'valid'} password.
            </Form.Text>}
            {validator.message('password', password, 'required')}
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }