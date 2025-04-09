import React, { FC } from "react";
import { useSpriteAnimation } from "../hooks/useSpriteAnimation";

interface SpriteCanvasProps {
  image: HTMLImageElement | null;
  columns: number;
  rows: number;
  interval: number;
}

export const SpriteCanvas: FC<SpriteCanvasProps> = ({
  image,
  columns,
  rows,
  interval,
}) => {
  const {
    canvasRef,
    handlePlayPause,
    handleNextFrame,
    handlePreviousFrame,
    handleFirstFrame,
    handleLastFrame,
    isPlaying,
  } = useSpriteAnimation(image, columns, rows, interval);

  return (
    <div className="canvas-container">
      <div className="canvas-holder">
        <canvas ref={canvasRef} />
      </div>

      <div className="canvas-controls">
        <button onClick={handleFirstFrame}>First Frame</button>
        <button onClick={handlePreviousFrame}>Previous Frame</button>
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleNextFrame}>Next Frame</button>
        <button onClick={handleLastFrame}>Last Frame</button>
      </div>
    </div>
  );
};