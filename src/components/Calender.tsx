import * as React from "react";
import * as CSS from 'csstype';
import * as Constants from "../constants"


interface CalenderProps {
  currentDate: Date;
}
const Calender = (props: CalenderProps) => {

  return (
    <div id="CalenderPanel">
      <p>{Constants.MONTHS[props.currentDate.getMonth()]} {props.currentDate.getFullYear()}</p>
    </div>
  );
};

export default Calender;