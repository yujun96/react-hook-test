import { Children, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";


interface RefProps {
  aaa: () => void;
}

const BasicInput = forwardRef<RefProps, { placeholder?: string }>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref,()=> {
      return {
        aaa:()=> {
          inputRef.current?.focus();
        }
      }
    },[inputRef])
    return <input ref={inputRef} {...props} />;
  }
);

function App() {
  const inputRef = useRef<RefProps>(null);
  const focusInput = () => {
    inputRef.current?.aaa();
  };
  return (
    <div>
      <BasicInput ref={inputRef} placeholder="请输入"></BasicInput>
      <button onClick={focusInput}>focus</button>
    </div>
  );
}

export default App;

