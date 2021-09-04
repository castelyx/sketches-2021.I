let a;
let b;
let c;
let d;
let startX, startY;
let rando;
const attractorIter = 25;
const iter = 850;

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  background(10);
  
  a = random(-4, -2);
  b = random(-4, -0.5);
  c = random(-1.1, 0.5);
  d = random(1, 3)
  rando = random(1);
}

function draw() 
{
  for (let i = 0; i < iter; i++) 
  {
    startX = random(-10, 10);
    startY = random(-10, 10);
    attractor(startX, startY, a, b, c, d, attractorIter);
  }
}

function attractor(x0, y0, a, b, c, d, n) 
{
  var x = x0;
  var y = y0;
  
  for (i = 0; i < n; i++) 
  {
    var xt = x;
    
    x = sin(a*y) + c*cos(a*x);
    y = sin(b*xt) + d*cos(b*y)
  }
 stroke(240, 255, 63, 25)
 
  
  push();
    translate(width/5, height/5)
    strokeWeight(0.7)
    if (rando >= 0.7)
    {
      stroke(255, 234, 0, 17)  //gold figure
    }
    else
    {
      stroke(58, random(100, 134), random(150, 255), 45);  //light figure
    }
    point(map(x, -4, 4, 0, width/2), map(y, -4, 4,  height/2, 0));
    
    if (rando >= 0.7)
    {
      stroke(58, 134, 255, 70);  //blue background
    }
    else
    {
      stroke(255, 234, 0, 25)  //gold background
    }
    point(map(x, -4, 4, 0, width/2) + random(-200,200), map(y, -4, 4,  height/2, 0)+random(-200, 200));
    
    scale(2)
    strokeWeight(1.5)
    stroke(255, 9)
    point(map(x, -1, 1, 0, width), map(y, -1, 1,  height/2, 0));
  pop();
}