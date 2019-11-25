import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';


export default class DoctorsDay extends React.Component {
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
            selectedOption: "",
            date: moment(),
            calendarFocused: false
        };
    }

    onDateChange = (date) => {
        if (date)
            this.setState(() => ({ date }))
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }

    handleOptionChange = (e) => {
        this.setState({ selectedOption: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.onSubmit({
            date: this.state.date,
            selectedOption: this.state.selectedOption
        })

    }

    render() {
        return (
            <div>
                <SingleDatePicker
                    date={this.state.date}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                />

                <form onSubmit={this.onSubmit}>
                    {this.state.s1 &&
                        <div>
                            <label><input type="radio" name="slot" value="s1" onChange={this.handleOptionChange} />8:00--8:30</label>
                        </div>
                    }

                    {this.state.s2 &&
                        <div>
                            <label><input type="radio" name="slot" value="s2" onChange={this.handleOptionChange} />8:30--9:00</label>
                        </div>
                    }

                    {this.state.s3 &&
                        <div>
                            <label><input type="radio" name="slot" value="s3" onChange={this.handleOptionChange} />9:00--9:30</label>
                        </div>

                    }

                    {this.state.s4 &&
                        <div>
                            <label><input type="radio" name="slot" value="s4" onChange={this.handleOptionChange} />9:30--10:00</label>
                        </div>
                    }
                    {this.state.s5 &&
                        <div>
                            <label><input type="radio" name="slot" value="s5" onChange={this.handleOptionChange} />10:00--10:30</label>
                        </div>

                    }

                    {this.state.s6 &&
                        <div>
                            <label><input type="radio" name="slot" value="s6" onChange={this.handleOptionChange} />10:30--11:00</label>
                        </div>
                    }
                    {this.state.s7 &&
                        <div>
                            <label><input type="radio" name="slot" value="s7" onChange={this.handleOptionChange} />11:00--11:30</label>
                        </div>

                    }

                    {this.state.s8 &&
                        <div>
                            <label><input type="radio" name="slot" value="s8" onChange={this.handleOptionChange} />11:30--12:00</label>
                        </div>
                    }

                    {this.state.s9 &&
                        <div>
                            <label><input type="radio" name="slot" value="s9" onChange={this.handleOptionChange} />12:00--12:30</label>
                        </div>

                    }

                    {this.state.s10 &&
                        <div>
                            <label><input type="radio" name="slot" value="s10" onChange={this.handleOptionChange} />12:30--13:00</label>
                        </div>
                    }

                    {this.state.s11 &&
                        <div>
                            <label><input type="radio" name="slot" value="s11" onChange={this.handleOptionChange} />13:00--13:30</label>
                        </div>

                    }

                    {this.state.s12 &&
                        <div>
                            <label><input type="radio" name="slot" value="s12" onChange={this.handleOptionChange} />13:30--14:00</label>
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



