import {
  Children,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  memo,
  useImperativeHandle,
  useRef,
  useCallback,
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

  const fn = useCallback(() => {
    console.log("fn Render");
  }, []);
  

  return (
    <div>
      <MemoChildContext count={count} callback={fn} />
    </div>
  );
}

const MemoChildContext = memo(ChildContext);
function ChildContext(props: { count: number, callback: () => void }) {
  console.log("child Render");
  return <div>{props.count}</div>;
}

export default App;
