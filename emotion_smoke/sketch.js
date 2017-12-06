// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

var inc = 0.1;
var scl = 5;
var cols, rows;

var zoff = 0;

var fr;

// var particles = [];
var imgparticles = [];

var flowfield;

function setup() {
  createCanvas(300, 300);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  // for (var i = 0; i < 100; i++) {
  //   particles[i] = new Particle();
  // }

  counter = -1;
  for (var i = 0; i < width; i++){
    for (var j = 0; j < height; j++){
      if(i%4==0 && j%4==0 && mydata[j][i] == 1){
        counter+=1;
        imgparticles[counter] = new imgParticle(i,j);
      }
    }
  }

  // widthSt = (width/3);
  // widthFn = (width-width/3);
  // for (var j = (height-height/3); j < height; j++){
  //   widthSt+=1;
  //   widthFn-=1;
  //   for (var i = widthSt; i < widthFn; i++){
  //     if(j%4==0 && i%4==0){
  //       counter+=1;
  //       imgparticles[counter] = new imgParticle(i,j);
  //     }
  //   }
  // }

  // widthSt = (width/2);
  // widthFn = (width/2);
  // for (var j = 0; j < (height-(2*(height/3))); j++){
  //   widthSt-=1;
  //   widthFn+=1;
  //   for (var i = widthSt; i < widthFn; i++){
  //     if(j%4==0 && i%4==0){
  //       counter+=1;
  //       imgparticles[counter] = new imgParticle(i,j);
  //     }
  //   }
  // }

  background(0);
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.005;
  }

  // for (var i = 0; i < particles.length; i++) {
  //   particles[i].follow(flowfield);
  //   particles[i].update();
  //   particles[i].edges();
  //   particles[i].show();
  // }
  for (var i = 0; i < imgparticles.length; i++) {
    imgparticles[i].follow(flowfield);
    imgparticles[i].update();
    imgparticles[i].edges();
    imgparticles[i].show();
  }

  fr.html(floor(frameRate()));
}