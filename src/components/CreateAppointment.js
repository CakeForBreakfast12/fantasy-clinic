import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DoctorsDay from './DoctorsDay';
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
            monthFromPicker: moment().startOf("month"),
            appointmentCreatedMessage: "",
            fullyBookedDays: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        return ({ ...state, doctorsSchedule: props.doctorsSchedule })
    }

    componentDidUpdate = (prevProps) => {
        prevProps.doctorsSchedule != this.props.doctorsSchedule && this.searchForFullDays(this.props.doctorsSchedule, this.state.monthFromPicker)


    }

    searchForFullDays = (scheduleArray, month) => {
        let scheduleMatrix = [];
        let fullyBookedDays = [];
        let nearestSlot

        //first the appointments arrays are filtered to those in only the selected month
        scheduleArray = scheduleArray.filter(appointment => moment(appointment).isSame(moment(month), "month") && moment().isBefore(moment(appointment)))

        //check if there are any appointments today, if so, treat today differently from all the other days in the calendar
        let sameDayschedule = scheduleArray.filter(appointment => moment(appointment).isSame(moment(), "day"))

        if (sameDayschedule.length) {
            if (moment().minute() < 30)
                nearestSlot = moment().startOf("hour").add(30, "minutes")
            else
                nearestSlot = moment().startOf("hour").add(1, "hour")

            const endOfWorkDay = moment().startOf("day").add(14, "hours")
            const difference = endOfWorkDay.diff(nearestSlot, "minutes")
            const numberOfRemainingSlots = difference / 30;

            //Then filter sameDayschedule to see how many of today's appointments are left in the future, and if their number is the same as the number of remaining slots, then add today as a fullyBookedDay            
            sameDayschedule = sameDayschedule.filter(appointment => moment(appointment).isSameOrAfter(moment(nearestSlot)))
            if (sameDayschedule.length == numberOfRemainingSlots) {
                fullyBookedDays.push(moment().toDate())

            }
        }
        else {
            //fo all the other days starting tomorrow, a matrix is initialised. Each month is separated in an array of days and each day is an array of appointments on that day
            for (let index = moment(month).date() - 1; index < moment(month).endOf("month").date(); index++) {
                scheduleMatrix.push([])
            }
            //each appointment is sorted to it's corresponding day in the matrix
            scheduleArray.map(appointment => {
                scheduleMatrix[moment(appointment).date() - 1].push([appointment])
            })

            //each day in the array is checked to see if there are 12 appointments each day, and if there are, the day is added to fullyBookedDays array as a JS Date instance
            scheduleMatrix.map((dayOfMonth, index) => {
                if (dayOfMonth.length == 12) {
                    fullyBookedDays.push(moment(month).date(index + 1).toDate())
                }
            })
            this.setState({ fullyBookedDays })
        }
    }


    onDoctorChange = (e) => {
        const doctorID = e.target.value
        const findDoctor = this.props.doctorsList.filter(doctor =>
            doctor.doctorUID === e.target.value
        )
        this.props.startGetDoctorSchedule(doctorID).then(this.setState({ doctorID, doctorName: findDoctor[0].doctorName }))
    }

    onDateChange = (date, modifiers = {}) => {
        if (!modifiers.disabled) {
            date = moment(date).startOf('day')
            this.setState(() => ({ date }))
        }

    }

    onMonthChange = (startOfMonth) => {
        this.setState({ monthFromPicker: startOfMonth }, () => this.searchForFullDays(this.props.doctorsSchedule, this.state.monthFromPicker))
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

                    <DayPicker
                        onDayClick={this.onDateChange}
                        disabledDays={[...this.state.fullyBookedDays, { daysOfWeek: [0, 6] }, { before: moment().toDate() }]}
                        firstDayOfWeek={1}
                        onMonthChange={this.onMonthChange}
                    />


                    {this.state.doctorName == "" ? <div></div> :
                        <DoctorsDay
                            date={this.state.date}
                            doctor={this.state.doctor}
                            onSubmit={this.onAppointmentRequest}
                        />
                    }

                </div> : this.state.appointmentCreatedMessage}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    patientName: state.patient.name,
    patientUID: state.patient.uid,
    doctorsList: state.patient.doctorsList,
    doctorsSchedule: state.patient.doctorsSchedule
})

const mapDispatchToProps = (dispatch) => ({
    startAddAppointment: (appointment) => dispatch(startAddAppointment(appointment)),
    startGetDoctorSchedule: (doctorID) => dispatch(startGetDoctorSchedule(doctorID))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAppointment)
