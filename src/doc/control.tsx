import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
// 非受控
// interface CalendarProps {
//   defaultValue: string;
//   onChange: (value: string) => void;
// }

// function Calendar(props: CalendarProps) {
//   const [value, setValue] = useState(() => props.defaultValue);

//   const changeCurrentDate = (newValue: string) => {
//     props?.onChange?.(newValue);
//     setValue(newValue);
//   };

//   return (
//     <div>
//       {value}
//       <button onClick={() => changeCurrentDate("2024/09/01")}>
//         change 2024/09/01
//       </button>
//       <button onClick={() => changeCurrentDate("2026/09/01")}>
//         change 2026/09/01
//       </button>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <Calendar
//         defaultValue={new Date().toLocaleDateString()}
//         onChange={(value) => {
//           console.log(value);
//         }}
//       />
//     </div>
//   );
// }

// 受控组件
// interface CalendarProps {
//   value?: string;
//   defaultValue?: string;
//   onChange?: (value: string) => void;
// }

// function Calendar(props: CalendarProps) {

//   return (
//     <div>
//       {props.value}
//       <button onClick={() => props?.onChange?.('2024/09/01')}>change 2024/09/01</button>
//       <button onClick={() => props?.onChange?.('2026/09/01')}>change 2026/09/01</button>
//     </div>
//   )
// }

// function App() {
//   const [value, setValue] = useState(new Date().toLocaleDateString());
//   return (
//     <div>
//       <Calendar value={value} onChange={(value) => setValue(value)}></Calendar>
//     </div>
//   )
// }


interface CalendarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function Calendar(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  const [value, setValue] = useState(() => propsValue || defaultValue);

  const isFirstRender  = useRef(true)

  useEffect(()=> {
    if (!isFirstRender.current && !propsValue) {
      setValue(propsValue);
    }
    isFirstRender.current = false;
  }, [propsValue])

// 没有propsValue说明是非受控组件      有propsValue说明是受控组件
  const mergedValue = propsValue === undefined ? value : propsValue;

  function changeValue(date: string) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  } 

  return (
    <div>
      {mergedValue}
      <button onClick={() => changeValue?.('2024/09/01')}>change 2024/09/01</button>
      <button onClick={() => changeValue?.('2026/09/01')}>change 2026/09/01</button>
    </div>
  )
}

// function App() {
//   // const [value, setValue] = useState(new Date().toLocaleDateString());
//   return (
//     <div>
//       <Calendar defaultValue={new Date().toLocaleDateString()} onChange={(value) => console.log(value)}></Calendar>
//     </div>
//   )
// }

function App() {
  const [value, setValue] = useState(new Date().toLocaleDateString());
  return (
    <div>
      <Calendar value={value} onChange={(value) => setValue(value)}></Calendar>
    </div>
  )
}


export default App;
