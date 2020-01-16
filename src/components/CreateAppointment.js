import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DoctorsDay from './DoctorsDay';
import { connect } from 'react-redux';
import { startAddAppointment } from '../actions/appointments';
import { startGetDoctorSchedule } from '../actions/patient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


export class CreateAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            easterSundays: [
                moment([2019, 3, 28]).toDate(),
                moment([2020, 3, 19]).toDate(),
                moment([2021, 4, 2]).toDate(),
                moment([2022, 3, 24]).toDate(),
                moment([2023, 3, 16]).toDate(),
                moment([2024, 4, 5]).toDate(),
                moment([2025, 3, 20]).toDate(),
                moment([2026, 3, 12]).toDate(),
                moment([2027, 4, 2]).toDate(),
                moment([2028, 3, 16]).toDate(),
                moment([2029, 3, 8]).toDate(),
                moment([2030, 3, 28]).toDate(),
            ],
            legalHolidays: [
                moment("01 Jan", "DD MMM").toDate(),
                moment("02 Jan", "DD MMM").toDate(),
                moment("24 Jan", "DD MMM").toDate(),
                moment("01 May", "DD MMM").toDate(),
                moment("01 Jun", "DD MMM").toDate(),
                moment("15 Aug", "DD MMM").toDate(),
                moment("30 Nov", "DD MMM").toDate(),
                moment("01 Dec", "DD MMM").toDate(),
                moment("25 Dec", "DD MMM").toDate(),
                moment("26 Dec", "DD MMM").toDate(),
                moment("01 Jan", "DD MMM").add(1, 'year').toDate(),
                moment("02 Jan", "DD MMM").add(1, 'year').toDate(),
                moment("24 Jan", "DD MMM").add(1, 'year').toDate(),
                moment("01 May", "DD MMM").add(1, 'year').toDate(),
                moment("01 Jun", "DD MMM").add(1, 'year').toDate(),
                moment("15 Aug", "DD MMM").add(1, 'year').toDate(),
                moment("30 Nov", "DD MMM").add(1, 'year').toDate(),
                moment("01 Dec", "DD MMM").add(1, 'year').toDate(),
                moment("25 Dec", "DD MMM").add(1, 'year').toDate(),
                moment("26 Dec", "DD MMM").add(1, 'year').toDate(),
            ],
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
        const scheduleMatrix = [];
        const fullyBookedDays = [];
        const endOfWorkDay = moment().startOf("day").add(14, "hours")

        //first the appointments arrays are filtered to those in only the selected month
        scheduleArray = scheduleArray.filter(appointment => moment(appointment).isSame(moment(month), "month") && moment().isBefore(moment(appointment)))

        //check if there are any appointments today, if so, treat today differently from all the other days in the calendar
        let sameDayschedule = scheduleArray.filter(appointment => moment(appointment).isSame(moment(), "day"))
        if (sameDayschedule.length == 0 && moment().isAfter(endOfWorkDay))
            fullyBookedDays.push(moment().toDate())
        if (sameDayschedule.length) {
            let nearestSlot;
            if (moment().minute() < 30)
                nearestSlot = moment().startOf("hour").add(30, "minutes")
            else
                nearestSlot = moment().startOf("hour").add(1, "hour")
            const difference = endOfWorkDay.diff(nearestSlot, "minutes")
            const numberOfRemainingSlots = difference / 30;

            //Then filter sameDayschedule to see how many of today's appointments are left in the future, and if their number is the same as the number of remaining slots, then add today as a fullyBookedDay
            sameDayschedule = sameDayschedule.filter(appointment => moment(appointment).isSameOrAfter(moment(nearestSlot)))

            if (sameDayschedule.length == numberOfRemainingSlots) {
                fullyBookedDays.push(moment().toDate())
            }
        }

        //for all the other days starting tomorrow, a matrix is initialised. Each month is separated in an array of days and each day is an array of appointments on that day
        for (let index = moment(month).date(); index <= moment(month).endOf("month").date(); index++) {
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
        this.props.startAddAppointment({
            time: moment(time).valueOf(),
            doctorID: this.state.doctorID,
            doctorName: this.state.doctorName
        }).then(this.setState({ appointmentCreatedMessage: "Appointment created succesfully" }))

    }



    render() {
        return (
            <div className="content-container article">
                {this.state.appointmentCreatedMessage === "" ?
                    <div className="article-column-left">
                        <h2>Want to add a new appointment?</h2>
                        <select defaultValue={"default"} onChange={this.onDoctorChange}>
                            <option disabled={true} value="default">Please select a doctor...</option>
                            {this.props.doctorsList.map(doctor => <option key={doctor.doctorUID} value={doctor.doctorUID}>{doctor.doctorName}</option>)}
                        </select>
                        <div className="col2-container create-appointment">
                            <div className="col2-column no-line-height">
                                <DayPicker
                                    onDayClick={this.onDateChange}
                                    todayButton={"Today"}
                                    disabledDays={[
                                        ...this.state.fullyBookedDays,
                                        { daysOfWeek: [0, 6] },
                                        { before: moment().toDate() },
                                        ...this.state.legalHolidays,
                                        ...this.state.easterSundays.map(sunday => moment(sunday).subtract(2, 'days').toDate()),
                                        ...this.state.easterSundays.map(sunday => moment(sunday).add(1, 'days').toDate()),
                                        ...this.state.easterSundays.map(sunday => moment(sunday).add(50, 'days').toDate())
                                    ]}
                                    firstDayOfWeek={1}
                                    onMonthChange={this.onMonthChange}
                                />
                            </div>

                            <div className="col2-column">
                                {this.state.doctorName == "" ? <div></div> :
                                    <DoctorsDay
                                        date={this.state.date}
                                        doctor={this.state.doctor}
                                        onSubmit={this.onAppointmentRequest}
                                    />
                                }
                            </div>
                        </div>

                    </div> : <div className="message-success">{<FontAwesomeIcon icon={faCheck} />}{this.state.appointmentCreatedMessage}</div>}
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
