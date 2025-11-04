var play, coin, bullet, special, regen, ground;

var pX, pY, pSize;
var pVx = 0, pVy = 0;

var cX, cY, cSize, cVx, cVy;
var bX, bY, bSize, bVx;
var sX, sY, sSize, sVy;
var rX, rY, rSize, rVx, rVy;

var score = 0, lives = 7;

var groundY;
var jumpTopY;


function preload()
{
    play = loadImage("mario.png");
  coin = loadImage("mariocoin.png");
  bullet = loadImage("bulletbill.png");
  special = loadImage("bombomb.png");
  regen = loadImage("upmushroom.png");
}

function setup()
{
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.elt.tabIndex = '0';
    canvas.elt.focus();
  frameRate(60);

  groundY = height - height / 6;

  pSize = (width * height) / (9000.0 * (width / 900.0));
  pX = random(0, width);
  pY = groundY;
  jumpTopY = groundY - height / 3;

  cSize = (width * height) / (13000.0 * (width / 900.0));
  cX = random(0, width);
  cY = random(0, groundY - cSize);
  cVx = random(5, 15) * (width / 900.0);
  cVy = random(5, 15) * (height / 700.0);

  bSize = (width * height) / (7000.0 * (width / 900.0));
  bX = random(0, width);
  bY = random(0, groundY - bSize);
  bVx = random(10, 20) * (width / 900.0);

  sSize = (width * height) / (7000.0 * (width / 900.0));
  sX = random(0, width);
  sY = random(0, groundY - sSize);
  sVy = 2 * (height / 700.0);

  rSize = (width * height) / (12000.0 * (width / 900.0));
  rX = random(0, width);
  rY = random(0, groundY - rSize);
  rVx = 10 * (width / 900.0);
  rVy = 10 * (height / 700.0);


}

function draw()
{
  background(0, 50, 255);
  noStroke();

  fill(0, 255, 0);
  rect(0, groundY, width, height / 6);

  pY += pVy;
  pVy += 0.5 * (height / 700.0);

  if (pVy < 0 && pY <= jumpTopY)
  {
    pVy = 5 * (height / 700.0);
  }

  if (pY >= groundY)
  {
    pY = groundY;
    pVy = 0;
  }

  if (!keyIsPressed)
  {
    pVx = 0;
  }

  pX += pVx;

  image(play, pX - pSize / 2, pY - pSize, pSize, pSize);
  image(coin, cX, cY, cSize, cSize);
  image(bullet, bX, bY, bSize, bSize);
  image(special, sX, sY, sSize, sSize);
  if (lives < 2)
  {
    image(regen, rX, rY, rSize, rSize);
  }

  cX += cVx;
  cY -= cVy;
  bX += bVx;
  sY += sVy;
  rX += rVx;
  rY += rVy;

  textAlign(LEFT);
  textSize(50 * (height / 700.0));
  fill(255);
  text("Score: " + score, width / 16, height / 12);
  textSize(25 * (height / 700.0));
  text("Lives: " + lives, width / 16, height / 6);

  var playerCenterX = pX;
  var playerCenterY = pY - pSize / 2;

  var coinCenterX = cX + cSize / 2;
  var coinCenterY = cY + cSize / 2;

  var bulletCenterX = bX + bSize / 2;
  var bulletCenterY = bY + bSize / 2;

  var bombCenterX = sX + sSize / 2;
  var bombCenterY = sY + sSize / 2;

  var regenCenterX = rX + rSize / 2;
  var regenCenterY = rY + rSize / 2;

  var distC = dist(playerCenterX, playerCenterY, coinCenterX, coinCenterY);
  var distB = dist(playerCenterX, playerCenterY, bulletCenterX, bulletCenterY);
  var distS = dist(playerCenterX, playerCenterY, bombCenterX, bombCenterY);
  var distR = dist(playerCenterX, playerCenterY, regenCenterX, regenCenterY);

  if (distC < (pSize + cSize) / 2)
  {
    score += 10;
    cX = random(0, width);
    cY = random(0, groundY - cSize);
  }

  if (distB < (pSize + bSize) / 2)
  {
    lives -= 1;
    bX = random(0, width);
    bY = random(0, groundY - bSize);
    bVx = 12 * (width / 900.0); 
  }

  if (distS < (pSize + sSize) / 2)
  {
    lives -= 2;
    sX = random(0, width);
    sY = 0;
    sVy = 2 * (height / 700.0); 
  }

  if (lives < 2 && distR < (pSize + rSize) / 2)
  {
    lives += 4;
    rX = random(0, width);
    rY = random(0, groundY - rSize);
  }

  if (cX > width || cX < 0)
  {
    cVx *= -1;
  }

  if (cY > groundY - cSize / 2 || cY < 0)
  {
    cVy *= -1;
  }

  if (bX > width)
  {
    bX = 0;
    bY = random(0, groundY - bSize);
    bVx = 12 * (width / 900.0);
  }

  if (sY > groundY - sSize )
  {
    sX = random(0, width);
    sY = 0;
    sVy = 2 * (height / 700.0);
  }

  if (rX > width || rX < 0)
  {
    rVx *= -1;
  }

  if (rY > groundY - rSize / 2 || rY < 0)
  {
    rVy *= -1;
  }

  if (pX > width)
  {
    pX = 0;
  }

  if (pX < 0)
  {
    pX = width;
  }

  if (score > 140)
  {
    background(255);
    fill(0, 255, 0);
    textSize(width / 5.3);
    textAlign(CENTER);
    text("YOU WIN", width / 2, height / 2);
    if (keyCode == ENTER)
    {
      score = 0;
      lives = 7;
    }
  }

  if (lives < 1)
  {
    background(0);
    fill(255, 0, 0);
    textSize(width / 8);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
    if (keyCode == ENTER)
    {
      score = 0;
      lives = 7;
    }
  }
}

function keyPressed()
{  
    if (keyCode == UP_ARROW && pY >= groundY)
    {
      pVy = -15 * (height / 700.0);
    } else

    if (keyCode == LEFT_ARROW)
    {
      pVx = -12 * (width / 900.0);
    }else

    if (keyCode == RIGHT_ARROW)
    {
      pVx = 12 * (width / 900.0);
    }

    return false;
}
