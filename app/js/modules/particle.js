let particlePrototype = {
    x: 0,
    y: 0,
    r: 1,
    color: '#FFF',
    vector: false,
    target: false,
    simulate: function() {
        if (!this.vector || !this.target) {
            return false;
        }

        if (physics.hitTest(this, this.target)) {
            this.target = false;
            this.vector = false;
        } else {
            physics.move(this, this.vector);
        }

        return true;
    },
    setVector: function(vector) {
        this.vector = vector;
    },
    setTarget: function(target) {
        this.target = target;
    },
    draw: function draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function newParticle(options) {
    return _.extend(Object.create(particlePrototype), options);
}
