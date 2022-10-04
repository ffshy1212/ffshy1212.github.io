
let beginX;
let beginY;
let bg;
let drawList = [];
let drawList2 = [];
let timers = 1;
let fireLine = 60;
let fireSpeed = 15;
let explodeSpeed = 47;
let backgroundColor = 110;
let isTest = false;
let wcg;
let aColor;

const controller = {
  fireLine: fireLine,
  fireSpeed: fireSpeed,
  explodeSpeed: explodeSpeed,
  bColor: backgroundColor
};

function guiHandler() {
  fireLine = controller.fireLine;
  fireSpeed = controller.fireSpeed;
  explodeSpeed = controller.explodeSpeed;
  backgroundColor = controller.bColor;
};


function setup() {

  if (isTest) {
    const gui = new dat.GUI();
    gui.add(controller, 'fireLine', 1, 200, 1).onChange(guiHandler);
    gui.add(controller, 'fireSpeed', 1, 30, 1).onChange(guiHandler);
    gui.add(controller, 'explodeSpeed', 5, 60, 0.1).onChange(guiHandler);
    gui.add(controller, 'bColor', 0, 255, 1).onChange(guiHandler);
  }

  createCanvas(windowWidth, windowHeight);
  wcg = createGraphics(width / 2, height / 2, WEBGL);
  bg = loadImage('assets/bg.jpg');

  beginX = 0;
  beginY = 0;

  aColor = color(0, 0, 0);

  // colorMode(RGB);
}


function draw() {

  aColor.setAlpha(backgroundColor);
  wcg.background(0, 10);

  background(aColor);

  frameRate(explodeSpeed);

  //// 直接噴火
  fireExplode();
  if (frameCount % fireSpeed == 0) {
    beginX = random(50, width - 50);
    beginY = random(30, height - 50);
    fireLine = controller.fireLine;
  }
  ////

}

function fireExplode() {

  let colorModel = new ColorModel(random(255), random(255), random(255));

  while (fireLine > 0) {

    let rVector = p5.Vector.random3D();

    let fem = new FireExplodeModel(
      createVector(beginX, beginY),
      colorModel,
      random(4, 6)
    );

    let f = new FireExplodeSystem(fem, rVector);

    drawList2.push(f);
    fireLine--;
  }

  for (let i = drawList2.length - 1; i > 0; i--) {
    drawList2[i].addExplode();
    drawList2[i].run();

    if (drawList2[i].isDead()) {
      drawList2.splice(i, 1);
    }

  }
}

