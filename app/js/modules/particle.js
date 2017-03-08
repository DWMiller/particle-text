const particlePrototype = {
  x: 0,
  y: 0,
  r: 1,
  color: '#FFF',
  vector: false,
  target: false,
  setVector: function(vector) {
    this.vector = vector;
  },
  setTarget: function(target) {
    this.target = target;
  },
};

function particleSimulate(particle) {
  if (!particle.vector || !particle.target) {
    return;
  }

  physics.move(particle, particle.vector);

  if (physics.hitTest(particle, particle.target)) {
    particle.target = false;
    particle.vector = false;
    return;
  }
}

function particleDraw({ x, y, r, color }) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
}

function createParticle(options) {
  return Object.assign(Object.create(particlePrototype), options);
}
