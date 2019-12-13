import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons'

const Header = () => (
    <header className="header">
        <div >
            <h1 className="navbar-brand"><b id="brand-bold">FANTASY</b> CLINIC</h1>
            <br />
            <div className="d-flex p-2 justify-content-center">

                <div className="btn-group " role="group">
                    <NavLink className="btn btn-secondary btn-lg btn-light btn-outline-info" to="/" activeClassName="btn-secondary active" exact={true}>Home</NavLink>
                    <NavLink className="btn btn-secondary btn-lg btn-light btn-outline-info" to="/services" activeClassName="btn-secondary active">Services</NavLink>
                    <NavLink className="btn btn-secondary btn-lg btn-light btn-outline-info" to="/doctors" activeClassName="btn-secondary active">Our Team</NavLink>
                    <NavLink className="btn btn-secondary btn-lg btn-light btn-outline-info" to="/drlogin" activeClassName="btn-secondary active">Doctor's login</NavLink>
                </div>

            </div>
            <div className="d-flex p-1 justify-content-center">
                <NavLink id="create-booking-button" to="/login" activeClassName="is-active">
                    
                        <FontAwesomeIcon text-align="center" id="create-booking-button-symbol" icon={faNotesMedical} size="3x" />
                        <br/>Book an appointment
                    
                </NavLink>
            </div>
        </div>



    </header>
);



export default Header;