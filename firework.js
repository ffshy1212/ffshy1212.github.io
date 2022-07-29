class Firework {
    constructor(beginX, endY, fem) {
        // console.log('create Firework');
        this.isRun = true;
        this.beginX = beginX;
        this.endY = endY;
        this.lineList = [];
        this.speed = 0.4;
        this.fireLine = new FireworkLine(this.beginX, this.endY, fem);
        this.fireExList = [];
        this.timers = 10;
        this.fem = fem;
    }

    isDead() {
        return this.lineList.length == 0;
    }

    finished() {
        return this.isRun;
    }

    display() {

        // console.log('firework display');

        if (this.isRun) {
            this.lineList.push(this.fireLine);
        }

        for (let i = this.lineList.length - 1; i >= 0; i --) {

            let l = this.lineList[i];
            l.update(this.speed, i);
            l.draw();

            if (l.finished()) {
                this.isRun = false;
                this.lineList.splice(i, 1);

                // this.fireExploed();
            }
        }
    }

    fireExploed() {
        while(this.timers > 0) {
            let rVector = p5.Vector.random2D();
            let fe = new FireExplodeSystem(this.fem, rVector); 
            this.fireExList.push(fe);
            this.timers --;
        }

        for (let ex of this.fireExList) {

            ex.addExplode();
            ex.run();

            if (ex.isDead()) {
                // console.log('isDead');
                this.explode = true;
            }
        }
    }
}