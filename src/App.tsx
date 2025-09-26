import dayjs from 'dayjs';
import Calendar from './components/calendar/Calendar';
import { useEffect } from 'react';


function App() {
  return (
    <Calendar value={dayjs().toDate()}></Calendar>
  );
}

export default App;
