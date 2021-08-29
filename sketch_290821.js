const len = 22;
const numCurves = 40000;
const stepLenght = 12;

let cols;
let rows;
let grid = [];
let angle;
let numCols;
let numRows;
let left_x;
let left_y;
let bottom_y;
let top_y;
let resolution;

//parameters
let a; 
let b; 
let c; 
let d;
let radius;
let radiuses = [8, 15, 30, 40];
let numSteps;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(random(122), random(100), random(153));

	left_x = int(width * -2);
	right_x = int(width * 1.5);
	top_y = int(height * -0.5);
	bottom_y = int(height * 1.5); 
	resolution = int(width * 0.01); 
	numCols = (right_x - left_x) / resolution;
	numRows = (bottom_y - top_y) / resolution;
	
	a = random(0.1, 0.67);
	b = random(500);
	c = 4.5;
	d = floor(random(3));
	let r = floor(random(4))
	radius = radiuses[r];
	numSteps = random(4)

	for (let j = 0; j < numCols; j++) 
	{
		for (let i = 0; i < numRows; i++) 
		{
	  	angle = (a*i-j*b)/(numRows+sin(PI)) * c * PI;
	  	grid[j,i] = angle
	  }
	}

	 for (let k = 0; k < numCurves; k++)
  {
  	drawCurve(random(width), random(height), d);
  } 	
	
}

function draw()
{

}

function drawCurve(startX, startY, d)
{
	if (d == 0)
	{
		stroke(color(random(50, 200), random(100, 200), random(200), random(100)));
	}
	else if (d == 1)
	{
		stroke(color(random(150), random(100), random(44), random(100)));
	}
	else if (d == 2)
	{
		stroke(color(random(150,240), random(50), random(50,129), random(240)));
	}

	strokeWeight(4);
	noFill();

	for(let i = 0; i < numSteps; i++)
	{
		let columnIndex = floor((startX - left_x)/resolution);
		let rowIndex = floor((startY - top_y)/resolution);
		let vectorAngle = grid[columnIndex, rowIndex];

		let xStep = stepLenght * cos(vectorAngle);
		let yStep = stepLenght * sin(vectorAngle);

		startX += xStep;
		startY += yStep;

		ellipse(startX, startY, radius, radius)
	}
}
