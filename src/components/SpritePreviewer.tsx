import { useState } from "react";
import { SpriteCanvas } from "./SpriteCanvas";
import { SpriteControls } from "./SpriteControls";
import "../styles/style-spritepreviewer.css"
import Spritelab from "../assets/Spritelab.png"

const SpritePreviewer = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);
  const [interval, setInterval] = useState(100);

  return (
    <div className="spritepreviewer-container">
      <div className="spritepreviewer-header">
        <h1>SPRITELAB</h1>
        <img src={Spritelab} alt="spritelab" className="spritelab-logo" />
      </div>

      <div className="spritepreviewer-overview">
          <SpriteCanvas
            image={image}
            columns={columns}
            rows={rows}
            interval={interval}
          />
          <SpriteControls
            columns={columns}
            rows={rows}
            interval={interval}
            image={image}
            setColumns={setColumns}
            setRows={setRows}
            setInterval={setInterval}
            setImage={setImage}
          />
      </div>
    </div>
  );
};

export default SpritePreviewer;
