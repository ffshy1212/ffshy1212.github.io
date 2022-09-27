
let beginX;
let beginY;
let bg;
let drawList = [];
let drawList2 = [];
let fireExList = [];
let firework;
let isEx = true;
let timers = 1;
let fireLine = 120;
let fireSpeed = 8;
let explodeSpeed = 60;
let isTest = false;

const controller = {
  fireLine: fireLine,
  fireSpeed: fireSpeed,
  explodeSpeed: explodeSpeed
};

function guiHandler() {
  fireLine = controller.fireLine;
  fireSpeed = controller.fireSpeed;
  explodeSpeed = controller.explodeSpeed;
};


function setup() {

  if (isTest) {
    const gui = new dat.GUI();
    gui.add(controller, 'fireLine', 1, 200, 1).onChange(guiHandler);
    gui.add(controller, 'fireSpeed', 1, 30, 1).onChange(guiHandler);
    gui.add(controller, 'explodeSpeed', 5, 60, 0.1).onChange(guiHandler);
  }

  createCanvas(windowWidth, windowHeight);
  bg = loadImage('assets/bg.jpg');

  beginX = 0;
  beginY = 0;

  // fireSpeed = 5;
  // explodeSpeed = 14.5;

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
    fireLine = controller.fireLine;
    // fireLine = 120;

    // console.log('firework shoot', fireLine);
  }
  ////

}

function fireLineExplode() {

  let colorModel = new ColorModel(random(255), random(255), random(255));

  while (timers > 0) {
    let fem = new FireExplodeModel(
      createVector(beginX, beginY),
      colorModel,
      random(0.3, 0.8),
      random(4, 6)
    );
    let f = new Firework(beginX, beginY, fem);
    drawList.push(f);
    timers--;
  }

  for (let i = drawList.length - 1; i > 0; i--) {
    drawList[i].display();
    if (!drawList[i].isRun) {
      // circle(drawList[i].begainX, drawList[i].endY, 50);

      drawList.splice(i, 1);

    }
  }

}

function fireExplode() {

  let colorModel = new ColorModel(random(255), random(255), random(255));

  while (fireLine > 0) {
    
    let rVector = p5.Vector.random3D();

    let fem = new FireExplodeModel(
      createVector(beginX, beginY),
      colorModel,
      random(0.3, 0.8),
      random(2, 3)
    );

    let f = new FireExplodeSystem(fem, rVector);
    drawList2.push(f);
    fireLine--;
  }

  for (let i = drawList2.length - 1; i > 0; i--) {

    // console.log('sketch', i);
    drawList2[i].addExplode();


    drawList2[i].run();

    if (drawList2[i].isDead()) {
      // console.log('isDead');
      drawList2.splice(i, 1);
    }





  }
}

