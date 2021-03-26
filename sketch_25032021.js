let buildingHeight;
let buildingBase;
let buildingStartingPoint;
let measureUnit;
let canvasSize;

function setup()
{
    canvasSize = min(windowWidth, windowHeight)
    cnv = createCanvas(canvasSize, canvasSize );
    centerCanvas();
    
    measureUnit = width / 250;
    buildingHeight = height/3;
    buildingBase = width/12;
    buildingStartingPoint = [-8*measureUnit, measureUnit*55];  //left side, bottom right
    pointB = [buildingStartingPoint[0] - buildingBase, buildingStartingPoint[1] - 3.5*measureUnit]; //left side, bottom left
    pointC = [buildingStartingPoint[0] - buildingBase, buildingStartingPoint[1] - 3.5*measureUnit - buildingHeight]; //left side, top left
    pointD = [buildingStartingPoint[0], buildingStartingPoint[1] - buildingHeight];   //left side, top right
    pointE = [buildingStartingPoint[0] + buildingBase - 6*measureUnit, buildingStartingPoint[1] - 8*measureUnit]; //right side, bottom right
    pointF = [buildingStartingPoint[0] + buildingBase - 6*measureUnit, buildingStartingPoint[1] - 8*measureUnit - buildingHeight]; //right side, top right
    pointG = [buildingStartingPoint[0], buildingStartingPoint[1] - buildingHeight * 1.5]; //roof top
    
    // compute some middle points

    pointH = [buildingStartingPoint[0] - measureUnit*7, 0]; 
    baseData = computeLineData(pointB, buildingStartingPoint);
    pointH[1] = findPointOnLine(baseData[0], baseData[1], pointH[0], 'y');    //door bottom right
    
    pointI = [pointH[0] - measureUnit * 8, 0];
    pointI[1] = findPointOnLine(baseData[0], baseData[1], pointI[0], 'y');      //door bottom left

    pointJ = [pointH[0], pointH[1] - measureUnit * 10]; //door top right
    pointK = [pointI[0], pointI[1] - measureUnit * 10];  //door top left
    pointL1 = [(pointH[0] + pointI[0])/1.8, pointH[1] - measureUnit * 15]; //door top left
    pointL2 = [(pointH[0] + pointI[0])/2.2, pointH[1] - measureUnit * 15]; //door top right
} 


function draw()
{
    background(22, 123, 56);
    
    stroke('black');
    strokeWeight(2);

    push();
        translate(width/2, height/2);

        fill('yellow')

        //left side of the building
        beginShape();
            vertex(buildingStartingPoint[0], buildingStartingPoint[1]);
            vertex(pointB[0], pointB[1]);
            vertex(pointC[0], pointC[1]);
            vertex(pointD[0], pointD[1]);
        endShape(CLOSE);

        //right side of the building
       beginShape();
            vertex(buildingStartingPoint[0], buildingStartingPoint[1]);
            vertex(pointE[0], pointE[1]);
            vertex(pointF[0], pointF[1]);
            vertex(pointD[0], pointD[1]);
        endShape();
      
        fill('red')
        //roof left side
        beginShape();
            vertex(pointC[0], pointC[1]);   
            vertex(pointG[0], pointG[1]);
            vertex(pointD[0], pointD[1]);
        endShape();

        //roof right side
        beginShape();
            vertex(pointD[0], pointD[1]);
            vertex(pointG[0], pointG[1]);
            vertex(pointF[0], pointF[1]);
        endShape();
     
        //door
        strokeWeight(2)
        fill('brown');
        beginShape();
            curveVertex(pointI[0], pointI[1]);
            curveVertex(pointI[0], pointI[1]);
            curveVertex(pointK[0], pointK[1]);
            curveVertex(pointL1[0], pointL1[1]);
            curveVertex(pointL2[0], pointL2[1]);
            curveVertex(pointJ[0], pointJ[1]);
        
            curveVertex(pointH[0], pointH[1]);
            curveVertex(pointH[0], pointH[1]);
        endShape();
    pop();

     
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