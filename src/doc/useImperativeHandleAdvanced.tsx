import { forwardRef, useImperativeHandle, useRef, useState } from "react";

// 定义要暴露的方法接口
interface CustomInputRef {
  focus: () => void;
  blur: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  clear: () => void;
  getLength: () => number;
}

interface CustomInputProps {
  placeholder?: string;
  defaultValue?: string;
}

const CustomInput = forwardRef<CustomInputRef, CustomInputProps>(
  ({ placeholder, defaultValue = "" }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(defaultValue);

    // 使用 useImperativeHandle 自定义暴露的方法
    useImperativeHandle(ref, () => {
      return {
        // 聚焦输入框
        focus: () => {
          inputRef.current?.focus();
        },
        
        // 失焦输入框
        blur: () => {
          inputRef.current?.blur();
        },
        
        // 获取输入值
        getValue: () => {
          return value;
        },
        
        // 设置输入值
        setValue: (newValue: string) => {
          setValue(newValue);
          if (inputRef.current) {
            inputRef.current.value = newValue;
          }
        },
        
        // 清空输入框
        clear: () => {
          setValue("");
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        },
        
        // 获取输入长度
        getLength: () => {
          return value.length;
        }
      };
    }, [value]);

    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          margin: "4px"
        }}
      />
    );
  }
);

function App() {
  const inputRef = useRef<CustomInputRef>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    inputRef.current?.blur();
  };

  const handleGetValue = () => {
    const value = inputRef.current?.getValue();
    alert(`当前值: ${value}`);
  };

  const handleSetValue = () => {
    inputRef.current?.setValue("Hello World!");
  };

  const handleClear = () => {
    inputRef.current?.clear();
  };

  const handleGetLength = () => {
    const length = inputRef.current?.getLength();
    alert(`输入长度: ${length}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>useImperativeHandle 高级示例</h2>
      
      <CustomInput 
        ref={inputRef} 
        placeholder="请输入内容..." 
        defaultValue="初始值"
      />
      
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleFocus} style={{ margin: "4px" }}>聚焦</button>
        <button onClick={handleBlur} style={{ margin: "4px" }}>失焦</button>
        <button onClick={handleGetValue} style={{ margin: "4px" }}>获取值</button>
        <button onClick={handleSetValue} style={{ margin: "4px" }}>设置值</button>
        <button onClick={handleClear} style={{ margin: "4px" }}>清空</button>
        <button onClick={handleGetLength} style={{ margin: "4px" }}>获取长度</button>
      </div>
    </div>
  );
}

export default App;
