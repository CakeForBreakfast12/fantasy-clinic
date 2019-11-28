import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import DoctorsDay from './DoctorsDay';
import database, { firebase } from '../firebase/firebase'
import { connect } from 'react-redux';
import { startAddAppointment } from '../actions/appointments';
import { startGetDoctorSchedule } from '../actions/patient';


export class CreateAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorID: "",
            doctorName: "",
            patientName: props.patientName ? props.patientName : "",
            patientUID: props.patientUID ? props.patientUID : "",
            date: moment().startOf('day'),
            calendarFocused: false,
            appointmentCreatedMessage: ""
        };
    }




    onDoctorChange = (e) => {
        const doctorID = e.target.value
        const findDoctor = this.props.doctorsList.filter(doctor =>
            doctor.doctorUID === e.target.value
        )
        this.props.startGetDoctorSchedule(doctorID)
        this.setState(() => ({ doctorID, doctorName: findDoctor[0].doctorName }))
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

        console.log(this.state.doctorID);
        console.log(this.state.doctorName);
        console.log(moment(time).valueOf());


        this.props.startAddAppointment({
            time: moment(time).valueOf(),
            doctorID: this.state.doctorID,
            doctorName: this.state.doctorName
        })
        this.setState({ appointmentCreatedMessage: "Appointment created succesfully" })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                {this.state.appointmentCreatedMessage === "" ? <div>
                    <p>Want to add a new appointment?</p>
                    <select defaultValue={"default"} onChange={this.onDoctorChange}>
                        <option disabled={true} value="default">Please select a doctor...</option>
                        {this.props.doctorsList.map(doctor => <option key={doctor.doctorUID} value={doctor.doctorUID}>{doctor.doctorName}</option>)}
                    </select>

                    <SingleDatePicker
                        date={this.state.date}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                    />

                    {this.state.doctorName == "" ? <div></div> : <DoctorsDay date={this.state.date} doctor={this.state.doctor} onSubmit={this.onAppointmentRequest} />}
                </div> : this.state.appointmentCreatedMessage}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    patientName: state.patient.name,
    patientUID: state.patient.uid,
    doctorsList: state.patient.doctorsList
})

const mapDispatchToProps = (dispatch) => ({
    startAddAppointment: (appointment) => dispatch(startAddAppointment(appointment)),
    startGetDoctorSchedule: (doctorID) => dispatch(startGetDoctorSchedule(doctorID))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAppointment)
