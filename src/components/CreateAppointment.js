import React from 'react';
import moment from 'moment';
import DoctorsDay from './DoctorsDay';
import database, { firebase } from '../firebase/firebase'
import { connect } from 'react-redux';


export class CreateAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: "",
            patient: props.patient ? props.patient : ""
        };
    }


    onDoctorChange = (e) => {
        const doctor = e.target.value
        this.setState(() => ({ doctor }))
    }

    onAppointmentRequest = ({ date, selectedOption }) => {

        console.log(this.state.doctor);
        console.log(moment(date).valueOf());
        console.log(selectedOption);
        console.log(this.state.patient);

        database.ref(`appointments`).push({
            date: moment(date).valueOf(),
            doctor: this.state.doctor,
            patient: this.state.patient,
            slot: selectedOption
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
                    <option value="stephen.strange">Stephen Strange</option>
                    <option value="leonard.mccoy">Leonard McCoy</option>
                </select>

                {this.state.doctor == "" ? <div></div> : <DoctorsDay doctor={this.state.doctor} date={this.state.date} onSubmit={this.onAppointmentRequest} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    patient: state.patient.name
})

export default connect(mapStateToProps)(CreateAppointment)
