class Cube {
    _plane2: Plane;

    constructor() {
        this.setupSndPlane();
    }

    setupSndPlane() {
        this._plane2 = new Plane();
        this._plane2.lineLengthX = _plane.lineLengthX;
        this._plane2.lineLengthY = _plane.lineLengthX;
        this._plane2.nodesX = _plane.nodesX;
        this._plane2.nodesY = _plane.nodesX;
        this._plane2.setup();
    }

    draw() {
        push();
        translate(0, 0, -_plane.lineLengthX * (_plane.nodesX - 1) / 2);
        _plane.draw();
        pop();
        push();
        translate(_plane.lineLengthX * (_plane.nodesX - 1) / 2, 0, 0);
        rotateY(Math.PI / 2);
        _plane.draw();
        pop();
        push();
        translate(-_plane.lineLengthX * (_plane.nodesX - 1) / 2, 0, 0);
        rotateY(-Math.PI / 2);
        _plane.draw();
        pop();
        push();
        translate(0, 0, _plane.lineLengthX * (_plane.nodesX - 1) / 2);
        rotateY(-Math.PI);
        _plane.draw();
        pop();
        push();
        translate(0, _plane.lineLengthY * (_plane.nodesY - 1) / 2, 0);
        rotateX(Math.PI / 2);
        this._plane2.draw();
        pop();
        push();
        translate(0, -_plane.lineLengthY * (_plane.nodesY - 1) / 2, 0);
        rotateX(Math.PI / 2);
        this._plane2.draw();
        pop();
    }
}