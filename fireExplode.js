class FireExplode {
    constructor(fem, rVector) {
        this.begainV = fem.beginV.copy();
        this.fColor = fem.fColor;
        this.rVector = fem.rVector;
        // 長度 0.3 ~ 0.5
        this.fLength = fem.fLength;
        // 弧度 3 ~ 5 
        this.exponent = fem.exponent;
        this.over = false;
        this.moveX = 0;
        this.moveY = 0;
        // 拖曳透明度
        this.lifespan = 45;
        // 煙火頭透明度
        this.firstBallLife = 255;
        this.direction = createVector(-0.001, 0.003);
        // 亂數向量位置
        this.rVector = rVector;
        // 初速度
        this.rv = 1.1;
        // 擴散範圍
        this.vm = 0.001; 
        this.colorR = 255;
        this.colorG = 255;
        this.colorB = 255;
        this.colorDefault = color(0, 0, 0);
        // 球大小
        this.ballSize = random(5, 10);
        this.isFinalWhite = random([true, false]);
    }

    isDead() {
        return this.over;
    }

    run(index) {
        this.update(abs(this.vm));
        this.draw(index);
    }

    update(move) {

        // 長度
        if (this.moveX < 0.7 && !this.over) {
            // console.log('update', mrv);

            this.moveX += move;
            this.moveY += pow(this.moveX, this.exponent);

            // 初速
            this.rVector.mult(this.rv);
            // 方向
            this.rVector.add(this.direction);
            this.begainV.add(this.rVector.x + this.moveX, this.rVector.y + this.moveY);

            // 減速
            if (this.moveX > 0.01) this.rVector.div(1.1 + this.moveX/100);

        } else {
            // console.log('overgr hight');
            this.over = true;
        }
    }

    draw(index) {

        // console.log('FireExplode index', index);
        noStroke();

        // 設置顏色
        let sc = 0.6;
        this.lifespan -= random(0.05, 0.08);
        this.firstBallLife -= random(0.1, 0.2);

        if (this.colorR > this.fColor.getRed()) this.colorR -= sc;
        if (this.colorG > this.fColor.getGreen()) this.colorG -= sc;
        if (this.colorB > this.fColor.getBlue()) this.colorB -= sc;

        this.colorDefault.setAlpha(this.lifespan);
        this.colorDefault.setRed(this.colorR);
        this.colorDefault.setGreen(this.colorG);
        this.colorDefault.setBlue(this.colorB);

        // 第一顆球
        let c = this.colorDefault;
        if (index == 0) {
            c.setAlpha(this.firstBallLife);
            if (this.moveX > 0.008 && this.isFinalWhite) {
                c.setRed(this.colorR + this.moveX * 250);
                c.setGreen(this.colorG + this.moveX * 250);
                c.setBlue(this.colorB + this.moveX * 250);
            }
        }

        fill(c);
        circle(this.begainV.x, this.begainV.y, this.ballSize);
    }

}