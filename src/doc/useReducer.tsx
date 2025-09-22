import { useReducer } from "react";

interface Data {
  count: number;
  name: string;
}
type Action = {
  type: 'add' | 'sub' | 'reset' | 'changeName' | 'changeCount';
  payload?: number | string;
}

function conuterReducer(state: Data, action: Action): Data {
  switch (action.type) {
    case "add":
      return { ...state, count: state.count + 1 };
    case "sub":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: 0 };
    case "changeName":
      return { ...state, name: action.payload as string };
    case "changeCount":
      return { ...state, count: action.payload as number };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(conuterReducer, { count: 0, name: "" });

  return (
    <div>
      <h2>{state.name || "计数器"}: {state.count}</h2>
      <button onClick={() => dispatch({ type: "add" })}>+1</button>
      <button onClick={() => dispatch({ type: "sub" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>重置</button>
      <button onClick={() => dispatch({ type: "changeName", payload: "我的计数器" })}>
        改名
      </button>
      <button onClick={() => dispatch({ type: "changeCount", payload: 10 })}>
        设置为10
      </button>
    </div>
  );
}

export default App;
