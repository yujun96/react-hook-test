import { Children, forwardRef, useEffect, useRef, useState } from "react";


const BasicInput = forwardRef<HTMLInputElement, { placeholder?: string }>((props, ref) => {
  return <input ref={ref} {...props} />;
});

function App() {
const inputRef = useRef<HTMLInputElement>(null)
 const focusInput = () => {
  inputRef.current?.focus()
 }
  return <div>
    <BasicInput ref={inputRef} placeholder="请输入"></BasicInput>
  <button onClick={focusInput} >focus</button>
  </div>;
}

export default App;
