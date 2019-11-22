import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LoginForm extends React.Component {
    render() {
        return (
            <form>
                <input type="text" name="email"></input>
                <input type="text" name="password"></input>
                {this.props.user === 'new-patient' && <input type="text" name="telephoneNumber"></input>}
                <button>Submit</button>
                {this.props.user === 'new-patient' ? <NavLink to="/login">Login</NavLink> : <NavLink to="/register">Register</NavLink>}
            </form>
        )

    }
}
