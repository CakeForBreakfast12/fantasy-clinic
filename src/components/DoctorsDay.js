import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import doctorsBookings from '../selectors/doctorsBookings';
import { log } from 'util';


class DoctorsDay extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            dailyCalendar: [
                { available: true, hours: "08:00 - 08:30" },
                { available: true, hours: "08:30 - 09:00" },
                { available: true, hours: "09:00 - 09:30" },
                { available: true, hours: "09:30 - 10:00" },
                { available: true, hours: "10:00 - 10:30" },
                { available: true, hours: "10:30 - 11:00" },
                { available: true, hours: "11:00 - 11:30" },
                { available: true, hours: "11:30 - 12:00" },
                { available: true, hours: "12:00 - 12:30" },
                { available: true, hours: "12:30 - 13:00" },
                { available: true, hours: "13:00 - 13:30" },
                { available: true, hours: "13:30 - 14:00" }
            ],
            time: 0,
            date: moment(props.date).startOf('day')
        };
    }

    static getDerivedStateFromProps(props, state) {
        return ({ ...state, dailyCalendar: props.dailyCalendar, date: props.date })
    }



    handleOptionChange = (e) => {
        this.setState({ time: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            time: moment(this.state.date).add(this.state.time, 'minutes')
        })

    }



    updateDoctorsSchedule = (array) => {
        array.map(slot => console.log(slot))

        this.setState({
            doctorsSchedule: [...array]
        }

        )
    }

    render() {
        return (
            <div>

                <form onSubmit={this.onSubmit}>
                    {this.state.dailyCalendar.map((slot, index) => slot.available &&
                        <div key={`slot ${index}`}>
                            <label ><input type="radio" name="slot" value={480 + 30 * index} onChange={this.handleOptionChange} />{slot.hours}</label>
                        </div>
                    )}

                    <div className="form-group">
                        <button className="btn btn-primary mt-2" type="submit">
                            Save
                    </button>
                    </div>
                </form>

                
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



