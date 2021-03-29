let buildingHeight;
let buildingBase;
let buildingStartingPoint;
let measureUnit;
let canvasSize;
let building;
let wndw = [];
const windowNumber = 3;
let wndwHeight;
let crystalsArray = [];

function setup()
{
    canvasSize = min(windowWidth, windowHeight)
    cnv = createCanvas(canvasSize, canvasSize );
    centerCanvas();

    angleMode(DEGREES);

    measureUnit = width / 250;
    wndwHeight = 7*measureUnit;

    building = new Building(width/12, height/3, -8, 55);
    for (let i = 0; i < windowNumber; i++)
    {
        wndw[i] = new Window(building.height/3 + i*60, "left", building);
    }
    for (let i = windowNumber; i < 2*windowNumber; i++)
    {
        let j = i - windowNumber;
        wndw[i] = new Window(building.height/3  + j*60, "right", building);
    }

    for (let i = 0; i < 40; i++)
    {
        crystalsArray.push(new Crystal);
    }
    console.log(crystalsArray)
  
} 


function draw()
{
    //background(color('#4287f5'));
    background(color('#012247'))

    crystalsArray.forEach((element) => 
    {
        element.render();
    });

    theHills();

    stroke('black');
    strokeWeight(2);
    building.render();

    for (let i = 0; i < 2*windowNumber; i++)
    {
        wndw[i].render();
    }
}

class Building
{
    constructor(_base, _height, coeffStartX, coeffStartY)
    {
        this.height = _height;
        this.base = _base;
        this.buildingStartingPoint = [coeffStartX*measureUnit, coeffStartY * measureUnit];  //left side, bottom right
        this.pointB = [this.buildingStartingPoint[0] - this.base, this.buildingStartingPoint[1] - 3.5*measureUnit]; //left side, bottom left
        this.pointC = [this.buildingStartingPoint[0] - this.base, this.buildingStartingPoint[1] - 3.5*measureUnit - this.height]; //left side, top left
        this.pointD = [this.buildingStartingPoint[0], this.buildingStartingPoint[1] - this.height];   //left side, top right
        this.pointE = [this.buildingStartingPoint[0] + this.base - 6*measureUnit, this.buildingStartingPoint[1] - 8*measureUnit]; //right side, bottom right
        this.pointF = [this.buildingStartingPoint[0] + this.base - 6*measureUnit, this.buildingStartingPoint[1] - 8*measureUnit - this.height]; //right side, top right
        this.pointG = [this.buildingStartingPoint[0], this.buildingStartingPoint[1] - this.height * 1.5]; //roof top

         // compute some middle points
        let baseData = [];

        this.pointH = [this.buildingStartingPoint[0] - measureUnit*7, 0]; 
        baseData = computeLineData(this.pointB, this.buildingStartingPoint);
        this.pointH[1] = findPointOnLine(baseData[0], baseData[1], this.pointH[0], 'y');    //door bottom right
        this.pointI = [this.pointH[0] - measureUnit * 8, 0];
        this.pointI[1] = findPointOnLine(baseData[0], baseData[1], this.pointI[0], 'y');      //door bottom left
        this.pointJ = [this.pointH[0], this.pointH[1] - measureUnit * 10]; //door top right
        this.pointK = [this.pointI[0], this.pointI[1] - measureUnit * 10];  //door top left
        this.pointL1 = [(this.pointH[0] + this.pointI[0])/1.8, this.pointH[1] - measureUnit * 15]; //door top left
        this.pointL2 = [(this.pointH[0] + this.pointI[0])/2.2, this.pointH[1] - measureUnit * 15]; //door top right  
    }

    render()
    {
        push();
            translate(width/2, height/2);

            //left side of the building
            stroke(color('#ebb31a'))
            strokeWeight(1);
            fill('yellow')

            beginShape();
                vertex(this.buildingStartingPoint[0], this.buildingStartingPoint[1]);
                vertex(this.pointB[0], this.pointB[1]);
                vertex(this.pointC[0], this.pointC[1]);
                vertex(this.pointD[0], this.pointD[1]);
            endShape(CLOSE);

            //right side of the building
            stroke(color('#ebb31a'))
            strokeWeight(1);
            fill('yellow')

            beginShape();
                vertex(this.buildingStartingPoint[0], this.buildingStartingPoint[1]);
                vertex(this.pointE[0], this.pointE[1]);
                vertex(this.pointF[0], this.pointF[1]);
                vertex(this.pointD[0], this.pointD[1]);
            endShape();
            
            //roof left side
            stroke(color('#6b000e'))
            strokeWeight(1);
            fill('red')

            beginShape();
                vertex(this.pointC[0], this.pointC[1]);   
                vertex(this.pointG[0], this.pointG[1]);
                vertex(this.pointD[0], this.pointD[1]);
            endShape();

            //roof right side
            stroke(color('#6b000e'))
            strokeWeight(1);
            fill('red')

            beginShape();
                vertex(this.pointD[0], this.pointD[1]);
                vertex(this.pointG[0], this.pointG[1]);
                vertex(this.pointF[0], this.pointF[1]);
            endShape();
            
            //door
            stroke(color('#6b000e'))
            strokeWeight(1);
            fill('brown')

            beginShape();
                curveVertex(this.pointI[0], this.pointI[1]);
                curveVertex(this.pointI[0], this.pointI[1]);
                curveVertex(this.pointK[0], this.pointK[1]);
                curveVertex(this.pointL1[0], this.pointL1[1]);
                curveVertex(this.pointL2[0], this.pointL2[1]);
                curveVertex(this.pointJ[0], this.pointJ[1]);
            
                curveVertex(this.pointH[0], this.pointH[1]);
                curveVertex(this.pointH[0], this.pointH[1]);
            endShape();
        pop();
    }
}

