
let beginX;
let beginY;
let bg;
let drawList = [];
let drawList2 = [];
let fireExList = [];
let firework;
let isEx = true;
let timers = 1;
let timers2 = 1;
let fireSpeed = 1;
let explodeSpeed = 15;

// const gui = new dat.GUI();
// const controller = {
// 	fireLine: 150,
//   fireSpeed: 5,
//   explodeSpeed: 25
// };

// function guiHandler(){
// 	timers2 = controller.fireLine;
//   fireSpeed = controller.fireSpeed;
//   explodeSpeed = controller.explodeSpeed;
// };


function setup() {

  // gui.add(controller, 'fireLine', 1, 200, 1).onChange(guiHandler);
  // gui.add(controller, 'fireSpeed', 1, 30, 1).onChange(guiHandler);
  // gui.add(controller, 'explodeSpeed', 5, 30, 0.1).onChange(guiHandler);

  createCanvas(windowWidth, windowHeight);
  bg = loadImage('assets/bg.jpg');

  beginX = 0;
  beginY = 0;
  
  fireSpeed = 5;
  explodeSpeed = 30;

  // colorMode(RGB);
}

function draw() {
  clear();
  // background(0, 0);

  
  // fireSpeed = controller.fireSpeed;
  // explodeSpeed = controller.explodeSpeed;

  frameRate(explodeSpeed);

  // background(bg);

  //// 發射
  // fireExplode();
  // if (frameCount % 20 == 0) {
  //   beginX = random(50, width - 50);
  //   beginY = random(30, height - 50);
  //   timers = 3;

  //   console.log('firework shoot');
  // }
  ////
  
  //// 直接噴火
  fireExplode();
  if (frameCount % fireSpeed == 0) {
    beginX = random(50, width - 50);
    beginY = random(30, height - 50);
    // timers2 = controller.fireLine;
    timers2 = 150;

    console.log('firework shoot', timers2);
  }
  ////

}

function fireLineExplode() {

  let colorModel = new ColorModel(random(255), random(255), random(255));

  while(timers > 0) {  
    let fem = new FireExplodeModel(
      createVector(beginX, beginY),
      colorModel,
      random(0.3, 0.8),
      random(1, 3)
    );
    let f = new Firework(beginX, beginY, fem);
    drawList.push(f);
    timers --;
  }

  for (let i = drawList.length - 1; i > 0; i --) {
    drawList[i].display();
    if (!drawList[i].isRun) {
      // circle(drawList[i].begainX, drawList[i].endY, 50);

      drawList.splice(i, 1);

    } 
  } 

}

function fireExplode() {

  let colorModel = new ColorModel(random(255), random(255), random(255));

  while(timers2 > 0) {  
    let rVector = p5.Vector.random3D();

    let fem = new FireExplodeModel(
      createVector(beginX, beginY),
      colorModel,
      random(0.3, 0.8),
      random(2, 4)
    );

    let f = new FireExplodeSystem(fem, rVector);
    drawList2.push(f);
    timers2 --;
  }

  for (let i = drawList2.length - 1; i > 0; i --) {

    // console.log('sketch', i);
    drawList2[i].addExplode();
    drawList2[i].run();

    if (drawList2[i].isDead()) {
        // console.log('isDead');
        drawList2.splice(i, 1);
    }
  }
}

