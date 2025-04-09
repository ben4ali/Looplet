import { useEffect, useRef, useState } from "react";
import {
  calculateFrameDimensions,
  drawFrame,
  calculateTotalFrames,
} from "../utils/spriteUtils";

export const useSpriteAnimation = (
  image: HTMLImageElement | null,
  columns: number,
  rows: number,
  interval: number
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { frameWidth, frameHeight } = calculateFrameDimensions(
      image,
      columns,
      rows
    );

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const totalFrames = calculateTotalFrames(columns, rows);

    drawFrame(context, image, currentFrame, columns, frameWidth, frameHeight);

    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
      }, interval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [image, columns, rows, currentFrame, isPlaying, interval]);

  const totalFrames = calculateTotalFrames(columns, rows);

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

  return {
    canvasRef,
    currentFrame,
    isPlaying,
    handlePlayPause,
    handleNextFrame,
    handlePreviousFrame,
    handleFirstFrame,
    handleLastFrame,
  };
};