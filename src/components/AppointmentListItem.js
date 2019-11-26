import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

export const AppointmentListItem = ({time,doctor}) => (
  <div >
  
    <p>{moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}   -   {doctor}</p>
  </div>
)

export default AppointmentListItem;