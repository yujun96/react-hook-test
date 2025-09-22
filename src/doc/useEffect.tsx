import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // async function queryData() {
  //   return new Promise<number>((resolve) => {
  //     setTimeout(() => {
  //       resolve(666)
  //     }, 1000)
  //   })
  // }
 
  //  初始化执行   或者页面数据变化也会执行  有点类似 create mounted 这种周期函数
  // useEffect(() => {
  //   console.log('xxxxxxxxxx')
  //  queryData().then(res=> {
  //   console.log('99999999999')
  //   setCount(res)
  //  })
  // }, [count])
  // 第二个参数  会控制在什么时机执行
  // 如果第二个参数为空  则每次页面数据变化都会执行   
  // 如果第二个参数为空数组  则页面数据变化 不执行    
  // 如果第二个参数为数组  则每次页面数据变化根据数组以来的值有没有发生改变  有点像watch



  useEffect(() => {
    console.log('xxxxxxxxxx')
    const timer = setInterval(() => {
      console.log('yyyyyyyyyy')
    }, 1000)
    return () => {
      console.log('clean up')
      clearInterval(timer)
    }
   
  }, [count])

  //  有点类似beforeDestroyed 这种周期函数  先执行后清除


  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  );
}

export default App;
