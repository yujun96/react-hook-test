import {
  Children,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

function App() {
  const [, setNum] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setNum(Math.random());
    }, 2000);
  }, []);
 
  useEffect(() => {
    setTimeout(() => {
      setCount(2);
    }, 1000);
  }, []);

  return (
    <div>
      <MemoChildContext count={count} />
    </div>
  );
}

const MemoChildContext = memo(ChildContext);
function ChildContext(props: { count: number }) {
  console.log("child Render");
  return <div>{props.count}</div>;
}

export default App;
