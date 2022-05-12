import * as React from "react";
import * as CSS from 'csstype';
import * as Constants from "../constants"
import CalendarIcon from "../assets/calendar.png";


interface CalenderProps {
  currentDate: Date;
}
const Calender = (props: CalenderProps) => {

  return (
    <div className="absolute right-3 top-3 text-center justify-center">
      <img className="w-[7em]" src={CalendarIcon}></img>
      <p className="absolute top-10 font-red-rose text-2xl w-full">{Constants.MONTHS[props.currentDate.getMonth()]}<br></br>{props.currentDate.getFullYear()}</p>
    </div>
  );
};

export default Calender;