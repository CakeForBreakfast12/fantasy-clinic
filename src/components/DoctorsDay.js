import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import doctorsBookings from '../selectors/doctorsBookings';


class DoctorsDay extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            s1: true,
            s2: true,
            s3: true,
            s4: true,
            s5: true,
            s6: true,
            s7: true,
            s8: true,
            s9: true,
            s10: true,
            s11: true,
            s12: true,
            time: 0,
            date: moment().startOf('day'),
            doctorsCalendar: props.doctorsCalendar ? props.doctorsCalendar : []
        };
    }

    static getDerivedStateFromProps(props, state) {
        return ({ ...state, doctorsCalendar: props.doctorsCalendar })
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

    render() {
        return (
            <div>

                {console.log(this.state.doctorsCalendar)
                }

                <form onSubmit={this.onSubmit}>
                    {this.state.s1 &&
                        <div>
                            <label><input type="radio" name="slot" value={480} onChange={this.handleOptionChange} />8:00--8:30</label>
                        </div>
                    }

                    {this.state.s2 &&
                        <div>
                            <label><input type="radio" name="slot" value={510} onChange={this.handleOptionChange} />8:30--9:00</label>
                        </div>
                    }

                    {this.state.s3 &&
                        <div>
                            <label><input type="radio" name="slot" value={540} onChange={this.handleOptionChange} />9:00--9:30</label>
                        </div>

                    }

                    {this.state.s4 &&
                        <div>
                            <label><input type="radio" name="slot" value={570} onChange={this.handleOptionChange} />9:30--10:00</label>
                        </div>
                    }
                    {this.state.s5 &&
                        <div>
                            <label><input type="radio" name="slot" value={600} onChange={this.handleOptionChange} />10:00--10:30</label>
                        </div>

                    }

                    {this.state.s6 &&
                        <div>
                            <label><input type="radio" name="slot" value={630} onChange={this.handleOptionChange} />10:30--11:00</label>
                        </div>
                    }
                    {this.state.s7 &&
                        <div>
                            <label><input type="radio" name="slot" value={660} onChange={this.handleOptionChange} />11:00--11:30</label>
                        </div>

                    }

                    {this.state.s8 &&
                        <div>
                            <label><input type="radio" name="slot" value={690} onChange={this.handleOptionChange} />11:30--12:00</label>
                        </div>
                    }

                    {this.state.s9 &&
                        <div>
                            <label><input type="radio" name="slot" value={720} onChange={this.handleOptionChange} />12:00--12:30</label>
                        </div>

                    }

                    {this.state.s10 &&
                        <div>
                            <label><input type="radio" name="slot" value={750} onChange={this.handleOptionChange} />12:30--13:00</label>
                        </div>
                    }

                    {this.state.s11 &&
                        <div>
                            <label><input type="radio" name="slot" value={780} onChange={this.handleOptionChange} />13:00--13:30</label>
                        </div>

                    }

                    {this.state.s12 &&
                        <div>
                            <label><input type="radio" name="slot" value={810} onChange={this.handleOptionChange} />13:30--14:00</label>
                        </div>
                    }


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
        doctorsCalendar: doctorsBookings(state.appointments, props.doctor, props.date)
    }
}

export default connect(mapStateToProps)(DoctorsDay);



