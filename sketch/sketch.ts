
let settings: Settings;
let cam: Cam;
let hud: HUD;
let _plane: Plane;
let _cube: Cube;
let font: p5.Font;

let spheresImage: p5.Image;
let facesImage: p5.Image;
let spinningImage: p5.Image;
let linesImage: p5.Image;
let plusXImage: p5.Image;
let plusYImage: p5.Image;
let minusXImage: p5.Image;
let minusYImage: p5.Image;
let mode1Image: p5.Image;
let mode2Image: p5.Image;
let colorModeWhiteImage: p5.Image;
let colorModeSplashImage: p5.Image;

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
    createCanvas(windowWidth, windowHeight, WEBGL)
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
        case SHAPE.Plane: _plane.draw(); break;
        case SHAPE.Cube: _cube.draw(); break;
    }

    updateInputs();
}

function mouseWheel(event: any) {
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
            } else {
                const distance = p5.Vector.sub(cam.draggingStart, newMouse);
                distance.mult(-1);
                if (keyIsDown(18)) { // ALT
                    cam.updateRotation(p5.Vector.mult(distance, 0.01));
                } else {
                    cam.updatePosition(distance);
                }
                cam.draggingStart = newMouse;
            }
        }
    }
}

function drawAxises() {
    strokeWeight(5);
    stroke(RED); // X
    line(0, 0, 300, 0);
    stroke(GREEN); // Y
    line(0, 0, 0, 300);
    stroke(BLUE); // Z
    line(0, 0, 0, 0, 0, 300);
}

function initColors() {
    if (settings.colorMode === COLOR_MODE.White) {
        stroke(WHITE);
        fill(WHITE);
    } else if (settings.colorMode === COLOR_MODE.Splash) {
        const randomColor = color(random(255), random(255), random(255));
        stroke(randomColor);
        fill(randomColor);
    }
}