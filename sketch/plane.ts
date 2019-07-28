
class Plane {

    private points: p5.Vector[] = [];
    private wobbles: number[] = [];
    nodesX = 9; nodesY = 11;
    lineLengthX = 200; lineLengthY = 100;
    private colorsLines: p5.Color[] = [];
    private colorsSpheres: p5.Color[] = [];

    setup() {
        this.lineLengthX = settings.lineLengthX;
        this.lineLengthY = settings.lineLengthY;
        this.points = [];
        this.wobbles = [];
        this.initPoints();
    }

    draw() {
        this.update();
        this.drawSpheres();
        this.drawLines();
        this.drawFaces();
        this.drawSpinning();
    }

    update() {
        strokeWeight(settings.strokeWeight);
        for (let i = 0; i < this.wobbles.length; i++) {
            if (this.wobbles[i]) {
                this.wobbles[i]--;
            }
            if (this.points[i]) {
                this.points[i].z = sin(frameCount * 0.5) * this.wobbles[i];
            }
        }
    }

    setWobble(index: number) {
        this.wobbles[index] = settings.wobbleStrength;
    }

    drawSpheres() {
        if (!settings.spheres) { return; }
        initColors();
        noStroke();
        for (let i = 0; i < this.points.length; i++) {
            push();
            const p = this.points[i];
            translate(p);
            sphere(settings.sphereRadius, settings.sphereDetailX);
            pop();
        }
    }

    drawSpinning() {
        if (!settings.spinningRects) { return; }
        for (let y = 0; y < this.nodesY - 1; y++) {
            for (let x = 0; x < this.nodesX - 1; x++) {
                push();
                noStroke();
                initColors();
                const p = this.points[y * this.nodesX + x];
                const pt = p5.Vector.add(p, createVector(this.lineLengthX / 2, this.lineLengthY / 2));
                translate(pt);
                rotateX(frameCount * 0.03);
                noFill();
                box(settings.spinningSize.x, settings.spinningSize.y, settings.spinningSize.z);
                pop();
            }
        }
    }

    drawFaces() {
        if (!settings.faces) { return; }
        for (let y = 0; y < this.nodesY; y++) {
            for (let x = 0; x < this.nodesX; x++) {
                push();
                const p = this.points[y * this.nodesX + x];
                const pRight = this.points[y * this.nodesX + x + 1];
                const pBottom = this.points[(y + 1) * this.nodesX + x];
                const pBottomRight = this.points[(y + 1) * this.nodesX + x + 1];
                if (x < this.nodesX - 1 && y < this.nodesY - 1) {
                    initColors();
                    beginShape();
                    vertex(p.x, p.y, p.z);
                    vertex(pRight.x, pRight.y, pRight.z);
                    vertex(pBottomRight.x, pBottomRight.y, pBottomRight.z);
                    vertex(pBottom.x, pBottom.y, pBottom.z);
                    endShape();
                }
                pop();
            }
        }
    }

    drawLines() {
        if (!settings.lines) { return; }
        for (let y = 0; y < this.nodesY; y++) {
            for (let x = 0; x < this.nodesX; x++) {
                push();
                const p = this.points[y * this.nodesX + x];
                const pRight = this.points[y * this.nodesX + x + 1];
                const pBottom = this.points[(y + 1) * this.nodesX + x];

                if (x < this.nodesX - 1) {
                    initColors();
                    line(p.x, p.y, p.z, pRight.x, pRight.y, pRight.z);
                }
                if (y < this.nodesY - 1) {
                    initColors();
                    line(p.x, p.y, p.z, pBottom.x, pBottom.y, pBottom.z);
                }
                pop();
            }
        }
    }

    initPoints() {
        const startPoint = createVector(-0.5 * (this.nodesX - 1) * this.lineLengthX, -0.5 * (this.nodesY - 1) * this.lineLengthY);
        for (let y = 0; y < this.nodesY; y++) {
            for (let x = 0; x < this.nodesX; x++) {
                const newPoint = createVector(startPoint.x + this.lineLengthX * x, startPoint.y + this.lineLengthY * y);
                this.points.push(newPoint);
            }
        }
    }

    modifyNodes(modX: number, modY: number) {
        this.nodesX += modX;
        this.nodesY += modY;
        this.setup();
        hud.initWobbleGrid();
    }
}