class Window
{
    constructor(_height, _side, _building)
    {
        if (_side == "left")
        {
            this.point00 = [_building.buildingStartingPoint[0] - 9*measureUnit, 0];
            this.point01 = [_building.buildingStartingPoint[0] - 13*measureUnit, 0];
            let baseData = computeLineData(_building.pointB, _building.buildingStartingPoint);
            this.point00[1] = findPointOnLine(baseData[0], baseData[1], this.point00[0], 'y');
            this.point01[1] = findPointOnLine(baseData[0], baseData[1], this.point01[0], 'y');
            this.pointA = [this.point00[0], this.point00[1] - _height];
            this.pointB = [this.point01[0], this.point01[1] - _height];
            this.pointC = [(this.point00[0] + this.point01[0])/2.17, this.point00[1] - _height - wndwHeight];
            this.pointD = [(this.point00[0] + this.point01[0])/1.83, this.point00[1] - _height - wndwHeight];
        }
        else if (_side == "right")
        {
            this.point00 = [_building.buildingStartingPoint[0] + 6.5*measureUnit, 0];
            this.point01 = [_building.buildingStartingPoint[0] + 10*measureUnit, 0];
          
            let baseData = computeLineData(_building.pointE, _building.buildingStartingPoint);
            this.point00[1] = findPointOnLine(baseData[0], baseData[1], this.point00[0], 'y');
            this.point01[1] = findPointOnLine(baseData[0], baseData[1], this.point01[0], 'y');
            this.pointA = [this.point00[0], this.point00[1] - _height + 1.5*measureUnit];
            this.pointB = [this.point01[0], this.point01[1] - _height + 1.5*measureUnit];
            this.pointC = [this.pointA[0] + measureUnit/3, this.point00[1] - _height - wndwHeight + 1.5*measureUnit] ;
            this.pointD = [this.pointB[0] - measureUnit/3, this.point01[1] - _height - wndwHeight + 1.5*measureUnit];
        }
    }
    
    render()
    { 
        noStroke()
        fill(color('#52e3de'));
        
        push();
            translate(width/2, height/2);
            beginShape();
                curveVertex(this.pointA[0], this.pointA[1]);
                curveVertex(this.pointA[0], this.pointA[1]);
                curveVertex(this.pointC[0], this.pointC[1]);
                curveVertex(this.pointD[0], this.pointD[1]);
                curveVertex(this.pointB[0], this.pointB[1]);
                curveVertex(this.pointB[0], this.pointB[1]);
            endShape();

            strokeWeight(4);
            stroke('red');

        pop();
    }

}

class Crystal
{
    constructor()
    {
        this.circleSize = random(50,300);
        this.crystalColor = random(['#ade8f4', '#48cae4', '#0077b6']);
        this.x = random(canvasSize);
        this.y = random(canvasSize);
        this.id = random(1000)
    }

    render()
    {
        strokeWeight(0.7);
        stroke(this.crystalColor);
        noFill();

        ellipse(this.x, this.y, this.circleSize);

        for (let a = 0; a <= 360; a+= 30)
        {
            push()
            translate(this.x, this.y)
            let coords = findPointOnCircle(a, this.circleSize);
            line(0, 0, coords[0], coords[1])
            pop()
        }
    }

}


function theHills()
{
    stroke(color('#ebb31a'))
    strokeWeight(5);
    fill('yellow')
    beginShape();
        curveVertex(0, height/2 + height/15);
        curveVertex(0, height/2 + height/15);
        curveVertex(width - width/2, height/2 + height/8);
        curveVertex(width/2 + width/4, height/2 + height/3.5);
        curveVertex(width/2 + width/3, height/2 + height/3);
        curveVertex(width/2 + width/2.5, height/2 + height/3);
        curveVertex(width/2 + width/2, height/2 + height/3);
        curveVertex(width, height/2 + height/2 - 500);
        curveVertex(width, height/2 + height/2 - 500);
        vertex(width, height);
        vertex(width, height);
        vertex(0, height);
        vertex(0, height);
    endShape();
}

function centerCanvas() 
{
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function windowResized() 
{
    canvasSize = min(windowWidth, windowHeight)
    resizeCanvas(canvasSize, canvasSize);
    centerCanvas();
}

function computeLineData(point0, point1)
{
    let m =  (point1[1]-point0[1])/(point1[0]-point0[0]);
    let q = point1[1] - m * point1[0];
    let arr = [m,q];

    return arr;
}

function findPointOnLine(angularCoefficient, intercept, inputCoord, coordToFind)
{
    if (coordToFind == 'y')
    {
        return angularCoefficient * inputCoord + intercept;
    }
    else if (coordToFind == 'x')
    {
        return (inputCoord-intercept)/angularCoefficient;
    }
}

function findPointOnCircle(theta, diam)
{
    let coords = [];
    coords[0] = sin(theta) * diam/2;
    coords[1] = cos(theta) * diam/2;
    return coords;
}