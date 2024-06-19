import React, { useState } from 'react';
import Grid from './Grid';
import './App.css';

const App = () => {
  // 描画モードの状態を管理
  const [drawMode, setDrawMode] = useState('pen');
  // 選択された色の状態を管理
  const [selectedColor, setSelectedColor] = useState('black');

  // 描画モードを変更するハンドラ
  const handleModeChange = (mode) => {
    setDrawMode(mode);
  };

  // 色を変更するハンドラ
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="App">
      <h1>ドット絵作成アプリ</h1>
      <div>
        {/* 各モードに切り替えるボタン */}
        <button onClick={() => handleModeChange('pen')}>ペンモード</button>
        <button onClick={() => handleModeChange('eraser')}>消しゴムモード</button>
        <button onClick={() => handleModeChange('fill')}>塗りつぶしモード</button>
      </div>
      {/* 色を選択するためのカラーピッカー */}
      <input type="color" value={selectedColor} onChange={handleColorChange} />
      {/* グリッドコンポーネントにプロパティを渡す */}
      <Grid rows={16} cols={16} drawMode={drawMode} selectedColor={selectedColor} />
    </div>
  );
};

export default App;
