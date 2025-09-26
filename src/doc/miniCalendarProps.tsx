import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from "react";
import "./index.css";

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}


interface calendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const Calendar = forwardRef<calendarRef, CalendarProps>((props, ref) => {
  const { defaultValue = new Date(), onChange } = props;
  const [date, setDate] = useState(defaultValue);
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // 根据月份获取天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 根据年月获取当月第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  const renderDays = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="empty" key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      if (i == date.getDate()) {
        days.push(
          <div
            className="day selected"
            key={`day-${i}`}
            onClick={() => clickHandler(i)}
          >
            {i}
          </div>
        );
      } else {
        days.push(
          <div className="day" key={`day-${i}`} onClick={() => clickHandler(i)}>
            {i}
          </div>
        );
      }
    }
    return days;
  };
  const clickHandler = (i: number) => {
    setDate(new Date(date.getFullYear(), date.getMonth(), i));
    onChange?.(new Date(date.getFullYear(), date.getMonth(), i));
  };


  useImperativeHandle(ref,()=> {
    return {
      getDate: () => date,
      setDate: (date: Date) => setDate(date)
    }
  })

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {date.getMonth() + 1} 月
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
});

function App() {
  const calendarRef = useRef<calendarRef>(null);
  useEffect(()=> {
  console.log(calendarRef.current?.getDate().toLocaleDateString())  
  setTimeout(() => {
    calendarRef.current?.setDate(new Date(2024, 3, 1));
  }, 3000);

  }, [])
  return (
    <Calendar
      ref={calendarRef}
      defaultValue={new Date("2025-9-25")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    ></Calendar>
  );
}

export default App;
