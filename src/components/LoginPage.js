import React from 'react';
import LoginForm from './LoginForm';
import { NavLink } from 'react-router-dom';

const LoginPage = ({ user }) => {
  return (
    <div>
      {(user === 'patient') && <h2>Please Login to book</h2>}
      {(user === 'new-patient') && <h2>Welcome</h2>}
      {(user === 'doctor') && <h2>Please login</h2>}
      <LoginForm user={user} />
      {user === 'patient' ? <NavLink to="/register">Register</NavLink> : (user === 'new-patient') && <NavLink to="/login">Login</NavLink>}
    </div>
  )

};

export default LoginPage;