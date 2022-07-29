class FireworkLine {
    constructor(beginX, endY, fem) {
        // console.log('create FireworkLine');
        this.beginX = beginX;
        this.endY = endY;
        this.move = height;
        this.explode = false;
        this.alpha = 0;
        this.index;
        this.mX = 0;
        this.mY = 0;
        this.position = createVector(beginX, endY);
        this.fColor = fem.fColor.getColor();
        this.fem = fem;
    }

    finished() {
        return this.explode;
    }

    update(move, index) {

        // console.log('update FireworkLine');
        this.index = index;
        // console.log('index', index);
        if (this.move > this.endY) {
            this.move -= move;
            this.alpha += 2;
        } else {
            this.explode = true;
        }
    }

    draw() {
        if (!this.explode) {
            noStroke();
            this.fColor.setAlpha(this.alpha);
            fill(this.fColor);
            ellipse(this.beginX, this.move, 5);
        }
    }
}