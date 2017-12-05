function getPixel() {  
  img = loadImage("assets/sample.jpg");
  image(img, 0,0);
  var c = get(5,5);
  return c;
}