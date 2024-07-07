import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../components/css/Login.css';
import { login } from '../service/user.service';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const status = useSelector((state: any) => state.reducer.user);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(user))
      .unwrap()
      .then((response: any) => {
        
        console.log(response);
        
        navigate('/index');
        localStorage.setItem("userOnl", JSON.stringify(response.id));
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {status === 'failed' && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <b>Email</b>
          <input
            type="email"
            name="email"
            placeholder="Your email?"
            value={user.email}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <b>Password</b>
          <input
            type="password"
            name="password"
            placeholder="Your password?"
            value={user.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/register">Don't have an account? Click here to register</Link>
      </form>
    </div>
  );
}
