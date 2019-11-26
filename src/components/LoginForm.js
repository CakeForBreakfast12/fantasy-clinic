import React from 'react';
import { firebase } from '../firebase/firebase';
import database from '../firebase/firebase';


const LoginForm = ({ user }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (user) {
            case 'patient': {
                const email = e.target.email.value;
                const password = e.target.password.value;
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                            alert('Wrong password.');
                        } else {
                            alert(errorMessage);
                        }
                        console.log(error);
                    });
                break;
            }

            case 'new-patient': {
                const name = e.target.name.value
                const email = e.target.email.value;
                const password = e.target.password.value;
                const phone = e.target.telephoneNumber.value;
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        database.ref(`patients/${firebase.auth().currentUser.uid}/contactInfo`).child('name').set(name);
                        database.ref(`patients/${firebase.auth().currentUser.uid}/contactInfo`).child('email').set(email);
                        database.ref(`patients/${firebase.auth().currentUser.uid}/contactInfo`).child('phone').set(phone);
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                            alert('The password is too weak.');
                        } else {
                            alert(errorMessage);
                        }
                        console.log(error);
                    });
                break;
            }
            case 'doctor':
                const email = e.target.email.value;
                const password = e.target.password.value;
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                            alert('Wrong password.');
                        } else {
                            alert(errorMessage);
                        }
                        console.log(error);
                    });
                break;
            default:
                break;
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {user === 'new-patient' && <input type="text" name="name" placeholder="Full name"></input>}
            <input type="text" name="email" placeholder="Email"></input>
            <input type="text" name="password" placeholder="Password"></input>
            {user === 'new-patient' && <input type="text" name="telephoneNumber" placeholder="Phone Number"></input>}
            <button>Submit</button>

        </form>
    )


}
export default LoginForm