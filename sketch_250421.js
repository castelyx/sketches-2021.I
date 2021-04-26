const GRID_H = 30;
const GRID_V =20;
let tileWidth;
let tileHeight;
let palettes = [
	["#eae4e9","#fff1e6","#fde2e4","#fad2e1"],
	["#bee1e6","#f0efeb","#dfe7fd","#cddafd"],
	["#ff7b00","#ff9500","#ffc300","#ffea00"],
	["#a1cca5","#8fb996","#709775","#415d43"]
					  ]
let palette;
let puntillo;

function setup()
{
	palette = palettes[floor(random(palettes.length))];
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	background(palette[0]);
	tileWidth = width / GRID_H;
	tileHeight = height / GRID_V;
	puntillo = random([0,1, 2])

	noLoop();
}


function draw()
{	
	strokeWeight(3);
	stroke(palette[1]);

	for (let i = 0; i < GRID_H; i++)
	{
		for (let j = 0; j < GRID_V; j++)
		{
			let tile = new Tile(i, j, random([0,1,2,3]));
			tile.render();
		}
	}

}

class Tile
{
	constructor(coordX, coordY, orientation)
	{
		 this.x = coordX;
		 this.y = coordY;
		 this.orientation = orientation;
	}

	render()
	{
		push();
		translate(this.x * tileWidth + tileWidth/2, this.y * tileHeight + tileHeight/2);
			switch(this.orientation)
			{
				case 0:
					if (random(1) > 0.35)
					{
						fill(palette[random([0,2,3])]);
						if (puntillo == 0)
						{
							ellipse(0, 0, 10);
						}
						else if (puntillo == 1)
						{
							rect(0, 0, 10, 10);
						}
						else if (puntillo == 2)
						{
							let f = new Flower();
							f.render();
						}
					}
					
				
					line(-tileWidth/2, 0, 0, tileHeight/2);
					line(0, -tileHeight/2, tileWidth/2, 0);
					break;
				
				case 1:
					line(-tileWidth/2, 0, 0, -tileHeight/2);
					line(0, tileHeight/2, tileWidth/2, 0);
					break;

				case 2:
					line(-tileWidth/2, 0, 0, -tileHeight/2);
					line(-tileWidth/2, 0, 0, tileHeight/2);
					break;

				case 3:
					line(0, -tileHeight/2, tileWidth/2, 0);
					break;
			}
		pop();
	}
}

class Flower
{
	constructor()
	{

	}
	
	render()
	{
		line(-5,-5, 5, 5)
		line(-5, 5, 5, -5)
		stroke(palette[random([1,2,3])]);
		point(0, 5)
		point(0,-5)
		point(-5, 0)
		point(5,0)
		stroke(palette[1]);
	}
}

function keyTyped() 
{
	if (key === 's') 
	{
		saveCanvas('sketch250421', 'png');
	} 
}