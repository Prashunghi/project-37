var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var Play=1;
var End=0;
var gameState=Play;
var gameOver,gameOver_image;
var restart,restart_image;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOver_image=loadImage("gameOver.png");
  restart_image=loadImage("restart.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    score = 0;
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2;
 
  
  invisibleGround = createSprite(width/2, height-10,width,125);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  

  
  gameOver=createSprite(width/2,height/2 - 50);
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.5;
  gameOver.visible=false;
  restart=createSprite(width/2,height/2);
  restart.addImage(restart_image);
  restart.scale=0.5;
  restart.visible=false;
}

function draw() {
  background(180);

  if(gameState===Play){
   if((touches.length>0 || keyDown("space")) && trex.y >= height - 120) {
    trex.velocityY = -10;
    touches = [];
  }
   ground.velocityX = -(6+3*score/100);
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
     score = score + Math.round(getFrameRate()/60);
     spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
       gameState=End;
    }
  }
  else if(gameState===End){
  ground.velocityX=0;
    
  trex.veloxityY=0;
   trex.changeAnimation( "collided",trex_collided); 
    gameOver.visible=true;
    restart.visible=true;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(touches.length>0 || keyDown("space")){
      reset();
      touches = []
    }
    if(mousePressedOver(restart)){
      reset();
       }
  }
  text("Score: "+ score, 500,50);
  
 

  trex.collide(invisibleGround);
 
  drawSprites();
}
function reset(){
  gameState=Play;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score=0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}