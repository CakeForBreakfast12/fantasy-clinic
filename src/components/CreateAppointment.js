import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import DoctorsDay from './DoctorsDay';
import database, { firebase } from '../firebase/firebase'
import { connect } from 'react-redux';
import { startAddAppointment } from '../actions/appointments';


export class CreateAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: "",
            patientName: props.patientName ? props.patientName : "",
            patientUID: props.patientUID ? props.patientUID : "",
            date: moment().startOf('day'),
            calendarFocused: false
        };
    }

    


    onDoctorChange = (e) => {
        const doctor = e.target.value
        this.setState(() => ({ doctor }))
    }

    onDateChange = (date) => {
        if (date) {
            date = moment(date).startOf('day')
            this.setState(() => ({ date }))
        }

    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }

    onAppointmentRequest = ({ time }) => {

        console.log(this.state.doctor);
        console.log(moment(time).valueOf());
        console.log(this.state.patientName);
        console.log(this.state.patientUID);

        this.props.startAddAppointment({
            time: moment(time).valueOf(),
            doctor: this.state.doctor,
            patientName: this.state.patientName,
            patientUID: this.state.patientUID
        })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <p>Want to add a new appointment?</p>
                <select defaultValue={"default"} onChange={this.onDoctorChange}>
                    <option disabled={true} value="default">Please select a doctor...</option>
                    <option value="Stephen Strange">Stephen Strange</option>
                    <option value="Leonard McCoy">Leonard McCoy</option>
                </select>

                <SingleDatePicker
                    date={this.state.date}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                />

                {this.state.doctor == "" ? <div></div> : <DoctorsDay date={this.state.date} doctor={this.state.doctor} onSubmit={this.onAppointmentRequest} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    patientName: state.patient.name,
    patientUID: state.patient.uid
})

const mapDispatchToProps = (dispatch) => ({
    startAddAppointment: (appointment) => dispatch(startAddAppointment(appointment)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAppointment)
