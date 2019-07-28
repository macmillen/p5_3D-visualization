class Button {
    constructor(x, y, w, h, content, color, anchors, callbacks = {}, settings = {}) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.content = content;
        this.color = color;
        this.anchors = anchors;
        this.callbacks = callbacks;
        this.settings = settings;
        this.hovered = false;
        this.active = false;
        buttons.push(this);
    }
    draw() {
        const win = this.win();
        let x = this.x;
        let y = this.y;
        if (this.anchors) {
            if (this.anchors.includes('right')) {
                x += win.x;
            }
            if (this.anchors.includes('top')) {
                y += win.y;
            }
            if (this.anchors.includes('bottom')) {
                y -= win.y;
            }
            if (this.anchors.includes('left')) {
                x -= win.x;
            }
        }
        this.checkHovered(x, y);
        if (this.callbacks && this.callbacks.active) {
            this.active = this.callbacks.active();
        }
        push();
        textAlign(CENTER);
        strokeWeight(2);
        if (this.settings && this.settings.fontSize) {
            textSize(this.settings.fontSize);
        }
        stroke(WHITE);
        fill(BLACK);
        if (this.active) {
            fill(this.color);
            stroke(this.color);
        }
        if (this.hovered) {
            stroke(WHITE);
        }
        if (this.hovered && !this.active) {
            stroke(this.color);
        }
        rect(x, y, this.w, this.h);
        fill(WHITE);
        if (this.active) {
        }
        if (this.hovered) {
        }
        if (typeof this.content === 'string') {
            text(this.content, x + this.w / 2, y + this.h / 2 + this.settings.yOffset);
        }
        else if (this.content instanceof p5.Image) {
            image(this.content, x + this.w / 2 - this.content.width / 2, y + this.h / 2 - this.content.height / 2);
        }
        pop();
    }
    win() {
        return createVector(0.5 * width, -0.5 * height);
    }
    checkHovered(x, y) {
        const mX = mouseX - 0.5 * width;
        const mY = mouseY - 0.5 * height;
        this.hovered = mX > x && mX < x + this.w && mY > y && mY < y + this.h;
    }
    onClick() {
        if (this.callbacks && this.callbacks.click && this.hovered) {
            this.callbacks.click();
        }
    }
    onHover() {
        if (this.callbacks && this.callbacks.hover && this.hovered) {
            this.callbacks.hover();
        }
    }
    setPos(x, y) {
        this.x = x;
        if (y) {
            this.y = y;
        }
    }
}
class Cam {
    constructor() {
        this.draggingStart = null;
        this.rotation = null;
        this.autoCamValue = 0;
        this.position = createVector();
        this.rotation = createVector();
    }
    updatePosition(diff) {
        this.position.add(diff);
    }
    updateRotation(diff) {
        this.rotation.add(diff);
    }
    translate() {
        translate(0, 0, -2000);
        translate(this.position);
        rotateX(this.rotation.y);
        rotateY(this.rotation.x);
        rotate(this.autoCamValue, createVector(1, 1, 1));
        if (settings.autoRotate) {
            this.autoCamValue += 0.03;
        }
    }
}
const BLUE = '#0000FF';
const RED = '#FF0000';
const GREEN = '#00FF00';
const WHITE = '#FFFFFF';
const BLACK = '#000000';
var MODE;
(function (MODE) {
    MODE[MODE["Wobble"] = 0] = "Wobble";
    MODE[MODE["Organic"] = 1] = "Organic";
})(MODE || (MODE = {}));
var COLOR_MODE;
(function (COLOR_MODE) {
    COLOR_MODE[COLOR_MODE["White"] = 0] = "White";
    COLOR_MODE[COLOR_MODE["Splash"] = 1] = "Splash";
})(COLOR_MODE || (COLOR_MODE = {}));
var SHAPE;
(function (SHAPE) {
    SHAPE[SHAPE["Plane"] = 0] = "Plane";
    SHAPE[SHAPE["Cube"] = 1] = "Cube";
    SHAPE[SHAPE["Mandala"] = 2] = "Mandala";
    SHAPE[SHAPE["Dodecahedron"] = 3] = "Dodecahedron";
})(SHAPE || (SHAPE = {}));
const STD_GAP = 13;
const BTN_MODE_SIZE_X = 25;
const BTN_MODE_SIZE_Y = 70;
const BTN_EFFECT_SIZE = 70;
const BTN_WOBBLE_GRID_SIZE = 30;
const BTN_WOBBLE_GRID_GAP = 3;
const BTN_PLUS_SIZE = 50;
const BTN_COLOR_MODE_SIZE_X = 28;
const BTN_COLOR_MODE_SIZE_Y = 250;
const BTN_SHAPE_SIZE_X = 200;
const BTN_SHAPE_SIZE_Y = 25;
const BTN_SHAPE_GAP = 10;
const BTN_AUTOCAM_SIZE_X = 100;
const BTN_AUTOCAM_SIZE_Y = 26;
const SCROLLBAR_OFFSET = 6;
class Cube {
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
const buttons = [];
const _scrollbars = [];
class HUD {
    constructor() {
        this.scrollbar = new Scrollbar(STD_GAP, STD_GAP, 200, 30, 0, 100, ['left', 'top'], {
            active: () => true,
            setValue: (l) => {
                settings.lineLengthX = l;
                _plane.setup();
                _cube.setupSndPlane();
            },
            getValue: () => settings.lineLengthX,
        });
        this.btnSpinningRects = new Button(-BTN_EFFECT_SIZE - STD_GAP, STD_GAP, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, spinningImage, color('#2E7FBC'), ['top', 'right'], {
            active: () => settings.spinningRects,
            click: () => settings.spinningRects = !settings.spinningRects
        });
        this.btnSpheres = new Button(-2 * BTN_EFFECT_SIZE - 2 * STD_GAP, STD_GAP, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, spheresImage, color('#FF0DEF'), ['top', 'right'], {
            active: () => settings.spheres,
            click: () => settings.spheres = !settings.spheres
        });
        this.btnFaces = new Button(-2 * STD_GAP - 2 * BTN_EFFECT_SIZE, 2 * STD_GAP + BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, facesImage, color('#851fcf'), ['top', 'right'], {
            active: () => settings.faces,
            click: () => settings.faces = !settings.faces
        });
        this.btnLines = new Button(-BTN_EFFECT_SIZE - STD_GAP, 2 * STD_GAP + BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, linesImage, color('#FF0000'), ['top', 'right'], {
            active: () => settings.lines,
            click: () => settings.lines = !settings.lines
        });
        this.modeWobbleButton = new Button(-BTN_MODE_SIZE_X - STD_GAP / 2, STD_GAP, BTN_MODE_SIZE_X, BTN_MODE_SIZE_Y, mode1Image, color('#2255ee'), ['top'], {
            active: () => settings.mode === MODE.Wobble,
            click: () => settings.mode = MODE.Wobble
        });
        this.modeOrganicButton = new Button(STD_GAP / 2, STD_GAP, BTN_MODE_SIZE_X, BTN_MODE_SIZE_Y, mode2Image, color('#2255ee'), ['top'], {
            active: () => settings.mode === MODE.Organic,
            click: () => settings.mode = MODE.Organic
        });
        this.colorModeWhiteButton = new Button(-STD_GAP - BTN_COLOR_MODE_SIZE_X, -450, BTN_COLOR_MODE_SIZE_X, BTN_COLOR_MODE_SIZE_Y, colorModeWhiteImage, color('#444444'), ['bottom', 'right'], {
            active: () => settings.colorMode === COLOR_MODE.White,
            click: () => settings.colorMode = COLOR_MODE.White
        });
        this.colorModeSplashButton = new Button(-STD_GAP * 2 - BTN_COLOR_MODE_SIZE_X * 2, -450, BTN_COLOR_MODE_SIZE_X, BTN_COLOR_MODE_SIZE_Y, colorModeSplashImage, color('#444444'), ['bottom', 'right'], {
            active: () => settings.colorMode === COLOR_MODE.Splash,
            click: () => settings.colorMode = COLOR_MODE.Splash
        });
        this.shapePlaneButton = new Button(-STD_GAP - BTN_SHAPE_SIZE_X, 300, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'PLANE', color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Plane,
            click: () => settings.shape = SHAPE.Plane
        }, { yOffset: 5, fontSize: 15 });
        this.shapeCubeButton = new Button(-STD_GAP - BTN_SHAPE_SIZE_X, 300 + BTN_SHAPE_GAP + BTN_SHAPE_SIZE_Y, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'CUBE', color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Cube,
            click: () => settings.shape = SHAPE.Cube
        }, { yOffset: 5, fontSize: 15 });
        this.shapeMandalaButton = new Button(-STD_GAP - BTN_SHAPE_SIZE_X, 300 + BTN_SHAPE_GAP * 2 + BTN_SHAPE_SIZE_Y * 2, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'MANDALA', color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Mandala,
            click: () => settings.shape = SHAPE.Mandala
        }, { yOffset: 5, fontSize: 15 });
        this.shapeDodecahedronButton = new Button(-STD_GAP - BTN_SHAPE_SIZE_X, 300 + BTN_SHAPE_GAP * 3 + BTN_SHAPE_SIZE_Y * 3, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'DODECAHEDRON', color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Dodecahedron,
            click: () => settings.shape = SHAPE.Dodecahedron
        }, { yOffset: 5, fontSize: 15 });
        this.autoCamButton = new Button(200, STD_GAP, BTN_AUTOCAM_SIZE_X, BTN_AUTOCAM_SIZE_Y, 'AUTOCAM', color('#2255ee'), ['top'], {
            active: () => settings.autoRotate,
            click: () => settings.autoRotate = !settings.autoRotate
        }, { yOffset: 5, fontSize: 15 });
        this.wobbleGrid = [];
        this.plusXButton = new Button(-STD_GAP - BTN_PLUS_SIZE, -STD_GAP * 2 - BTN_PLUS_SIZE * 2, BTN_PLUS_SIZE, BTN_PLUS_SIZE, plusXImage, color(RED), ['right', 'bottom'], {
            click: () => {
                _plane.modifyNodes(1, 0);
                _cube.setupSndPlane();
            }
        });
        this.minusXButton = new Button(-STD_GAP - BTN_PLUS_SIZE, -STD_GAP - BTN_PLUS_SIZE, BTN_PLUS_SIZE, BTN_PLUS_SIZE, minusXImage, color(RED), ['right', 'bottom'], {
            click: () => {
                _plane.modifyNodes(-1, 0);
                _cube.setupSndPlane();
            }
        });
        this.plusYButton = new Button(-STD_GAP * 2 - BTN_PLUS_SIZE * 2, -STD_GAP * 2 - BTN_PLUS_SIZE * 2, BTN_PLUS_SIZE, BTN_PLUS_SIZE, plusYImage, color(GREEN), ['right', 'bottom'], {
            click: () => {
                _plane.modifyNodes(0, 1);
                _cube.setupSndPlane();
            }
        });
        this.minusYButton = new Button(-STD_GAP * 2 - BTN_PLUS_SIZE * 2, -STD_GAP - BTN_PLUS_SIZE, BTN_PLUS_SIZE, BTN_PLUS_SIZE, minusYImage, color(GREEN), ['right', 'bottom'], {
            click: () => {
                _plane.modifyNodes(0, -1);
                _cube.setupSndPlane();
            }
        });
        this.initWobbleGrid();
    }
    initWobbleGrid() {
        this.wobbleGrid.forEach(b => {
            const i = buttons.indexOf(b);
            buttons.splice(i, 1);
        });
        this.wobbleGrid = [];
        for (let y = 0; y < _plane.nodesY; y++) {
            for (let x = 0; x < _plane.nodesX; x++) {
                const wobbleUnit = BTN_WOBBLE_GRID_SIZE + BTN_WOBBLE_GRID_GAP;
                const newButton = new Button(STD_GAP + x * wobbleUnit, -STD_GAP - wobbleUnit * _plane.nodesY + y * wobbleUnit, BTN_WOBBLE_GRID_SIZE, BTN_WOBBLE_GRID_SIZE, '', color(WHITE), ['bottom', 'left'], {});
                newButton.callbacks.active = () => newButton.hovered;
                newButton.callbacks.hover = () => {
                    _plane.setWobble(y * _plane.nodesX + x);
                    _cube._plane2.setWobble(y * _plane.nodesX + x);
                };
                this.wobbleGrid.push(newButton);
            }
        }
    }
    draw() {
        this.btnSpinningRects.draw();
        this.btnFaces.draw();
        this.btnLines.draw();
        this.btnSpheres.draw();
        if (settings.mode === MODE.Wobble) {
            this.wobbleGrid.forEach(b => b.draw());
        }
        this.plusXButton.draw();
        this.minusXButton.draw();
        this.plusYButton.draw();
        this.minusYButton.draw();
        this.modeWobbleButton.draw();
        this.modeOrganicButton.draw();
        this.colorModeWhiteButton.draw();
        this.colorModeSplashButton.draw();
        this.shapePlaneButton.draw();
        this.shapeCubeButton.draw();
        this.shapeMandalaButton.draw();
        this.shapeDodecahedronButton.draw();
        this.autoCamButton.draw();
        _scrollbars.forEach(s => s.draw());
    }
}
class Plane {
    constructor() {
        this.points = [];
        this.wobbles = [];
        this.nodesX = 9;
        this.nodesY = 11;
        this.lineLengthX = 200;
        this.lineLengthY = 100;
        this.colorsLines = [];
        this.colorsSpheres = [];
    }
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
    setWobble(index) {
        this.wobbles[index] = settings.wobbleStrength;
    }
    drawSpheres() {
        if (!settings.spheres) {
            return;
        }
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
        if (!settings.spinningRects) {
            return;
        }
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
        if (!settings.faces) {
            return;
        }
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
        if (!settings.lines) {
            return;
        }
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
    modifyNodes(modX, modY) {
        this.nodesX += modX;
        this.nodesY += modY;
        this.setup();
        hud.initWobbleGrid();
    }
}
class Scrollbar {
    constructor(x, y, w, h, min, max, anchors, handlers = {}) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.min = min;
        this.max = max;
        this.anchors = anchors;
        this.handlers = handlers;
        this.value = 0;
        this.hovered = false;
        this.targetValue = 0;
        this.percent = 0;
        this.button = new Button(x, y, 20, h, '', color(WHITE), anchors);
        _scrollbars.push(this);
    }
    draw() {
        this.active = this.handlers.active();
        if (!this.active) {
            return;
        }
        const win = this.win();
        let x = this.x;
        let y = this.y;
        if (this.anchors) {
            if (this.anchors.includes('right')) {
                x += win.x;
            }
            if (this.anchors.includes('top')) {
                y += win.y;
            }
            if (this.anchors.includes('bottom')) {
                y -= win.y;
            }
            if (this.anchors.includes('left')) {
                x -= win.x;
            }
        }
        this.checkHovered(x, y);
        push();
        noFill();
        stroke(WHITE);
        strokeWeight(2);
        rect(x + SCROLLBAR_OFFSET / 2, y + SCROLLBAR_OFFSET / 2, this.w, this.h - SCROLLBAR_OFFSET);
        pop();
        this.button.draw();
        this.button.setPos(this.x + this.percent * this.w);
    }
    checkHovered(x, y) {
        const mX = mouseX - 0.5 * width;
        const mY = mouseY - 0.5 * height;
        this.hovered = mX > x && mX < x + this.w && mY > y && mY < y + this.h;
        if (this.hovered) {
            this.targetValue = (mX - x) / this.w * this.max;
        }
    }
    win() {
        return createVector(0.5 * width, -0.5 * height);
    }
    onClick() {
        if (this.hovered) {
            this.calcNewHandlePos();
        }
    }
    calcNewHandlePos() {
        const v = this.handlers.getValue();
        const t = this.targetValue;
        const d = (t - v) / 5;
        const goingUp = d > 0;
        const intervalID = setInterval(() => {
            const x = this.handlers.getValue();
            this.handlers.setValue(x + d);
            this.percent = x / this.max;
            if (goingUp && x >= t || !goingUp && x <= t) {
                this.disableInterval(intervalID);
            }
        }, 1);
    }
    disableInterval(intervalID) {
        clearInterval(intervalID);
    }
}
class Handle {
    constructor(x, y, w, h, value, min, max, percent, anchors) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.value = value;
        this.min = min;
        this.max = max;
        this.percent = percent;
        this.anchors = anchors;
        this.button = new Button(x, y, w, h, '', color(WHITE), anchors);
    }
    draw() {
        rect(this.x, this.y, this.w, this.h);
    }
}
class Settings {
    constructor() {
        this.mode = MODE.Wobble;
        this.colorMode = COLOR_MODE.White;
        this.shape = SHAPE.Cube;
        this.spinningRects = false;
        this.spheres = true;
        this.faces = false;
        this.lines = true;
        this.strokeWeight = 5;
        this.autoRotate = false;
        this.sphereRadius = 10;
        this.sphereDetailX = 6;
        this.spinningSize = createVector(50, 30, 150);
        this.wobbleStrength = 75;
        this.lineLengthX = 200;
        this.lineLengthY = 100;
    }
}
let settings;
let cam;
let hud;
let _plane;
let _cube;
let font;
let spheresImage;
let facesImage;
let spinningImage;
let linesImage;
let plusXImage;
let plusYImage;
let minusXImage;
let minusYImage;
let mode1Image;
let mode2Image;
let colorModeWhiteImage;
let colorModeSplashImage;
function preload() {
    font = loadFont('../assets/fonts/arial.ttf');
    spheresImage = loadImage('../assets/images/spheres.png');
    facesImage = loadImage('../assets/images/faces.png');
    spinningImage = loadImage('../assets/images/spinning.png');
    linesImage = loadImage('../assets/images/lines.png');
    plusXImage = loadImage('../assets/images/plus_x.png');
    plusYImage = loadImage('../assets/images/plus_y.png');
    minusXImage = loadImage('../assets/images/minus_x.png');
    minusYImage = loadImage('../assets/images/minus_y.png');
    mode1Image = loadImage('../assets/images/mode_1.png');
    mode2Image = loadImage('../assets/images/mode_2.png');
    colorModeWhiteImage = loadImage('../assets/images/color_mode_white.png');
    colorModeSplashImage = loadImage('../assets/images/color_mode_splash.png');
}
function setup() {
    settings = new Settings();
    cam = new Cam();
    _plane = new Plane();
    _cube = new Cube();
    hud = new HUD();
    createCanvas(windowWidth, windowHeight, WEBGL);
    textFont(font);
    _plane.setup();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(20);
    hud.draw();
    buttons.forEach(b => b.onHover());
    cam.translate();
    drawAxises();
    switch (settings.shape) {
        case SHAPE.Plane:
            _plane.draw();
            break;
        case SHAPE.Cube:
            _cube.draw();
            break;
    }
    updateInputs();
}
function mouseWheel(event) {
    const scrollValue = createVector(0, 0, -event.delta);
    cam.updatePosition(scrollValue);
    return false;
}
function mouseReleased() {
    if (mouseButton === CENTER) {
        cam.draggingStart = null;
    }
}
function mouseClicked() {
    buttons.forEach(b => b.onClick());
    _scrollbars.forEach(s => s.onClick());
}
function updateInputs() {
    if (mouseIsPressed) {
        if (mouseButton === CENTER) {
            const newMouse = createVector(mouseX, mouseY);
            if (!cam.draggingStart) {
                cam.draggingStart = newMouse;
            }
            else {
                const distance = p5.Vector.sub(cam.draggingStart, newMouse);
                distance.mult(-1);
                if (keyIsDown(18)) {
                    cam.updateRotation(p5.Vector.mult(distance, 0.01));
                }
                else {
                    cam.updatePosition(distance);
                }
                cam.draggingStart = newMouse;
            }
        }
    }
}
function drawAxises() {
    strokeWeight(5);
    stroke(RED);
    line(0, 0, 300, 0);
    stroke(GREEN);
    line(0, 0, 0, 300);
    stroke(BLUE);
    line(0, 0, 0, 0, 0, 300);
}
function initColors() {
    if (settings.colorMode === COLOR_MODE.White) {
        stroke(WHITE);
        fill(WHITE);
    }
    else if (settings.colorMode === COLOR_MODE.Splash) {
        const randomColor = color(random(255), random(255), random(255));
        stroke(randomColor);
        fill(randomColor);
    }
}
//# sourceMappingURL=build.js.map