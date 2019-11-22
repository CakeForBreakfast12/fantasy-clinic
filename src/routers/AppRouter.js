import React from 'react';
import NotFoundPage from '../components/NotFoundPage';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory();
import PublicRoute from './PublicRoute';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import Doctors from '../components/Doctors'
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import DoctorDashboard from '../components/DoctorDashboard';
import RegisterPage from '../components/RegisterPage';


const AppRouter = () => (
    <Router history={history}>

        <Switch>
            <PublicRoute path="/" exact={true} component={AboutUs} />
            <PublicRoute path="/services" component={Services} />
            <PublicRoute path="/doctors" component={Doctors} />
            <PrivateRoute path="/dashboard" component={DoctorDashboard} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </Router>
);

export default AppRouter;