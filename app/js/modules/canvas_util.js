const canvasUtil = {
  clear: ctx => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },
  blurClear: ctx => {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },
  shrinkTextToFit: (size, text, fontFace, ctx) => {
    // http://stackoverflow.com/questions/20551534/size-to-fit-font-on-a-canvas

    let reducedSize = size;

    // lower the font size until the text fits the canvas
    do {
      reducedSize--;
      ctx.font = reducedSize + 'px ' + config.fontFace;
    } while (ctx.measureText(text).width > ctx.canvas.width);

    return ctx.font;
  },
  getFilledPositions: ctx => {
    const pixelData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    /*
    * TODO, only scan the region possible to have text in it
    * Based on font size, margins, etc, some sections guaranteed to be empty
    */

    //scan every single pixel and check if it's coloured.
    const temp = [];
    for (let x = 0; x < ctx.canvas.width; x++) {
      for (let y = 0; y < ctx.canvas.height; y++) {
        let index = (x + y * ctx.canvas.width) * 4;

        if (pixelData.data[index + 0] !== 0) {
          temp.push({
            x: x,
            y: y,
          });
        }
      }
    }

    return temp;
  },
};
