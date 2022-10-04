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
        this.firstBallLife = 320;
        this.direction = createVector(-0.0009, 0.0009);
        // 亂數向量位置
        this.rVector = rVector;
        // 初速度
        this.rv = 1.4;
        // 擴散範圍
        this.vm = random(0.0018, 0.002);
        this.colorR = 255;
        this.colorG = 255;
        this.colorB = 255;
        this.colorDefault = color(0, 0, 0);
        // 球大小
        this.ballSize = random(4, 8);
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

        } else if (this.moveX > (move * random(4, 4)) & this.moveX < (move * random(300, 500)) && !this.over) {
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
        // 設置顏色
        let sc = 1;
        // 設透明度
        if (this.lifespan < 300 && !this.isTop) {
            this.lifespan += random(1, 2);
        } else {
            this.isTop = true;
            this.lifespan -= random(1.0, 1.6);
        }

        this.firstBallLife -= random(0.1, 0.8);
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
                c.setRed(255);
                c.setGreen(255);
                c.setBlue(255);
            }
        }

        fill(c);
        circle(this.begainV.x, this.begainV.y, this.ballSize);
    }

}