function randCoord(maxX, maxY) {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    }
}

function randomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateParticles() {
    for (var i = 0; i < particleCount; i++) {
        let pos = randCoord(config.w, config.h);
        particles.push(newParticle({
            x: pos.x,
            y: pos.y,
            color: randomColor()
        }));
    }
}

function drawParticles() {
    particles.forEach(function(particle) {
        particle.draw(ctx);
    })
}

function render() {
    canvasUtil.blurClear(ctx);
    simulate();
    drawParticles();

    if (!done) {
        requestAnimationFrame(render);
    }
}

function update() {
    canvasUtil.clear(textContext);

    if (config.text.length === 0) {
        disperseParticles();
        return;
    }

    textContext.font = canvasUtil.shrinkTextToFit(config.baseFontSize, config.text, config.fontFace, textContext);
    textContext.fillText(config.text, config.w / 2, config.h / 2, config.w);

    targetParticles(textContext);
    startSimulation();
}

function startSimulation() {
    if (done) {
        done = false;
        requestAnimationFrame(render);
    }
}

function targetParticles(ctx) {
    textPositions = canvasUtil.getTextPositions(ctx);
    assignTextTargets();
}

function disperseParticles() {
    config.text = '';
    particles.forEach(function(particle) {
        let target = randCoord(config.w, config.h);
        particle.setTarget(target);
        particle.setVector(vector(particle, target));
    })
    startSimulation();
}

function assignTextTargets() {
    particles.forEach(function(particle) {
        let target = textPositions[Math.floor(Math.random() * textPositions.length)];
        particle.setTarget(target);
        particle.setVector(vector(particle, target));
    })
}

function simulate() {
    done = true;
    particles.forEach(function(particle) {
        if (particle.simulate()) {
            done = false;
        }
    })
}

let canvas = document.getElementById("canvas"),
    textCanvas = document.createElement("canvas"),
    area = config.w * config.h,
    done = true,
    particleCount = area * config.particleRate;

canvas.width = config.w;
canvas.height = config.h;
textCanvas.width = config.w;
textCanvas.height = config.h;

let ctx = canvas.getContext('2d'),
    textContext = textCanvas.getContext('2d'),
    particles = [],
    textPositions = [];

textContext.fillStyle = "#FFFFFF";
textContext.textAlign = "center";
textContext.textBaseline = 'middle';

generateParticles();

update();

var gui = new dat.GUI({
    autoPlace: false
});

var customContainer = document.getElementById('gui');
customContainer.appendChild(gui.domElement);

gui.add(config, 'text').listen().onFinishChange(update).name('Text');
gui.add(config, 'fontFace').onFinishChange(update).name('Font');
gui.add(config, 'baseFontSize', {
    Small: 100,
    Normal: 500,
    Large: 1000
}).name('Font Size').onFinishChange(update);
gui.add(window, 'disperseParticles').name('Disperse');