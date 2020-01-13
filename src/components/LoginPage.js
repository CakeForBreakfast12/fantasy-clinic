import React from 'react';
import LoginForm from './LoginForm';
import { NavLink } from 'react-router-dom';

const LoginPage = (props) => {
  return (
    <div>
      {(props.user === 'patient') && <h2 className="modal__title">Please Login to book</h2>}
      {(props.user === 'new-patient') && <h2 className="modal__title">Welcome, new user</h2>}
      {(props.user === 'doctor') && <h2 className="modal__title">Please login</h2>}
      <LoginForm user={props.user} />
      {props.user === 'patient' && <div className="button button--link register-login-text" onClick={props.toggleUserTypeChange}>Don't have an account? Register here</div>}
      {props.user === 'new-patient' && <div className="button button--link register-login-text" onClick={props.toggleUserTypeChange}>Already have an account? Login here</div>}
    </div>
  )

};

export default LoginPage;