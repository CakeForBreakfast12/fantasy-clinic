import React from 'react';
import { NavLink } from 'react-router-dom'



const Header = () => (
    <header>
        <h1>Fantasy Clinic</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/services" activeClassName="is-active">Services</NavLink>
        <NavLink to="/doctors" activeClassName="is-active">Our Team</NavLink>
        <NavLink to="/login" activeClassName="is-active">Doctor's login</NavLink>

    </header>
);



export default Header;