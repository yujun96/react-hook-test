import {
  Children,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

let countContext = createContext({
  a:1
});

function App() {
  return (
    <div>
      <countContext.Provider value={{a:2}}>
        <ChildContext />
      </countContext.Provider>
    </div>
  );
}

function ChildContext() {
  return (
    <div>
      <ChildContext2 />
    </div>
  );
}

function ChildContext2() {
  const count = useContext(countContext)
  return <div>33333{count.a}</div>;
}

export default App;
