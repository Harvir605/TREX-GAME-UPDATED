//
var PLAY = 1;
var END= 0;
var gameState=PLAY;

//
var scor=0;
var gameOver, gameOver_img, restart, restart_img;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudsImage;
var obstaclesGroup1, ob1,ob2,ob3,ob4,ob5,ob6;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudsImage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.5;
  
  restart=createSprite(300,140);
  restart.addImage(restart_img);
  restart.scale=0.5;
  
  gameOver.visible=false;
  restart.visible=false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = createGroup();
  score=0;
}

function draw() {
  background(180);
    text("score is" + score,500,50)

  if(gameState===PLAY){
     ground.velocityX = -(2 + 3*score/100);
        score = score+Math.round(getFrameRate()/60)
  if(keyDown("space" ) && trex.y>=161) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnClouds();
  spawnObstacles();
  if(obstaclesGroup.isTouching(trex)){
    gameState=END;
  }
  }
  else if(gameState===END){
     ground.velocityX = 0;
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }

  
  trex.collide(invisibleGround);
  
  //
  //console.log(trex.y);
  drawSprites();
}

function reset(){
gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,520,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudsImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1 ;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100);
    
    //generate random obstacles
      var rand = Math.round(random(1,6));
     switch (rand){
       case 1: obstacle.addImage(ob1)
         break
          case 2: obstacle.addImage(ob2)
         break
        case 3: obstacle.addImage(ob3)
       break
        case 4: obstacle.addImage(ob4)
       break
        case 5: obstacle.addImage(ob5)
       break
        case 6: obstacle.addImage(ob6)
       break
       
   }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}