class Scrollbar {
    handle: Handle;
    button: Button;
    active: boolean;
    value = 0;
    hovered = false;
    private targetValue = 0;
    private percent = 0;

    constructor(
        private x: number,
        private y: number,
        private w: number,
        private h: number,
        private min: number,
        private max: number,
        private anchors: ('top' | 'bottom' | 'left' | 'right')[],
        private handlers: {
            active?: () => boolean,
            setValue?: (n: number) => void,
            getValue?: () => number,
        } = {}
    ) {
        this.button = new Button(x, y, 20, h, '', color(WHITE), anchors);
        _scrollbars.push(this);
    }

    draw() {
        this.active = this.handlers.active();
        if (!this.active) { return; }

        const win = this.win();
        let x = this.x;
        let y = this.y;
        if (this.anchors) {
            if (this.anchors.includes('right')) { x += win.x; }
            if (this.anchors.includes('top')) { y += win.y; }
            if (this.anchors.includes('bottom')) { y -= win.y; }
            if (this.anchors.includes('left')) { x -= win.x; }
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

    checkHovered(x: number, y: number) {
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

    disableInterval(intervalID: number) {
        clearInterval(intervalID)
    }
}

class Handle {
    button: Button;
    constructor(
        private x: number,
        private y: number,
        private w: number,
        private h: number,
        public value: number,
        private min: number,
        private max: number,
        private percent: number,
        private anchors: ('top' | 'bottom' | 'left' | 'right')[],
    ) {
        this.button = new Button(x, y, w, h, '', color(WHITE), anchors)
    }

    draw() {
        rect(this.x, this.y, this.w, this.h);
    }

}