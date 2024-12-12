import React from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
      history.push('/homePage');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>BK Hospital Login</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="links">
          <p><a href="/register">Create an account</a></p>
          <p><a href="/forgotPassword">Forgot password</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;