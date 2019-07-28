class Cam {
    position: p5.Vector;
    draggingStart: p5.Vector = null;
    rotation: p5.Vector = null;
    autoCamValue = 0;

    constructor() {
        this.position = createVector();
        this.rotation = createVector();
    }

    updatePosition(diff: p5.Vector) {
        this.position.add(diff);
    }

    updateRotation(diff: p5.Vector) {
        this.rotation.add(diff);
    }

    translate() {
        translate(0, 0, -2000)
        translate(this.position);
        rotateX(this.rotation.y);
        rotateY(this.rotation.x);
        rotate(this.autoCamValue, createVector(1, 1, 1));
        if (settings.autoRotate) {
            this.autoCamValue += 0.03;
        }
    }

}