import React from 'react';
import Modal from 'react-modal';
import LoginPage from './LoginPage'


const LoginModal = (props) => (
    <Modal
        isOpen={!!props.user}
        onRequestClose={props.closeModal}
        contentLabel="Please Login to book"
        closeTimeoutMS={200}
        className="modal"
    >
        
        <LoginPage {...props} />     
        <button className="button button--green" onClick={props.closeModal}>Close</button>
    </Modal>
);

export default LoginModal;