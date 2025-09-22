import { useEffect, useState, useRef } from 'react';

// 问题代码 - 闭包陷阱
function ProblematicComponent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('问题代码：定时器启动');
        const timer = setInterval(() => {
            console.log('问题代码 - count:', count); // 永远是 0
            setCount(count + 1); // 永远是 0 + 1 = 1
        }, 1000);

        return () => {
            console.log('问题代码：清理定时器');
            clearInterval(timer);
        };
    }, []); // 空依赖数组

    return <div>问题代码 - count: {count}</div>;
}

// 解决方案1：使用函数式更新
function Solution1() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('解决方案1：定时器启动');
        const timer = setInterval(() => {
            console.log('解决方案1 - 使用函数式更新');
            setCount(prevCount => {
                console.log('解决方案1 - prevCount:', prevCount);
                return prevCount + 1;
            });
        }, 1000);

        return () => {
            console.log('解决方案1：清理定时器');
            clearInterval(timer);
        };
    }, []); // 空依赖数组

    return <div>解决方案1 - count: {count}</div>;
}

// 解决方案2：使用 useRef 保存最新值
function Solution2() {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);

    // 保持 ref 与 state 同步
    useEffect(() => {
        countRef.current = count;
    }, [count]);

    useEffect(() => {
        console.log('解决方案2：定时器启动');
        const timer = setInterval(() => {
            console.log('解决方案2 - countRef.current:', countRef.current);
            setCount(countRef.current + 1);
        }, 1000);

        return () => {
            console.log('解决方案2：清理定时器');
            clearInterval(timer);
        };
    }, []); // 空依赖数组

    return <div>解决方案2 - count: {count}</div>;
}

// 解决方案3：将 count 加入依赖数组
function Solution3() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('解决方案3：定时器启动，count:', count);
        const timer = setInterval(() => {
            console.log('解决方案3 - count:', count);
            setCount(count + 1);
        }, 1000);

        return () => {
            console.log('解决方案3：清理定时器');
            clearInterval(timer);
        };
    }, [count]); // 依赖 count，每次 count 变化都会重新创建定时器

    return <div>解决方案3 - count: {count}</div>;
}

// 解决方案4：使用 useCallback 优化
function Solution4() {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(prevCount => {
            console.log('解决方案4 - prevCount:', prevCount);
            return prevCount + 1;
        });
    };

    useEffect(() => {
        console.log('解决方案4：定时器启动');
        const timer = setInterval(() => {
            console.log('解决方案4 - 调用 incrementCount');
            incrementCount();
        }, 1000);

        return () => {
            console.log('解决方案4：清理定时器');
            clearInterval(timer);
        };
    }, []); // 空依赖数组

    return <div>解决方案4 - count: {count}</div>;
}

// 主演示组件
function ClosureTrapDemo() {
    const [showProblem, setShowProblem] = useState(true);
    const [showSolution1, setShowSolution1] = useState(false);
    const [showSolution2, setShowSolution2] = useState(false);
    const [showSolution3, setShowSolution3] = useState(false);
    const [showSolution4, setShowSolution4] = useState(false);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>useEffect 闭包陷阱演示</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <h2>控制面板</h2>
                <button onClick={() => setShowProblem(!showProblem)}>
                    {showProblem ? '隐藏' : '显示'} 问题代码
                </button>
                <button onClick={() => setShowSolution1(!showSolution1)}>
                    {showSolution1 ? '隐藏' : '显示'} 解决方案1
                </button>
                <button onClick={() => setShowSolution2(!showSolution2)}>
                    {showSolution2 ? '隐藏' : '显示'} 解决方案2
                </button>
                <button onClick={() => setShowSolution3(!showSolution3)}>
                    {showSolution3 ? '隐藏' : '显示'} 解决方案3
                </button>
                <button onClick={() => setShowSolution4(!showSolution4)}>
                    {showSolution4 ? '隐藏' : '显示'} 解决方案4
                </button>
            </div>

            {showProblem && (
                <div style={{ marginBottom: '20px', padding: '10px', border: '2px solid red', borderRadius: '5px' }}>
                    <h3 style={{ color: 'red' }}>❌ 问题代码（闭包陷阱）</h3>
                    <p>问题：count 永远是 0，因为定时器回调捕获了初始值</p>
                    <ProblematicComponent />
                </div>
            )}

            {showSolution1 && (
                <div style={{ marginBottom: '20px', padding: '10px', border: '2px solid green', borderRadius: '5px' }}>
                    <h3 style={{ color: 'green' }}>✅ 解决方案1：函数式更新</h3>
                    <p>使用 setCount(prevCount => prevCount + 1) 避免闭包陷阱</p>
                    <Solution1 />
                </div>
            )}

            {showSolution2 && (
                <div style={{ marginBottom: '20px', padding: '10px', border: '2px solid blue', borderRadius: '5px' }}>
                    <h3 style={{ color: 'blue' }}>✅ 解决方案2：useRef</h3>
                    <p>使用 useRef 保存最新值，避免闭包陷阱</p>
                    <Solution2 />
                </div>
            )}

            {showSolution3 && (
                <div style={{ marginBottom: '20px', padding: '10px', border: '2px solid orange', borderRadius: '5px' }}>
                    <h3 style={{ color: 'orange' }}>⚠️ 解决方案3：依赖数组</h3>
                    <p>将 count 加入依赖数组，但会频繁重新创建定时器</p>
                    <Solution3 />
                </div>
            )}

            {showSolution4 && (
                <div style={{ marginBottom: '20px', padding: '10px', border: '2px solid purple', borderRadius: '5px' }}>
                    <h3 style={{ color: 'purple' }}>✅ 解决方案4：useCallback</h3>
                    <p>使用 useCallback 优化函数，避免闭包陷阱</p>
                    <Solution4 />
                </div>
            )}

            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                <h3>总结</h3>
                <ul>
                    <li><strong>问题原因</strong>：闭包捕获了初始的 count 值</li>
                    <li><strong>最佳解决方案</strong>：使用函数式更新 setCount(prev => prev + 1)</li>
                    <li><strong>替代方案</strong>：使用 useRef 保存最新值</li>
                    <li><strong>不推荐</strong>：将 count 加入依赖数组（会频繁重新创建定时器）</li>
                </ul>
            </div>
        </div>
    );
}

export default ClosureTrapDemo;
