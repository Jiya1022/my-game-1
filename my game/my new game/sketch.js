var score = 0;
var rocket, rock, bullet, backround;

var rockImg, bulletImg, blastImg, backroundImg, rocketImg;

var rockGroup;

var life = 3;
var score = 0;
var gameState = 1

function preload() {
  rocketImg = loadImage("rocket.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  rockImg = loadImage("rock1.png")
  backroundImg = loadImage("backround.png")
}

function setup() {
  createCanvas(800, 600);

  rocket = createSprite(100, height / 2, 50, 50);
  rocket.addImage(rocketImg)
  rocket.scale = 0.5

  bulletGroup = createGroup();
  rockGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background(backroundImg);

  heading.html("Life: " + life)
  heading.style('color:white');
  heading.position(150, 20)

  scoreboard.html("Score: " + score)
  scoreboard.style('color:white');
  scoreboard.position(width - 200, 20)

  if (gameState === 1) {
    rocket.y = mouseY

    if (frameCount % 50 === 0) {
      drawrock();
    }

    if (keyDown("space")) {
      shootBullet();
    }


    if (rockGroup.collide(rocket)) {
      handleGameover(rockGroup);
    }

    if (rockGroup.collide(bulletGroup)) {
      handleRockCollision(rockGroup);
    }

    drawSprites();
  }

  if(gameState === 2){
     text("GameOver", 200, 200)
  }


}

function drawrock() {
  rock = createSprite(800, random(20, 780), 40, 40);
  rock.addImage(rockImg);
  rock.scale = 0.1;
  rock.velocityX = -8;
  rock.lifetime = 400;
  rockGroup.add(rock);
}


function shootBullet() {
  bullet = createSprite(150, width / 2, 50, 20)
  bullet.y = rocket.y - 20
  bullet.addImage(bulletImg)
  bullet.scale = 0.10
  bullet.velocityX = 7
  bulletGroup.add(bullet)
}

function handleRockCollision(rockGroup) {
  if (life > 0) {
    score = score + 1;
  }

  blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.1
  blast.life = 20
  bulletGroup.destroyEach()
}

function handleGameover(rockGroup) {
  life = life - 1;
  rockGroup.destroyEach();
  if (life === 0) {
    gameState = 2
  }
}
