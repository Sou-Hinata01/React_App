import React from 'react';

const Pixel = ({ mouseDown, setMouseDown, drawMode, color, pixelColor, row, col, updatePixelColor, fill }) => {
  // マウスボタンが押されたときのハンドラ
  const handleMouseDown = () => {
    if (drawMode === 'fill') {
      // 塗りつぶしモードのときは塗りつぶし処理を呼び出す
      fill(row, col, pixelColor, color);
    } else {
      // それ以外のモードのときは色を適用
      applyColor();
    }
    setMouseDown(true);
  };

  // マウスがドラッグされているときのハンドラ
  const handleMouseOver = () => {
    if (mouseDown && drawMode !== 'fill') {
      applyColor();
    }
  };

  // 色を適用する関数
  const applyColor = () => {
    if (drawMode === 'pen') {
      updatePixelColor(row, col, color);
    } else if (drawMode === 'eraser') {
      updatePixelColor(row, col, 'white');
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: pixelColor,
        border: '1px solid #ddd',
      }}
    ></div>
  );
};

export default Pixel;
