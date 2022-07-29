class FireExplodeSystem {
    constructor(fem, rVector) {
        this.explodeList = [];
        this.beginV = fem.beginV.copy();
        this.fColor = fem.fColor;
        this.fe = new FireExplode(fem, rVector);
        // console.log('create FireExplodeSystem');
    }

    isDead() {
        return this.explodeList.length == 0;
    }

    addExplode() {
        this.explodeList.push(this.fe);
    }

    run() {
        
        for (let i = this.explodeList.length - 1; i >= 0; i--) {
            let ex = this.explodeList[i];
            ex.run(i);
            if (ex.isDead()) {
            //   console.log('FireExplodeSystem dead');
              this.explodeList.splice(i, 2);
            }
        }
    }
}