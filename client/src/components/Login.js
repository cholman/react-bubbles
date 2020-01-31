import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  let history = useHistory();

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    })
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
    console.log(login)
    axios
      .post(`http://localhost:5000/api/login`, login)
      .then(res => {localStorage.setItem('token', res.data.payload);
        history.push('/protected');
      })
      .catch(err => console.log(err, 'from .catch'));
    
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        Username:
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={login.username}>
      
        </input>
        Password:
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={login.password}>
        </input>
        <button type="submit"
          onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default Login;
