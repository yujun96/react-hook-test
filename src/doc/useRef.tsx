import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

// function useMergeState<T>(
//   defaultStateValue: T,
//   props?: {
//     defaultValue?: T;
//     value?: T;
//   }
// ): [T, Dispatch<SetStateAction<T>>] {
 

//   const { defaultValue, value:propsValue } = props || {};
//   const isFirstRender = useRef(true);

//   const [stateValue, setStateValue] = useState<T>(()=> {
//     if (propsValue !== undefined) {
//       return propsValue;
//     }
//     if (defaultValue !== undefined) {
//       return defaultValue;
//     }
//     return defaultStateValue;
//   });


//   useEffect(()=> {
//     if(propsValue === undefined && !isFirstRender.current) {
//       setStateValue(propsValue!);
//     }
//     isFirstRender.current = false;
//   },[propsValue])

//   const mergedValue = propsValue === undefined ? stateValue : propsValue;

//   return [mergedValue, setStateValue];



// }

// 用于获取dom
// function App() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   useEffect(()=> {
//     inputRef.current?.focus()
//   })
//   return <div>
//     <input type="text" ref={inputRef} />
//   </div>;
// }

function App() {
  const inputRef = useRef<number>(0);
  const [, forceRender] = useState<number>(0);

  return (
    <div
      onClick={() => {
        inputRef.current += 1;
        forceRender(Math.random());
        console.log(inputRef);
      }}
    >
      {inputRef.current}
    </div>
  );
}

export default App;
