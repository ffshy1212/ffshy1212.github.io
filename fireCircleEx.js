class FireCircleEx {
    constructor(fColor) {
        this.fireCount = 50;
        this.exList = [];
        this.fColor = fColor;
    } 
    
    fireCircle(beginX, beginY) {

        while (this.fireCount != 0) {
            this.exList.push(new fireCircle(
                beginX, beginY, this.fColor, this.fireCount));
            this.fireCount --;
        }
    
        if (this.fireCount == 0) {
            for (let ex of this.exList) {
                // console.log('fireCircle ex');
                ex.update(0.05);
                ex.draw(8);
            }
        }

        // if (this.fireCount == 0) {

        //     for (let i = this.exList.length - 1; i >= 0; i --) {
        //         let ex = this.exList[i];
        //         ex.update(0.05);
        //         ex.draw(8);
    
        //         if (ex.ggg()) {
        //           this.exList.splice(i, 1);
        //         }
        //     }
        // }


    }
}