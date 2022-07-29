class fireCircle {

    constructor(beginX, beginY, bColor, minus) {
        this.position = createVector(beginX, beginY);
        this.velocity = p5.Vector.random3D();
        this.velocity.mult(0, 0);
        this.moveX = 0;
        this.moveY = 0;
        this.bColor = bColor;
        this.distanceX = this.position.x;
        this.distanceY = this.position.y;
        this.minus = minus;
        this.alpha = 255;
        this.isDone = false;
    }

    finished() {
        return this.isDone;
    }

    update(mX) {

        // this.velocity = p5.Vector.random2D();
        // this.velocity.mult(30);

        // console.log('fireCircle update');
        this.alpha -= 0;
        if (this.distanceY < height + 20) {
            this.moveX += mX;
            this.moveY += this.moveX + pow(this.moveX, 2);
            
            this.position.add(this.velocity);
        } else {
            this.isDone = true;
        }
    }
        
    draw(r) {

        let offset = this.minus * 1.5;
        this.distanceX = this.position.x + this.moveX;
        this.distanceY = this.position.y + this.moveY - offset;

        // this.bColor.setAlpha(round(400 - this.moveY));

        fill(this.bColor, 255);
        // rect(distanceX - r, distanceY - r, r, r);
        // ellipse(distanceX, distanceY, round(r / (this.moveX * 5)));
        ellipse(this.distanceX, this.distanceY, r);
    }
}