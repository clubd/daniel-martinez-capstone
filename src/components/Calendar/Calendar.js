import "./Calendar.scss";
import calendar from "../../assets/icons/calendar.svg"
function Calendar() {
    //api add here 
    return (
        <div className="calendar">
            <h2 className="calendar__heading">Calendar</h2>
            <img className="calendar__img" src={ calendar } />
        </div>
    );
}

export default Calendar;