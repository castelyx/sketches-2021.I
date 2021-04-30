let cl = [];
let randomPos;
let randomPos3;
let colorShape2;
let coefH;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    noLoop()

    cl[1] = random(255);
    cl[2] = random(255);
    cl[3] = random(255);
    randomPos = random([1,2,3,4]);
    randomPos3 = random(1)
    colorShape2 = random(['#2667ff', '#6f49a1', '#cc5803'])
}


let i =3;
let j = 5;
let w = 100;
let rotation = i * j * w;

function draw()
{
    background(25);
    for (let z = 0; z<3; z++)
    {
        strokeWeight(0.2);
        noFill();
                
        let pos = sin(w * HALF_PI * (1.5*i) * j) 
        for (let h = 0; h < 1000; h++)
        {
            let colorShape = color(cl[1] * i, cl[2] * w, cl[3] + z*45, random(100));
            stroke(colorShape);

            if (z == 0 || z == 2)
            {
                ellipse(pos+width/4 + z*500, height/2 + 10*pos + random(200) , rotation/2 *  random(h/500), rotation/5);
            }
            else
            {
                switch(randomPos)
                {
                    case 1:
                        ellipse(pos+width/4 + z*500, height/2 + 10*pos + random(200) , rotation/2 *  random(h/500), rotation/5);
                        break;
                    case 2:
                        stroke(colorShape2)
                        ellipse(pos+width/4 + z*500, height/2 + 10*pos + random(200) , rotation/14*  random(h/200), rotation/16);
                        break;
                    case 3:
                        if (randomPos3 <= 0.5)
                        {
                            colorShape = color( h*2,  h, h*45, 55);
                            coefH = 4;
                            stroke(colorShape);
                            strokeWeight(0.8)
                            ellipse(pos+width/4 + z*500, height/coefH + 10*pos + random(200) , rotation/2 *  random(h/500), rotation/5);
                        }
                        else
                        {
                            colorShape = color(228-h,7*h,29,125);
                            coefH = random(10);
                            stroke(colorShape);
                            strokeWeight(0.1)
                            ellipse(pos+width/4 + z*500, height/coefH + 10*pos + random(200) , rotation/2 *  random(h/500), rotation/9);
                        }
                       
                     
                        break;   
                    case 4:
                        stroke(color(228,7,29));
                        ellipse(pos+width/80 + z*500, height/4 + 10*sin(w *PI * (1.5*i) * j)  + random(600) , rotation/14*  random(h/200), rotation/16);
                        break;
                }
                
            }
        } 
    }
    if (randomPos ==4)
    {
        stroke(color(228,7,29));
        strokeWeight(0.1)
        for (let h = 0; h< 1000; h++)
        {
            ellipse(sin(HALF_PI * (1.5*i) * j) +width - 400, height/4 + 10*sin(w *PI * (1.5*i) * j)  + random(600) , rotation/14*  random(h/200), rotation/16);
        }
        
    }
}
