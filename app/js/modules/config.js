const config = {
  text: 'Type in the box ↑',
  fontFace: 'Comic Sans',
  h: document.body.clientHeight,
  w: document.body.clientWidth,
  baseFontSize: 500,
  particleRate: 0.001, //number of particles per pixel
};

config.area = config.w * config.h;
config.particleCount = config.area * config.particleRate;
