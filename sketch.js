var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaimg; 
var FoodGroup ;
var score;
var obstacle , obstacleImg;
var enemyGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg=loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup=new group();
  enemyGroup=new group();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  spawnBananas();
  spawnObstacles();

  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  fill('white');
  stroke('black');
  text('Score:' + score , 400 , 200);

  if (FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score+=2;
    player.scale+=0.1;

  }

  if (enemyGroup.isTouching(player)){
    player.scale-=0.2;
    score-=1;
  }
 
  if (score===20){
    gameState=0;
    textSize(40);
    fill('black');
    stroke('pink');
    text('GAME OVER' , 400 ,200);
    player.visiblity=false
    backgr.velocity=0;
    FoodGroup.destroyEach();
    enemyGroup.destroyEach();

  }
    drawSprites();
}

function spawnBananas(){
if (frameCount%80===0){
  var banana =createSprite(200 , 300 , 10,20);
  banana.y=random(120 , 200 );
  banana.addImage('banan' , bananaimg);
  banana.scale=0.05;
  banana.velocityX=-4;
  
  banana.lifetime=300;
  banana.depth=player.depth-1;
  FoodGroup.add(banana);
 } 
}

function spawnObstacles(){
  if (frameCount%80===0){
    var obstacle=createSprite(200 , 120 , 10 , 20);
    obstacle.y=random(120 ,200);
    obstacle.addImage('obsta' , obstacleImg);
    obstacle.scale=0.05;
    obstacle.velocityX=-4;

    obstacle.lifetime=300;
    obstacle.depth=player.depth-1;
    enemyGroup.add(obstacle);
  }
  

}