import React, { FC, useEffect, useRef, useState } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameWidth = image.width / columns;
    const frameHeight = image.height / rows;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const totalFrames = columns * rows;

    const drawFrame = (frame: number) => {
      const column = frame % columns;
      const row = Math.floor(frame / columns);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        column * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    drawFrame(currentFrame);

    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
      }, interval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [image, columns, rows, currentFrame, isPlaying, interval]);

  const totalFrames = columns * rows;

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextFrame = () => {
    setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
  };

  const handlePreviousFrame = () => {
    setCurrentFrame((prevFrame) => (prevFrame - 1 + totalFrames) % totalFrames);
  };

  const handleFirstFrame = () => {
    setCurrentFrame(0);
  };

  const handleLastFrame = () => {
    setCurrentFrame(totalFrames - 1);
  };

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