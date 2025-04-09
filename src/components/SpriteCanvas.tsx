import React, { FC, useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameWidth = image.width / columns;
    const frameHeight = image.height / rows;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    let currentFrame = 0;
    const totalFrames = columns * rows;

    const drawFrame = () => {
      const column = currentFrame % columns;
      const row = Math.floor(currentFrame / columns);

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

      currentFrame = (currentFrame + 1) % totalFrames;
    };

    const intervalId = setInterval(drawFrame, interval);

    return () => clearInterval(intervalId);
  }, [image, columns, rows, interval]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};