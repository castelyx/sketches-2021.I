let nCirclesH;
let nCirclesV;
let maxRadius;
let minRadius;
let sizeSpeed;
let backgroundColor;
let clusterArray = [];


function setup()
{
	createCanvas(windowWidth, windowHeight);
	ellipseMode(CORNER);

	nCirclesH = floor(random(3,7));
	nCirclesV = floor(random(3,7));
	maxRadius = floor(random(31, 39));
	minRadius = maxRadius/5;
	sizeSpeed = maxRadius * 0.002;
	backgroundColor = random(['#48bfe3', '#cb997e', '#FFFFFF']);

	let numberOfSquaresH = floor((windowWidth / nCirclesH)/maxRadius);
	let numberOfSquaresV = floor((windowHeight / nCirclesV)/maxRadius);
	let squareStepH = nCirclesH * maxRadius;
	let squareStepV = nCirclesV * maxRadius;
    

	for (let i = 0; i < numberOfSquaresH; i++)
	{
		for (let j = 0; j < numberOfSquaresV; j++)
		{
			let circleCluster = new CircleCluster(i*squareStepH, j*squareStepV, squareStepH, squareStepV);
			clusterArray.push(circleCluster);
		}
	}
}


function draw()
{	
	background(color(backgroundColor));

	clusterArray.forEach(element => {
		element.render();
	});
}


class CircleCluster
{
	constructor(posX, posY, w, h)
	{
		this.x = posX;
		this.y = posY;
        this.w = w;
		this.h = h;
		this.color = chooseColor();
        this.circleArray = [];
        let circle;
		
        for (let i = 0; i < nCirclesH; i++)
        {
            for (let j = 0; j < nCirclesV; j++)
            {	
                circle = new Circle(this.color);
                circle.i = i;
                circle.j = j;
                circle.id = String(i) + "," + String(j);
                this.circleArray[circle.id] = circle;
            }
        }
    }

    findCircle(firstCoord, secondCoord, arr)
    {
        let _id_ = String(firstCoord) +"," + String(secondCoord);
        for (const [key, value] of Object.entries(arr))
        {
            if (key == _id_)
            {
                return value;
            }
        }
    }

	render()
	{
		push();
			translate(this.x, this.y);

            let circle;
		
			for (let i = 0; i < nCirclesH; i++)
			{
				for (let j = 0; j < nCirclesV; j++)
				{	
                    circle = this.findCircle(i, j, this.circleArray);
     
					if (backgroundColor == '#FFFFFF')
					{
						stroke('#000000');
						strokeWeight(0.7);
					}
					else 
					{
						noStroke();
					}

                    if (circle.direction == 0)
                    {
                        circle.radius = map(sin(frameCount * sizeSpeed),1.0,-1.0,minRadius,maxRadius);
                    }
                    else if (circle.direction == 1)
                    {
                        circle.radius = map(sin(frameCount * sizeSpeed),-1.0,1.0,minRadius,maxRadius);
                    }
					fill(color(circle.col));
					ellipse(i*maxRadius, j*maxRadius, circle.radius);	
				}
			}
		pop();
	}
}


class Circle
{
	constructor(_col)
	{
		this.direction = random([0,1]);
		this.radius = (maxRadius - minRadius)/2;
		this.col = _col;
	}
}

function chooseColor()
{
	let rando = floor(random(5));
	let palette;
	switch(rando)
	{
		case 0:
			palette = ["#f9dc5c","#fae588","#fcefb4","#fdf8e1","#f9dc5c"];
			break;
		case 1:
			palette = ["#6b9080","#a4c3b2","#cce3de","#eaf4f4","#f6fff8"];
			break;
		case 2:
			palette = ["#e3dfff","#d3c0cd","#86e7b8","#93ff96","#b2ffa8"];
			break;
		case 3:
			palette = ["#ef6351","#f38375","#f7a399","#fbc3bc","#ffe3e0"];
			break;
		case 4:
			palette = ["#04e762","#f5b700","#00a1e4","#dc0073","#89fc00"];
			break;
	}
	return palette[floor(random(palette.length))];;
}

