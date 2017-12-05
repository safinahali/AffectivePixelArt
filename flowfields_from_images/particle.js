function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 4;
  this.h = 1;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {

    //img = loadImage("assets/sample.jpg");
    //image(img,0,0, width, height);
    var getk  = img.get(this.pos.x, this.pos.y);
    //this is cool colors with perlin noise
    //stroke(20, this.h, 60, 30);
    //this is getting colors from the image
    //stroke(getk[0], getk[1], getk[2], 70);
    //this is doig different colors for the noise in black or white parts of silhouette images
    stroke(getk[2]/3 - (this.h/2), this.h, 30, 40);
    //console.log(getk[0], getk[1], getk[2]);
    var add = 1;    
    if (this.h > 70) {
      this.h = 0;
    }
    this.h = this.h + add;   
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }
  

}