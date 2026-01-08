export default function sketch(p) {
    let particles = [];
    let flowField = [];
    let cols, rows;
    let scl = 20; // Scale of the grid
    let zoff = 0; // Z-offset for noise

    // State
    p.state = {
        intensity: 20,
        coreValue: 'Peace'
    };

    const PALETTES = {
        Peace: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'], // Teals/Cyans
        Hope: ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58'], // Yellows
        Fear: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350'], // Reds
        Connection: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC'] // Purples
    };

    p.updateWithProps = (props) => {
        if (props.intensity !== undefined) p.state.intensity = props.intensity;
        if (props.coreValue !== undefined) p.state.coreValue = props.coreValue;
    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);

        // Initialize Particles
        for (let i = 0; i < 500; i++) {
            particles.push(new Particle(p));
        }

        p.background(5);
    };

    p.draw = () => {
        // Fade background for trail effect
        p.noStroke();
        p.fill(5, 50); // Alpha controls trail length
        p.rect(0, 0, p.width, p.height);

        // Calculate Flow Field
        let yoff = 0;
        // Intensity maps to noise detail/turbulence
        // Increased range: 0.05 to 0.4 for more chaotic fields
        let noiseInc = p.map(p.state.intensity, 0, 100, 0.05, 0.4);

        // Force magnitude based on intensity
        let forceMag = p.map(p.state.intensity, 0, 100, 0.5, 4);

        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                let index = x + y * cols;
                let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
                let v = p5.Vector.fromAngle(angle);
                v.setMag(forceMag); // dynamic magnitude
                flowField[index] = v;
                xoff += noiseInc;
            }
            yoff += noiseInc;
        }
        // Time evolution speed
        // Much faster at high intensity
        zoff += p.map(p.state.intensity, 0, 100, 0.002, 0.04);

        // Update and Show Particles
        const colors = PALETTES[p.state.coreValue];

        particles.forEach(particle => {
            particle.follow(flowField, cols, scl);
            particle.update(p.state.intensity);
            particle.edges();
            particle.show(colors);
            particle.interact(p.mouseX, p.mouseY);
        });
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);
    };

    // Particle Class
    class Particle {
        constructor(p) {
            this.p = p;
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.maxSpeed = 2;
            this.prevPos = this.pos.copy();
        }

        follow(vectors, cols, scl) {
            let x = this.p.floor(this.pos.x / scl);
            let y = this.p.floor(this.pos.y / scl);
            let index = x + y * cols;
            if (index >= 0 && index < vectors.length) {
                let force = vectors[index];
                this.applyForce(force);
            }
        }

        applyForce(force) {
            this.acc.add(force);
        }

        interact(mx, my) {
            let mouse = this.p.createVector(mx, my);
            let dir = p5.Vector.sub(this.pos, mouse);
            let d = dir.mag();
            if (d < 150) { // Increased interaction radius
                dir.setMag(100 / (d + 0.1)); // Strong repel
                this.applyForce(dir);
            }
        }

        update(intensity) {
            // Speed range increased: 2 to 24 (was 2 to 10)
            this.maxSpeed = this.p.map(intensity, 0, 100, 2, 24);
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);

            // Wrap edges code handled in edges()
        }

        edges() {
            let wrapped = false;
            if (this.pos.x > this.p.width) { this.pos.x = 0; wrapped = true; }
            if (this.pos.x < 0) { this.pos.x = this.p.width; wrapped = true; }
            if (this.pos.y > this.p.height) { this.pos.y = 0; wrapped = true; }
            if (this.pos.y < 0) { this.pos.y = this.p.height; wrapped = true; }

            if (wrapped) this.updatePrev();
        }

        updatePrev() {
            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
        }

        show(colors) {
            // Pick color based on position
            let colIndex = this.p.floor(this.p.map(this.pos.x, 0, this.p.width, 0, colors.length));
            colIndex = this.p.constrain(colIndex, 0, colors.length - 1);

            this.p.stroke(colors[colIndex]);
            this.p.strokeWeight(1);
            // this.p.point(this.pos.x, this.pos.y);
            this.p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
            this.updatePrev();
        }
    }
}

// Need to define p5 locally if using instance mode inside module? 
// No, the 'p' argument is the p5 instance passed by the wrapper.
// We need 'p5' for Vector math though. 
// Actually 'p.createVector' exists. But 'p5.Vector.fromAngle' might need the global or 'p.Vector'.
// 'p5' is usually not available globally in instance mode unless imported.
// I used 'p5.Vector.fromAngle' in the code. I should change it to 'p5.Vector.fromAngle' but I need to make sure p5 is defined or use static methods from p if available.
// In instance mode 'p' typically has most p5 functions.
// 'p5.Vector' might be 'p.constructor.Vector' or just available if I import p5. 
// Safest is to rely on 'p' methods: 'v = p.createVector(...)'. 
// 'p5.Vector.fromAngle' -> 'p.createVector(Math.cos(a), Math.sin(a))' or similar if necessary, but usually 'p5' is imported.

import p5 from 'p5'; // We need this import for static references if we use them, or just use p methods.
