var joyvalue;
var video;
var xoff = 0;
var vScale = 8;

function setup() {
  //createCanvas(1024, 786);
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
   }

function draw() {
  background(51);

  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];
      
      var bright = (r+g+b)/3;

      var w = map(bright, 0, 255, 0, vScale);
      var kr = (x+y)*2; 
      var kb = (x+y)*2;  
      
      //Adding noise to pixels
      //var xnew = x + noise(xoff);
      //var ynew = y + noise(xoff);
      
      xoff += .5;

      noStroke();
      fill(255-kr*(1-(0.5*joyvalue)), 200, kb);
      rectMode(CENTER);

      //noise
      //ellipse(xnew*vScale, ynew*vScale, w, w);
      
      //regular
      ellipse(x*vScale, y*vScale, w, w);
     
     console.log(joyvalue);
      
      }
  }
 
}