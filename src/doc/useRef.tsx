import { useEffect, useRef, useState } from "react";

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
  const [,forceRender] = useState<number>(0)
 
  return <div onClick={()=>{
    inputRef.current+=1
    forceRender(Math.random())
    console.log(inputRef)
  }}>
   {inputRef.current}
  </div>;
}

export default App;
