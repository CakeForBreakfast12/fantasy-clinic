import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { startUpdateVacations } from '../actions/doctor';

class CreateOutOfOffice extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
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
                moment("01 Dec", "DD MMM").add(1, 'year').toDate(),
                moment("25 Dec", "DD MMM").add(1, 'year').toDate(),
                moment("26 Dec", "DD MMM").add(1, 'year').toDate(),
            ],
            selectedDays: [],
            meessage:""
        };
    }

    static getDerivedStateFromProps(props, state) {
        return ({ ...state, selectedDays: props.vacations })
    }

    handleDayClick(day, modifiers = {}) {
        const { selectedDays } = this.state;
        if (!modifiers.disabled)
            if (modifiers.selected) {
                const selectedIndex = selectedDays.findIndex(selectedDay =>
                    DateUtils.isSameDay(selectedDay, day)
                );
                selectedDays.splice(selectedIndex, 1);
            } else {
                selectedDays.push(day);
            }
        this.setState({ selectedDays, message:"" });
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        console.log()
        this.props.startUpdateVacations(this.state.selectedDays.map(obj => moment(obj).valueOf()))
        this.setState({ message: "Updated succesfully" })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <DayPicker
                        selectedDays={this.state.selectedDays}
                        onDayClick={this.handleDayClick}
                        disabledDays={[
                            { daysOfWeek: [0, 6] },
                            { before: moment().toDate() },
                            ...this.state.legalHolidays,
                            ...this.state.easterSundays.map(sunday => moment(sunday).subtract(2, 'days').toDate()),
                            ...this.state.easterSundays.map(sunday => moment(sunday).add(1, 'days').toDate()),
                            ...this.state.easterSundays.map(sunday => moment(sunday).add(50, 'days').toDate())
                        ]}
                        firstDayOfWeek={1}
                        numberOfMonths={2}
                    />
                    <p>
                        {`Total vacation days used in ${moment().format("YYYY")}:${this.state.selectedDays.filter(day=>moment(day).isSame(moment(),'year')).length}`}
                    </p>
                    <p>
                        {`Total vacation days used in ${moment().add(1,'year').format("YYYY")}:${this.state.selectedDays.filter(day=>moment(day).isSame(moment().add(1,'year'),'year')).length}`}
                    </p>
                    <p>
                        <button type="submit">Update Free Days</button>{this.state.message}
                    </p>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    vacations: state.doctor.vacations.map(unix => moment(unix).toDate())
})

const mapDispatchToProps = (dispatch) => ({
    startUpdateVacations: (selectedDays) => dispatch(startUpdateVacations(selectedDays))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateOutOfOffice)