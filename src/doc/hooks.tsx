// import { useEffect, useRef, useState } from "react";
// import type { ChangeEvent } from "react";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";

function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
  }
): [T, Dispatch<SetStateAction<T>>] {
 

  const { defaultValue, value:propsValue,onChange  } = props || {};
  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(()=> {
    if (propsValue !== undefined) {
      return propsValue;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return defaultStateValue;
  });


  useEffect(()=> {
    if(propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }
    isFirstRender.current = false;
  },[propsValue])

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
  } 

  const setState = useCallback((value: SetStateAction<T>) => {
    let res = isFunction(value) ? value(stateValue) : value

    if (propsValue === undefined) {
      setStateValue(res);
    }
    onChange?.(res);
  }, [stateValue]);





  return [mergedValue, setState];

}


interface CalendarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function Calendar(props: CalendarProps) {
  const {
    value: propsValue,
    defaultValue,
    onChange
  } = props;


  const [mergedValue, setValue] = useMergeState(new Date().toLocaleDateString(), {
    value:propsValue,
    defaultValue: defaultValue,
    onChange: onChange
  });


  return (
    <div>
      {mergedValue}
      <button onClick={() => setValue?.('2024/09/01')}>change 2024/09/01</button>
      <button onClick={() => setValue?.('2026/09/01')}>change 2026/09/01</button>
    </div>
  )
}

function App() {
  // const [value, setValue] = useState(new Date().toLocaleDateString());
  return (
    <div>
      <Calendar defaultValue={new Date().toLocaleDateString()} onChange={(value) => console.log(value)}></Calendar>
    </div>
  )
}

// function App() {
//   const [value, setValue] = useState(new Date().toLocaleDateString());
//   return (
//     <div>
//       <Calendar value={value} onChange={(value) => setValue(value)}></Calendar>
//     </div>
//   )
// }


export default App;
