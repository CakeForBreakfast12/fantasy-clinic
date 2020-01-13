import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientType: undefined
        }
    }

    handleOpenModal = () => {
        this.setState(() => ({ patientType: 'patient' }))
    }

    handleDoctorOpensModal = () => {
        this.setState(() => ({ patientType: 'doctor' }))
    }

    handleCloseModal = () => {
        this.setState(() => ({ patientType: undefined }))
    }

    handleUserTypeChange = () => {
        this.setState((prevState) => {
            if (prevState.patientType == 'patient') return { patientType: 'new-patient' }
            else return { patientType: 'patient' }
        })
    }

    render() {
        return (
            <div className="wrapper header">
                <div className="content-container content-container--header">
                    <div className="header__brand"><b>FANTASY</b> CLINIC</div>
                    <div>
                        <NavLink className="button" to="/" activeClassName="button button--nav-active" exact={true}>HOME</NavLink>
                        <NavLink className="button" to="/services" activeClassName="button button--nav-active">SERVICES</NavLink>
                        <NavLink className="button" to="/doctors" activeClassName="button button--nav-active">OUR TEAM</NavLink>
                        <a className="button" onClick={this.handleDoctorOpensModal} >DOCTOR'S LOGIN</a>
                    </div>
                </div>

                <div className="content-container content-container--login-buton" >
                    <button className="button button--green" onClick={this.handleOpenModal}>Book an appointment</button>
                </div>


                <LoginModal
                    user={this.state.patientType}
                    toggleUserTypeChange={this.handleUserTypeChange}
                    closeModal={this.handleCloseModal}
                />
            </div>
        );

    }
}
export default Header;