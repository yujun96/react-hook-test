import './index.scss';
import MonthCalendar from './MonthCalendar';
import Header from './Header';


export interface CalendarProps {
    value?: Date;
}

function Calendar(props: CalendarProps) {
    return <div className="calendar">
        <Header ></Header>
        <MonthCalendar {...props}></MonthCalendar>
    </div>
}

export default Calendar;