import React, { useState } from 'react';
import Pixel from './Pixel';

const Grid = ({ rows, cols, drawMode, selectedColor }) => {
  // マウスボタンが押されているかどうかの状態を管理
  const [mouseDown, setMouseDown] = useState(false);
  // 各ピクセルの色の状態を管理する2次元配列
  const [pixels, setPixels] = useState(Array(rows).fill().map(() => Array(cols).fill('white')));

  // マウスボタンが離されたときのハンドラ
  const handleMouseUp = () => {
    setMouseDown(false);
  };

  // マウスボタンが押されたときのハンドラ
  const handleMouseDown = () => {
    setMouseDown(true);
  };

  // 特定のピクセルの色を更新する関数
  const updatePixelColor = (row, col, color) => {
    const newPixels = pixels.map((rowArray, i) =>
      rowArray.map((pixelColor, j) => (i === row && j === col ? color : pixelColor))
    );
    setPixels(newPixels);
  };

  // 塗りつぶしアルゴリズムを実装する関数
  const fill = (row, col, targetColor, fillColor) => {
    if (targetColor === fillColor) return;
    const newPixels = pixels.slice();
    const fillStack = [[row, col]];

    while (fillStack.length) {
      const [currentRow, currentCol] = fillStack.pop();
      if (newPixels[currentRow][currentCol] === targetColor) {
        newPixels[currentRow][currentCol] = fillColor;
        if (currentRow > 0) fillStack.push([currentRow - 1, currentCol]);
        if (currentRow < rows - 1) fillStack.push([currentRow + 1, currentCol]);
        if (currentCol > 0) fillStack.push([currentRow, currentCol - 1]);
        if (currentCol < cols - 1) fillStack.push([currentRow, currentCol + 1]);
      }
    }

    setPixels(newPixels);
  };

  // グリッドを生成する関数
  const createGrid = () => {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(
          <Pixel
            key={`${i}-${j}`}
            row={i}
            col={j}
            mouseDown={mouseDown}
            setMouseDown={setMouseDown}
            drawMode={drawMode}
            color={selectedColor}
            pixelColor={pixels[i][j]}
            updatePixelColor={updatePixelColor}
            fill={fill}
          />
        );
      }
      grid.push(
        <div key={i} style={{ display: 'flex' }}>
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ userSelect: 'none' }}
    >
      {createGrid()}
    </div>
  );
};

export default Grid;
