import React, { FC } from "react";
import { SpriteOriginal } from "./SpriteOriginal";

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
      <h3>Controls</h3>
      <div className="input-group">
        <label className="">Columns:</label>
        <input
          type="number"
          min="1"
          max="16"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className=""
        />
      </div>
      <div className="input-group">
        <label className="">Rows:</label>
        <input
          type="number"
          min="1"
          max="16"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className=""
        />
      </div>
      <div className="input-group">
        <label className="">Interval (ms):</label>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className=""
        />
        <span>{interval} ms</span>
      </div>
      <div className="input-group">
        <label className="block mb-2">Image:</label>
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
      <SpriteOriginal image={image} />
    </div>
  );
};
