var Background;
var player;
var invisibleWall, invisibleWall2;
var score = 0;
var coins_no = 0;
var flags_no = 0;
var gameState = "start";

function preload(){
  
  BackgroundImage = loadImage("Background 4.jpeg")
  CircleImage = loadImage("Circle.png");
  RectBlue = loadImage("RectBlue.jpeg");
  RectBlue.scale = 0.1;
  RectGreen = loadImage("RectGreen.jpeg");
  RectGreen.scale = 0.1;
  RectPink = loadImage("RectPink.jpeg");
  RectPink.scale = 0.1;
  Gold_1 = loadImage("Gold coin.png");
  StartImg = loadImage("Start Image.png");
  FlowerImg1 = loadImage("Flower 1.png");
  GameOverImg = loadImage("GameOver.jpg");
  FlagImg = loadImage("Flag 1.png");
}

function setup() {
  createCanvas(450,500);
  Background = createSprite(225,225,450,450);
  Background.addImage(BackgroundImage);
  Background.scale = 0.39;
  Background.velocityY = 4;
  
  player = createSprite(225,250,30,30);
  player.addImage(CircleImage);
  player.scale = 0.1;
  
  Start = createSprite(225,250,50,50);
  Start.addImage(StartImg);
  Start.scale = 0.37;

  Wall = createSprite(226,475,450,50);
  Wall.visible = false;
  
  Flower_1 = createSprite(55,55,50,50);
  Flower_1.addImage(FlowerImg1);
  Flower_1.scale = 0.1;
  
  Flower_2 = createSprite(395,55,50,50);
  Flower_2.addImage(FlowerImg1);
  Flower_2.scale = 0.1;
  
  GAMEOVER = createSprite(225,190,450,430);
  GAMEOVER.addImage(GameOverImg);

  obstaclesGroup = createGroup();
  coinGroup = createGroup();
  flagGroup = createGroup();
}

function draw() {
  
  edges = createEdgeSprites();
  
  if(gameState === "start"){
    background(179, 86, 219);
    Start.visible = true;
    Background.visible = false;
    Flower_1.visible = true;
    Flower_2.visible = true;
    GAMEOVER.visible = false;
    player.visible = false;
    player.x = 225;
    player.y = 250;
    if(mousePressedOver(Start)){
      gameState = "play";
    }
  }
  camera.position.x = player.x;
  camera.position.y = player.y;
  
if(gameState === "play"){
 if (Background.y > 450){
   Background.y = Background.height/8;
 }
  Background.visible = true;
  Start.visible = false
  player.visible = true
  Flower_1.visible = false;
  Flower_2.visible = false;
  GAMEOVER.visible = false
  if(keyWentDown("RIGHT_ARROW")){
    player.velocityX = 5;
  }
  
  if(keyWentUp("RIGHT_ARROW")){
    player.velocityX = 0;
  }
  
  if(keyWentDown("LEFT_ARROW")){
    player.velocityX = -5;
  }
  
  if(keyWentUp("LEFT_ARROW")){
    player.velocityX = 0;
  }
  
  if(keyWentDown("UP_ARROW")){
    player.velocityY = -5;
  }
  
  if(keyWentUp("UP_ARROW")){
    player.velocityY = 0;
  }
  
  if(keyWentDown("DOWN_ARROW")){
    player.velocityY = 5;
  }
  
  if(keyWentUp("DOWN_ARROW")){
    player.velocityY = 0;
  }
  Coins();
  Obstacles();
  Flags();
  score = score + Math.round(getFrameRate()/60);
  if(player.isTouching(obstaclesGroup)){
    gameState = "end";
    }
  if(player.isTouching(coinGroup)){
     coinGroup.destroyEach();
     coins_no = coins_no + 1;
  }
  if(player.isTouching(flagGroup)){
    flagGroup.destroyEach();
    flags_no = flags_no + 1;
  }
}
  
  if(gameState === "end"){
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();
    flagGroup.destroyEach();
    player.visible = false
    Background.visible = false;
    background("black");
    GAMEOVER.visible = true
    player.x = 225;
    player.y = 250;
    
    stroke(236, 102, 110);
    fill(236, 102, 110);
    textSize(25);
    text("Press R to restart the GAME",68,415);
    if(keyDown("R")){
      reset()
    }
  }
  
  player.collide(Wall);
  player.bounceOff(edges);
  
  
  drawSprites();  
  
  stroke(153, 214, 247);
  fill(153, 214, 247);
  textSize(22);
  text("SCORE :"+score,35,475);
  
  stroke(249, 248, 67);
  fill(249, 248, 67);
  textSize(22);
  text("COINS :"+coins_no,180,475);
  
  stroke(234, 72, 72);
  fill(234, 72, 72);
  textSize(22);
  text("FLAGS :"+flags_no,310,475);
}

function Obstacles(){
  if(frameCount % 50 === 0){
    var randObstacle = Math.round(random(1,2));
      switch (randObstacle){
        case 1: obstacle = createSprite(116,0,190,30)
          break;
        case 2: obstacle =createSprite(330,0,190,30);
          break;
      }
    var randObstacleImg = Math.round(random(1,3));
      switch (randObstacleImg){
        case 1: obstacle.addImage(RectBlue);
          break;
        case 2: obstacle.addImage(RectGreen);
          break;
        case 3: obstacle.addImage(RectPink);
      }
    obstacle.velocityY = 3;
    obstacle.lifetime = 150;
    player.depth = obstacle.depth + 1;
    obstaclesGroup.add(obstacle);
    //obstacle.debug = true;
  }
}

function Coins(){
  if(frameCount % 120 === 0){
   Coin = createSprite(200,0,30,30);
   Coin.x = Math.round(random(130,300));
   Coin.addImage(Gold_1);
   Coin.scale = 0.07;
   Coin.velocityY = 6;
   Coin.lifetime = 75;
   //Coin.debug = true;
   coinGroup.add(Coin);
   Coin.setCollider("circle",0,0,355);
  }
}

function Flags(){
  if(frameCount % 100 === 0){
  Flag = createSprite(200,0,30,30);
  Flag.x = Math.round(random(130,200));
  Flag.addImage(FlagImg);
  Flag.velocityY = 6;
  Flag.lifetime = 75;
  //Flag.debug = true;
  Flag.scale = 0.07;
  flagGroup.add(Flag);
  Flag.setCollider("rectangle",0,0,650,650);
  }
}

function reset(){
  gameState = "start";
  score = 0;
  coins_no = 0;
  flags_no = 0;
}