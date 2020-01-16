import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import doctorsBookings from '../selectors/doctorsBookings';


class DoctorsDay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dailyCalendar: [],
            time: 0,
            date: moment(props.date).startOf('day'),
            submitButtonDisabled: true
        };

    }

    static getDerivedStateFromProps(props, state) {
        return ({ ...state, dailyCalendar: props.dailyCalendar, date: props.date })
    }



    handleOptionChange = (e) => {
        this.setState({ time: e.target.value, submitButtonDisabled: false })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            time: moment(this.state.date).add(this.state.time, 'minutes')
        })

    }


    render() {
        return (
            <div className="article small">
                <h2>{moment(this.state.date).format("dddd, MMMM Do YYYY")}</h2>
                {this.state.dailyCalendar.find(slot => slot.available == true) ? (
                    <form onSubmit={this.onSubmit}>
                        {this.state.dailyCalendar.map((slot, index) => slot.available &&
                            <div className="slot" key={`slot ${index}`}>
                                <label ><input type="radio" name="slot" value={480 + 30 * index} onChange={this.handleOptionChange} />{slot.hours}</label>
                            </div>
                        )}
                        <button disabled={this.state.submitButtonDisabled} className="button button--green" type="submit">
                            Save
                        </button>
                    </form>
                ) : (<p>No more slots available today</p>)
                }
            </div>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        date: props.date,
        dailyCalendar: doctorsBookings(state.patient.doctorsSchedule, props.date)
    }
}

export default connect(mapStateToProps)(DoctorsDay);



