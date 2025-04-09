export const calculateFrameDimensions = (
    image: HTMLImageElement,
    columns: number,
    rows: number
  ) => {
    const frameWidth = image.width / columns;
    const frameHeight = image.height / rows;
    return { frameWidth, frameHeight };
  };
  
  export const drawFrame = (
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    frame: number,
    columns: number,
    frameWidth: number,
    frameHeight: number
  ) => {
    const column = frame % columns;
    const row = Math.floor(frame / columns);
  
    context.clearRect(0, 0, frameWidth, frameHeight);
    context.drawImage(
      image,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth,
      frameHeight
    );
  };
  
  export const calculateTotalFrames = (columns: number, rows: number) => {
    return columns * rows;
  };