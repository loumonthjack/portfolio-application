import React, { useState} from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Card, Form, Input, Button, Error } from '../../Components/authForms';

const Register = () => {
  const [isRegistered, setRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");


  const postRegister=()=> {
    axios.post("http://localhost:5000/register/", {
      firstName,
      lastName,
      email,
      password
    }).then(result => {
      if (result.status === 200) {
        setRegistered(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isRegistered) {
    return <Redirect to="/" />;
  }
  return (
    <Card>
      <Form>
        <Input type="name" value={firstName} onChange={e => {
            setFirstName(e.target.value);
          }} placeholder="First Name" />
        <Input type="name" value={lastName} onChange={e => {
            setLastName(e.target.value);
          }} placeholder="Last Name" />
        <Input type="email" value={email} onChange={e => {
            setEmailAddress(e.target.value);
          }} placeholder="Email" />
        <Input type="password" value={password} onChange={e => {
            setPassword(e.target.value);
          }} placeholder="Password" />
        <Button onClick={postRegister}>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
      { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Register;

