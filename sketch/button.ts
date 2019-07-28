class Button {

    public hovered = false;
    public active = false;

    constructor(
        private x: number,
        private y: number,
        private w: number,
        private h: number,
        private content: string | p5.Image,
        private color: p5.Color,
        private anchors: ('top' | 'bottom' | 'left' | 'right')[],
        public callbacks: {
            active?: () => boolean,
            click?: () => void,
            hover?: () => void,
        } = {},
        private settings: {
            fontSize?: number,
            yOffset?: number,
        } = {},
    ) {
        buttons.push(this);

    }

    draw() {
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
        if (this.callbacks && this.callbacks.active) { this.active = this.callbacks.active(); }

        push();
        textAlign(CENTER);
        strokeWeight(2);
        if (this.settings && this.settings.fontSize) {
            textSize(this.settings.fontSize);
        }

        // IDLE
        stroke(WHITE);
        fill(BLACK);
        // ACTIVE
        if (this.active) {
            fill(this.color);
            stroke(this.color);
        }
        // HOVERED
        if (this.hovered) {
            // fill(WHITE);
            stroke(WHITE);
        }
        if (this.hovered && !this.active) {
            stroke(this.color);
        }

        rect(x, y, this.w, this.h);

        // IDLE
        fill(WHITE);
        // ACTIVE
        if (this.active) {
        }
        // HOVERED
        if (this.hovered) {
        }

        if (typeof this.content === 'string') {
            text(this.content, x + this.w / 2, y + this.h / 2 + this.settings.yOffset);
        } else if (this.content instanceof p5.Image) {
            image(this.content, x + this.w / 2 - this.content.width / 2, y + this.h / 2 - this.content.height / 2);
        }

        pop();
    }

    win() {
        return createVector(0.5 * width, -0.5 * height);
    }

    checkHovered(x: number, y: number) {
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

    setPos(x: number, y?: number) {
        this.x = x;
        if (y) {
            this.y = y;
        }
    }
}