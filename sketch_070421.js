let palette = [];
let circles;
const RECTS = 5;

function setup()
{
	if (random(1) <= 0.5)
	{
		palette = [color(250, 225, 221), color(254, 197, 187), color(234, 231, 137), color(200, 123, 123, 155) ]
	}
	else
	{
		palette = [color(250, 225, 221), color(254, 197, 187), color(234, 231, 137), color(254, 250, 224, 155) ];  
	}

	circles = floor(random(10, 15));
	createCanvas(windowWidth, windowHeight);	
	background(palette[3]);
	
	noLoop();
}


function draw()
{	
	for (let a = 0; a < 100; a++)
	{
		new SmallLines();
	}
	blendMode(DIFFERENCE);

	let rectStep = width/6;
	for (let i = 1; i <= RECTS; i++)
	{
		rect(rectStep * i, height / random(1.5, 20), width/random(10,35), height);
	}

	let c1 = palette[0];
	let c2 = palette[1];

	for (let i = 1; i <= circles; i++)
	{
		if (random(1) >= 0.3)
		{
			let circleGroup = new CircleGroup(c1, c2, i);
			circleGroup.render();
		}
	}
}

class SmallLines
{
	constructor()
	{
		strokeWeight(0.3);
		stroke(palette[2]);
		let firstPoint = [random(max(height , width)), random(max(height, width))];
		let secondPoint = [random(max(height, width)), random(max(height, width))];
		line(firstPoint[0], firstPoint[1], secondPoint[0], secondPoint[1]); 
	}
}

class CircleGroup
{
	constructor(color1, color2)
	{
		this.direction = floor(random(1,4));
		this.circleNumber = floor(random(5, 15));
		this.circleGroupColor;
		this.colorStart = color1;
		this.colorEnd = color2;
		this.circleSize = random(10, 55);
		
		let minW = width/8;
		let maxW = width - width/8;
		let minH = height/6;
		let maxH = height - height/4;

		this.startPointX = random(minW, maxW);
		this.startPointY = random(minH, maxH);
	}

	render()
	{
		stroke(65);
		strokeWeight(0.3);
		let a = [];
		for (let j=1; j <= this.circleNumber; j++)
		{
			switch(this.direction)
			{
				case 1:
					a = [1, 1];
					break;
				case 2: 
					a = [-1, 1];
					break;
				case 3:
					a = [1, -1];
					break;
				case 4:
					a = [-1, -1];
					break;
			}
			this.circleGroupColor = lerpColor(this.colorStart, this.colorEnd, j*0.1);
			fill(this.circleGroupColor);
			ellipse(this.startPointX - a[0] * j*10, this.startPointY - a[1] * j *10, this.circleSize * j * 0.5);		
		}
	}
}