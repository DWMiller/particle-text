let canvasUtil = {
    clear: function(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    blurClear: function(ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    shrinkTextToFit: function(size, text, fontFace, ctx) {

        // http://stackoverflow.com/questions/20551534/size-to-fit-font-on-a-canvas

        let reducedSize = size;

        // lower the font size until the text fits the canvas
        do {
            reducedSize--;
            ctx.font = reducedSize + 'px ' + config.fontFace;

        } while (ctx.measureText(text).width > ctx.canvas.width);

        return ctx.font;
    },
    getTextPositions: function getTextPositions(ctx) {
        //scan every single pixel and check if it's coloured.
        //yes, really
        let pixelData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

        let temp = [];

        //TODO, only scan the region possible to have text in it
        for (let x = 0; x < ctx.canvas.width; x++) {
            for (let y = 0; y < ctx.canvas.height; y++) {

                let index = (x + y * ctx.canvas.width) * 4;

                if (pixelData.data[index + 0] !== 0) {
                    temp.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        return temp;
    }
};
