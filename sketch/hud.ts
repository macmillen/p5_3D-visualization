const buttons: Button[] = [];
const _scrollbars: Scrollbar[] = [];

class HUD {

    scrollbar = new Scrollbar(STD_GAP, STD_GAP, 200, 30, 0, 100, ['left', 'top'], {
        active: () => true,
        setValue: (l) => {
            settings.lineLengthX = l;
            _plane.setup();
            _cube.setupSndPlane();
        },
        getValue: () => settings.lineLengthX,
    });

    btnSpinningRects = new Button(-BTN_EFFECT_SIZE - STD_GAP, STD_GAP, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, spinningImage,
        color('#2E7FBC'), ['top', 'right'], {
            active: () => settings.spinningRects,
            click: () => settings.spinningRects = !settings.spinningRects
        });
    btnSpheres = new Button(- 2 * BTN_EFFECT_SIZE - 2 * STD_GAP, STD_GAP, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, spheresImage,
        color('#FF0DEF'), ['top', 'right'], {
            active: () => settings.spheres,
            click: () => settings.spheres = !settings.spheres
        });
    btnFaces = new Button(-2 * STD_GAP - 2 * BTN_EFFECT_SIZE, 2 * STD_GAP + BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, facesImage,
        color('#851fcf'), ['top', 'right'], {
            active: () => settings.faces,
            click: () => settings.faces = !settings.faces
        });
    btnLines = new Button(- BTN_EFFECT_SIZE - STD_GAP, 2 * STD_GAP + BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, BTN_EFFECT_SIZE, linesImage,
        color('#FF0000'), ['top', 'right'], {
            active: () => settings.lines,
            click: () => settings.lines = !settings.lines
        });

    modeWobbleButton = new Button(- BTN_MODE_SIZE_X - STD_GAP / 2, STD_GAP, BTN_MODE_SIZE_X, BTN_MODE_SIZE_Y, mode1Image,
        color('#2255ee'), ['top'], {
            active: () => settings.mode === MODE.Wobble,
            click: () => settings.mode = MODE.Wobble
        });
    modeOrganicButton = new Button(STD_GAP / 2, STD_GAP, BTN_MODE_SIZE_X, BTN_MODE_SIZE_Y, mode2Image,
        color('#2255ee'), ['top'], {
            active: () => settings.mode === MODE.Organic,
            click: () => settings.mode = MODE.Organic
        });
    colorModeWhiteButton = new Button(- STD_GAP - BTN_COLOR_MODE_SIZE_X, -450, BTN_COLOR_MODE_SIZE_X, BTN_COLOR_MODE_SIZE_Y, colorModeWhiteImage,
        color('#444444'), ['bottom', 'right'], {
            active: () => settings.colorMode === COLOR_MODE.White,
            click: () => settings.colorMode = COLOR_MODE.White
        });
    colorModeSplashButton = new Button(- STD_GAP * 2 - BTN_COLOR_MODE_SIZE_X * 2, -450, BTN_COLOR_MODE_SIZE_X, BTN_COLOR_MODE_SIZE_Y, colorModeSplashImage,
        color('#444444'), ['bottom', 'right'], {
            active: () => settings.colorMode === COLOR_MODE.Splash,
            click: () => settings.colorMode = COLOR_MODE.Splash
        });

    shapePlaneButton = new Button(- STD_GAP - BTN_SHAPE_SIZE_X, 300, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'PLANE',
        color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Plane,
            click: () => settings.shape = SHAPE.Plane
        }, { yOffset: 5, fontSize: 15 });
    shapeCubeButton = new Button(- STD_GAP - BTN_SHAPE_SIZE_X, 300 + BTN_SHAPE_GAP + BTN_SHAPE_SIZE_Y, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'CUBE',
        color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Cube,
            click: () => settings.shape = SHAPE.Cube
        }, { yOffset: 5, fontSize: 15 });
    shapeMandalaButton = new Button(- STD_GAP - BTN_SHAPE_SIZE_X, 300 + BTN_SHAPE_GAP * 2 + BTN_SHAPE_SIZE_Y * 2, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'MANDALA',
        color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Mandala,
            click: () => settings.shape = SHAPE.Mandala
        }, { yOffset: 5, fontSize: 15 });
    shapeDodecahedronButton = new Button(- STD_GAP - BTN_SHAPE_SIZE_X, 300 + BTN_SHAPE_GAP * 3 + BTN_SHAPE_SIZE_Y * 3, BTN_SHAPE_SIZE_X, BTN_SHAPE_SIZE_Y, 'DODECAHEDRON',
        color('#2255ee'), ['top', 'right'], {
            active: () => settings.shape === SHAPE.Dodecahedron,
            click: () => settings.shape = SHAPE.Dodecahedron
        }, { yOffset: 5, fontSize: 15 });

    autoCamButton = new Button(200, STD_GAP, BTN_AUTOCAM_SIZE_X, BTN_AUTOCAM_SIZE_Y, 'AUTOCAM',
        color('#2255ee'), ['top'], {
            active: () => settings.autoRotate,
            click: () => settings.autoRotate = !settings.autoRotate
        }, { yOffset: 5, fontSize: 15 });

    wobbleGrid: Button[] = [];

    plusXButton = new Button(
        -STD_GAP - BTN_PLUS_SIZE, -STD_GAP * 2 - BTN_PLUS_SIZE * 2,
        BTN_PLUS_SIZE, BTN_PLUS_SIZE,
        plusXImage, color(RED), ['right', 'bottom'],
        {
            click: () => {
                _plane.modifyNodes(1, 0);
                _cube.setupSndPlane();
            }
        }
    );
    minusXButton = new Button(
        -STD_GAP - BTN_PLUS_SIZE, -STD_GAP - BTN_PLUS_SIZE,
        BTN_PLUS_SIZE, BTN_PLUS_SIZE,
        minusXImage, color(RED), ['right', 'bottom'],
        {
            click: () => {
                _plane.modifyNodes(-1, 0);
                _cube.setupSndPlane();
            }
        }
    );
    plusYButton = new Button(
        -STD_GAP * 2 - BTN_PLUS_SIZE * 2, -STD_GAP * 2 - BTN_PLUS_SIZE * 2,
        BTN_PLUS_SIZE, BTN_PLUS_SIZE,
        plusYImage, color(GREEN), ['right', 'bottom'],
        {
            click: () => {
                _plane.modifyNodes(0, 1);
                _cube.setupSndPlane();
            }
        }
    );
    minusYButton = new Button(
        -STD_GAP * 2 - BTN_PLUS_SIZE * 2, -STD_GAP - BTN_PLUS_SIZE,
        BTN_PLUS_SIZE, BTN_PLUS_SIZE,
        minusYImage, color(GREEN), ['right', 'bottom'],
        {
            click: () => {
                _plane.modifyNodes(0, -1);
                _cube.setupSndPlane();
            }
        }
    );

    constructor() {
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
                const newButton = new Button(
                    STD_GAP + x * wobbleUnit, -STD_GAP - wobbleUnit * _plane.nodesY + y * wobbleUnit,
                    BTN_WOBBLE_GRID_SIZE, BTN_WOBBLE_GRID_SIZE,
                    '', color(WHITE), ['bottom', 'left'], {},
                );
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