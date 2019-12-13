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
import { startGetPatientInfo, startGetDoctorsList } from './actions/patient';
import { startGetAppointments } from './actions/appointments';
import { startGetDoctorBookings,startGetDoctorName,startGetDoctorVacations } from './actions/doctor';


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
            if (snapshot.exists()) {
                store.dispatch(startGetDoctorBookings(user.uid))
                store.dispatch(startGetDoctorName(user.uid))
                store.dispatch(startGetDoctorVacations(user.uid))
                history.push('/dashboard')
            }
            else {
                store.dispatch(startGetDoctorsList())
                store.dispatch(startGetAppointments(user.uid))
                store.dispatch(startGetPatientInfo(user.uid))
                history.push('/patientDashboard')

            }
        })

    } else {
        store.dispatch(logout())
        history.push('/')

    }
})
