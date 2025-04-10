import React, { FC } from "react";
import { SpriteOriginal } from "./SpriteOriginal";

import longPanel from "../assets/ui/longPanel.png"
import fileIcon from "../assets/ui/fileIcon.png"

import nextButton from "../assets/ui/nextButton.png"
import backButton from "../assets/ui/backButton.png"
interface SpriteControlsProps {
  columns: number;
  rows: number;
  interval: number;
  image : HTMLImageElement | null;
  setColumns: (columns: number) => void;
  setRows: (rows: number) => void;
  setInterval: (interval: number) => void;
  setImage: (image: HTMLImageElement | null) => void;
}

export const SpriteControls: FC<SpriteControlsProps> = ({
  columns,
  rows,
  interval,
  image,
  setColumns,
  setRows,
  setInterval,
  setImage,
}: SpriteControlsProps) => {
  return (
    <div className="controls-container">
      <img src={longPanel}/>
      <h3>Controls</h3>
      <div className="input-group number-group">
        <label className="">Columns</label>
        <div className="button-group">
          <button onClick={() => setColumns(Math.max(1, columns - 1))}>
        <img src={backButton} alt="Back" />
          </button>
          <span>{columns}</span>
          <button onClick={() => setColumns(Math.min(16, columns + 1))}>
        <img src={nextButton} alt="Next" />
          </button>
        </div>
      </div>
      <div className="input-group number-group">
        <label className="">Rows</label>
        <div className="button-group">
          <button onClick={() => setRows(Math.max(1, rows - 1))}>
            <img src={backButton} alt="Back" />
          </button>
          <span>{rows}</span>
          <button onClick={() => setRows(Math.min(16, rows + 1))}>
            <img src={nextButton} alt="Next" />
          </button>
        </div>
      </div>
      <div className="input-group slider-group">
        <label className="">Interval (ms)</label>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="slider-input"
        />
        <span>{interval} ms</span>
      </div>
      <div className="input-group upload-group">
        <div className="upload-zone">
          <div className="file-label">
              <img src={fileIcon}/>
              <p>UPLOAD YOUR SPRITESHEET</p>
          </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const img = new Image();
              img.src = URL.createObjectURL(e.target.files[0]);
              img.onload = () => setImage(img);
            }
          }}
          className=""
        />
        </div>
      </div>
      <SpriteOriginal image={image} />
    </div>
  );
};
