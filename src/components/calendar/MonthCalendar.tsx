import dayjs from "dayjs";
import type { CalendarProps } from "./Calendar";
interface MonthCalendarProps extends CalendarProps {}

// 优化建议：可以让该函数返回一个完整的日期数组，包含本月所有天数，并且可以补齐前后空白（如日历常见的6行7列），便于渲染日历面板。
/**
 * 获取一个完整的日历面板日期数组（6行7列），包括本月所有天数，并补齐前后空白日期
 * @param date dayjs对象，表示当前月份
 * @returns dayjs对象数组，长度为42（6周*7天）
 */
function getAllDays(date: dayjs.Dayjs) {
  const startDate = date.startOf("month");
  const day = startDate.day();

  const daysInfo: Array<{ date: dayjs.Dayjs; currentMonth: boolean }> =
    new Array(6 * 7);

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
}

function renderDays(days: Array<{ date: dayjs.Dayjs, currentMonth: boolean}>) {
    const rows = [];
    for(let i = 0; i < 6; i++ ) {
        const row = [];
        for(let j = 0; j < 7; j++) {
            const item = days[i * 7 + j];
            row[j] = <div className={
                "calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')
            } key={item.date.date()}>{item.date.date()}</div>
        }
        rows.push(row);
    }
    return rows.map((row,index) => <div className="calendar-month-body-row" key={index}>{row}</div>)
}

function MonthCalendar(props: MonthCalendarProps) {
  const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const days = getAllDays(dayjs(props.value));

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {week}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">{renderDays(days)}</div>
    </div>
  );
}

export default MonthCalendar;
