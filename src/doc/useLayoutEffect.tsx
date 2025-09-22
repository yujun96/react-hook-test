import { useState, useEffect, useLayoutEffect } from "react";

// 示例1: 数据获取 - 使用 useEffect
function DataFetchingExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // 模拟 API 调用
    setTimeout(() => {
      setData("获取到的数据");
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <h3>数据获取示例 (useEffect)</h3>
      {loading ? <p>加载中...</p> : <p>数据: {data}</p>}
    </div>
  );
}

// 示例2: DOM 测量 - 使用 useLayoutEffect
function DOMMeasurementExample() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = document.getElementById('measure-element');
    if (element) {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height
      });
    }
  }, [count]);

  return (
    <div>
      <h3>DOM 测量示例 (useLayoutEffect)</h3>
      <p>尺寸: {dimensions.width} x {dimensions.height}</p>
      <div 
        id="measure-element"
        style={{
          width: `${100 + count * 10}px`,
          height: '50px',
          backgroundColor: 'lightgreen',
          margin: '10px 0'
        }}
      >
        动态尺寸元素
      </div>
      <button onClick={() => setCount(count + 1)}>增加尺寸</button>
    </div>
  );
}

// 示例3: 避免闪烁 - 使用 useLayoutEffect
function FlickerPreventionExample() {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(0);

  // 使用 useEffect 可能导致闪烁
  useEffect(() => {
    if (show) {
      setPosition(100);
    }
  }, [show]);

  return (
    <div>
      <h3>闪烁预防示例</h3>
      <button onClick={() => setShow(!show)}>
        {show ? '隐藏' : '显示'} 方块
      </button>
      {show && (
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'orange',
            transform: `translateX(${position}px)`,
            transition: 'transform 0.3s'
          }}
        >
          方块
        </div>
      )}
    </div>
  );
}

// 示例4: 性能对比
function PerformanceComparison() {
  const [count, setCount] = useState(0);
  const [useEffectTime, setUseEffectTime] = useState(0);
  const [useLayoutEffectTime, setUseLayoutEffectTime] = useState(0);

  useEffect(() => {
    const start = performance.now();
    // 模拟一些计算
    for (let i = 0; i < 1000000; i++) {
      Math.random();
    }
    const end = performance.now();
    setUseEffectTime(end - start);
  }, [count]);

  useLayoutEffect(() => {
    const start = performance.now();
    // 模拟一些计算
    for (let i = 0; i < 1000000; i++) {
      Math.random();
    }
    const end = performance.now();
    setUseLayoutEffectTime(end - start);
  }, [count]);

  return (
    <div>
      <h3>性能对比示例</h3>
      <p>计数: {count}</p>
      <p>useEffect 执行时间: {useEffectTime.toFixed(2)}ms</p>
      <p>useLayoutEffect 执行时间: {useLayoutEffectTime.toFixed(2)}ms</p>
      <button onClick={() => setCount(count + 1)}>更新计数</button>
      <p style={{ color: 'red', fontSize: '12px' }}>
        注意: useLayoutEffect 会阻塞浏览器绘制，可能导致页面卡顿
      </p>
    </div>
  );
}

export default function ComparisonExample() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>useEffect vs useLayoutEffect 详细对比</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <DataFetchingExample />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <DOMMeasurementExample />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <FlickerPreventionExample />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <PerformanceComparison />
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2>总结</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>useEffect 适用场景：</h3>
            <ul>
              <li>数据获取和订阅</li>
              <li>事件监听器</li>
              <li>定时器</li>
              <li>大多数副作用操作</li>
              <li>不需要同步读取 DOM 的场景</li>
            </ul>
          </div>
          <div>
            <h3>useLayoutEffect 适用场景：</h3>
            <ul>
              <li>需要同步读取 DOM 布局信息</li>
              <li>避免视觉闪烁</li>
              <li>需要在浏览器绘制前完成的操作</li>
              <li>DOM 测量和调整</li>
              <li>动画相关的 DOM 操作</li>
            </ul>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
          <h4>⚠️ 重要提醒：</h4>
          <p>
            <strong>useLayoutEffect</strong> 会阻塞浏览器绘制，应该谨慎使用。
            只有在确实需要同步执行时才使用它，否则优先使用 <strong>useEffect</strong>。
          </p>
        </div>
      </div>
    </div>
  );
}
