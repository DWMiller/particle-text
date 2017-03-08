function generateParticles(count) {
  const particles = [];

  while (particles.length < count) {
    let pos = util.randCoord(config.w, config.h);
    particles.push(
      createParticle({
        x: pos.x,
        y: pos.y,
        color: util.randomColor(),
      })
    );
  }

  return particles;
}

function render() {
  canvasUtil.blurClear(ctx);
  simulate();

  state.particles.forEach(particleDraw);

  if (!state.done) {
    window.requestAnimationFrame(render);
  }
}

function updateTextCanvas() {
  canvasUtil.clear(textContext);
  textContext.font = canvasUtil.shrinkTextToFit(
    config.baseFontSize,
    config.text,
    config.fontFace,
    textContext
  );
  textContext.fillText(config.text, config.w / 2, config.h / 2, config.w);
  return canvasUtil.getFilledPositions(textContext);
}

function onTextChange() {
  if (config.text.length === 0) {
    disperseParticles();
    return;
  }

  const textPositions = updateTextCanvas();
  assignTextTargets(textPositions);
  startSimulation();
}

function startSimulation() {
  state.inTransitionParticles = [...state.particles];
  if (state.done) {
    state.done = false;
    render();
  }
}

function disperseParticles() {
  config.text = '';
  state.particles.forEach(particle => {
    let target = util.randCoord(config.w, config.h);
    particle.setTarget(target);
    particle.setVector(createVector(particle, target));
  });
  startSimulation();
}

function setInitialPositions(textPositions) {
  state.particles.forEach(particle => {
    const target = util.arrayRand(textPositions);
    particle.x = target.x;
    particle.y = target.y;
  });
  render();
}

function assignTextTargets(textPositions) {
  state.particles.forEach(particle => {
    const target = util.arrayRand(textPositions);
    particle.setTarget(target);
    particle.setVector(createVector(particle, target));
  });
}

function simulate() {
  state.inTransitionParticles = state.inTransitionParticles.filter(
    particle => particle.target
  );

  state.inTransitionParticles.forEach(particleSimulate);
  state.done = state.inTransitionParticles.length < 1;
}

const canvas = document.getElementById('canvas'),
  textCanvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d'),
  textContext = textCanvas.getContext('2d');

canvas.width = config.w;
canvas.height = config.h;
textCanvas.width = config.w;
textCanvas.height = config.h;

textContext.fillStyle = '#FFFFFF';
textContext.textAlign = 'center';
textContext.textBaseline = 'middle';

const state = {
  done: true,
  particles: generateParticles(config.particleCount),
  inTransitionParticles: [],
};

const textPositions = updateTextCanvas();
setInitialPositions(textPositions);

addGui();
