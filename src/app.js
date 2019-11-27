import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import database from './firebase/firebase';
import { getPatientName, startGetDoctorsList } from './actions/patient';
import { startGetAppointments } from './actions/appointments';



const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        database.ref(`doctors/${user.uid}`).once("value").then((snapshot) => {
            if (snapshot.exists()) history.push('/dashboard')
            else {
                store.dispatch(startGetDoctorsList())
                store.dispatch(startGetAppointments(user.uid))
                database.ref(`patients/${user.uid}/contactInfo/name`).once("value")
                    .then((snapshot) => {
                        store.dispatch(getPatientName(snapshot.val()))
                        history.push('/patientDashboard')
                    })


            }
        })

    } else {
        store.dispatch(logout())
        history.push('/')

    }
})
