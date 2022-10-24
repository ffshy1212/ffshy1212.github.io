class FireExplode {
    constructor(fem, rVector) {
        this.begainV = fem.beginV.copy();
        this.fColor = fem.fColor;
        this.rVector = fem.rVector;
        // 弧度 3 ~ 5 
        this.exponent = fem.exponent;
        this.over = false;
        this.isTop = false;
        this.moveX = 0;
        this.moveY = 0;
        // 拖曳透明度
        this.lifespan = 0;
        this.fr = 30;
        // 煙火頭透明度
        this.firstBallLife = 255;
        this.direction = createVector(-0.0014, 0.0006);
        // 亂數向量位置
        this.rVector = rVector;
        // 初速度
        this.rv = 1.5;
        // 擴散範圍
        this.vm = random(0.003, 0.0032);
        this.colorDefault = color(0, 0, 0);
        // 球大小
        this.ballSize = random(4, 6);
        this.isFinalWhite = random([true, false]);
    }

    isDead() {
        return this.over;
    }

    run(index) {
        this.update(this.vm, index);
        this.draw(index);
    }

    update(move, index) {

        // 長度
        if (this.moveX < (move * random(20, 30)) && !this.over) {

            this.moveX += move;
            this.moveY += pow(this.moveX, this.exponent);

            // 初速
            this.rVector.mult(this.rv);
            // 方向
            this.begainV.add(this.rVector.x + this.moveX, this.rVector.y + this.moveY);
            // 減速數值越大噴越遠
            if (this.moveX >= move * random(2, 3)) this.rVector.div(this.rv + this.moveX * random(2, 3));

        } else if (this.moveX > (move * random(4, 4)) & this.moveX < (move * random(300, 400)) && !this.over) {
            this.moveX += move / random(2, 3);
            this.moveY = pow(this.moveX, 10);

            this.rVector.add(this.direction);
            this.begainV.add(this.rVector.x + this.moveX, this.rVector.y + this.moveY);

        } else {
            this.over = true;
        }
    }

    draw(index) {

        noStroke();
        let sc = 1;
        // 設透明度
        if (this.lifespan < 300 && !this.isTop) {
            this.lifespan = lerp(this.lifespan, 300, 1.2);
        } else {
            this.isTop = true;
            this.lifespan = lerp(this.lifespan, 0, 0.0085);
        }
        this.firstBallLife = lerp(300, 0, 0.85);

        // 設置顏色
        let fromeColor = color(255, 255, 255);
        let ToColor = this.fColor.getColor();
        this.colorDefault = lerpColor(fromeColor, ToColor, 0.9);

        this.colorDefault.setAlpha(this.lifespan);

        // 第一顆球
        let c = this.colorDefault;
        if (index == 0) {
            c.setAlpha(this.firstBallLife);
            if (this.moveX > 0.008 && this.isFinalWhite) {
                c.setRed(255);
                c.setGreen(255);
                c.setBlue(255);
            }
        }

        fill(c);
        circle(this.begainV.x, this.begainV.y, this.ballSize);
    }
}