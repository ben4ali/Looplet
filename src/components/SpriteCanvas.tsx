import { FC } from "react";
import { useSpriteAnimation } from "../hooks/useSpriteAnimation";

import blCorner from "../assets/ui/blCorner.png"
import brCorner from "../assets/ui/brCorner.png"
import tlCorner from "../assets/ui/tlCorner.png"
import trCorner from "../assets/ui/trCorner.png"

import longButton from "../assets/ui/longButton.png"
import button from "../assets/ui/button.png"
import nextButton from "../assets/ui/nextButton.png"
import backButton from "../assets/ui/backButton.png"
import forwardButton from "../assets/ui/forwardButton.png"
import backwardButton from "../assets/ui/backwardButton.png"

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
      <img className="corner-img" src={tlCorner} />
      <img className="corner-img" src={trCorner} />
      <img className="corner-img" src={blCorner} />
      <img className="corner-img" src={brCorner} />
      <div className="canvas-holder">

        <canvas ref={canvasRef} />
      </div>

      <div className="canvas-controls">
        <button onClick={handleFirstFrame}>
          <img className="bg-image" src={button} />
          <img src={backwardButton} />
        </button>
        <button onClick={handlePreviousFrame}>
          <img className="bg-image" src={button} />
          <img src={backButton} />
        </button>
        <button id="playButton" onClick={handlePlayPause}>
          <img className="bg-image" src={longButton} />
          <p>{isPlaying ? "PAUSE" : "PLAY"}</p>
        </button>
        <button onClick={handleNextFrame}>
          <img className="bg-image" src={button} />
          <img src={nextButton} />
        </button>
        <button onClick={handleLastFrame}>
          <img className="bg-image" src={button} />
          <img src={forwardButton} />
        </button>
      </div>
    </div>
  );
};