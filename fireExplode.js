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
        this.lifespan = 240;
        this.fr = 30;
        // 煙火頭透明度
        this.firstBallLife = 255;
        this.direction = createVector(0.00, 0.0058);
        // 亂數向量位置
        this.rVector = rVector;
        // 初速度
        this.rv = 1.38;
        // 擴散範圍
        this.vm = 0.001;
        this.colorR = 255;
        this.colorG = 255;
        this.colorB = 255;
        this.colorDefault = color(0, 0, 0);
        // 球大小
        this.ballSize = random(4, 7);
        this.isFinalWhite = random([true, false]);
        this.a = 10;
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
        if (this.moveX < (move * 15) && !this.over) {
            // console.log('update', mrv);

            this.moveX += move;
            this.moveY += pow(this.moveX, this.exponent);

            // 初速
            this.rVector.mult(this.rv);
            // 方向
            // this.rVector.add(this.direction);
            this.begainV.add(this.rVector.x + this.moveX, this.rVector.y + this.moveY);

            // 減速數值越大噴越遠
            if (this.moveX >= move * random(6, 8)) this.rVector.div(this.rv + this.moveX * 25);

        } else if (this.moveX > (move * 15) & this.moveX < (move * random(60, 200)) && !this.over) {
            this.moveX += move / random(2, 6);
            this.moveY = pow(this.moveX, 6);

            // this.rVector.mult(this.rv);
            this.rVector.div(move * 1008);
            this.rVector.add(this.direction);

            this.begainV.add(this.rVector.x + this.moveX, this.rVector.y + this.moveY);

        } else {
            // console.log('overgr hight');
            this.over = true;
        }
    }

    draw(index) {

        // console.log('FireExplode index', index , 'moveX', this.moveX);
        noStroke();

        // 設置顏色
        let sc = 1.8;
        // 設透明度
        this.lifespan -= random(1.2, 1.8);
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
            if (this.moveX > 0.0008 && this.isFinalWhite) {
                c.setRed(this.colorR + this.moveX * 250);
                c.setGreen(this.colorG + this.moveX * 250);
                c.setBlue(this.colorB + this.moveX * 250);

            }
        } else {
            if (index > 14) {
                if (frameCount % 2 == 0) {
                    this.rVector.div(this.vm * 1002);
                    // frameRate(30);
                }
            }
        }

        fill(c);
        circle(this.begainV.x, this.begainV.y, this.ballSize);
    }

}