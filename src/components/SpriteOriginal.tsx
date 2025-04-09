import React, {FC} from "react";

interface SpriteOriginalProps {
  image: HTMLImageElement | null;
}
export const SpriteOriginal:FC<SpriteOriginalProps> = ({
  image,
}) => {
  return (
    <div className="original-container">
      <img src={image ? image.src : ""} alt="" />
    </div>
  );
};
