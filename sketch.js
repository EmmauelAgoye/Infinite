var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  //  var message = "This is a message";
  //   console.log(message)
     trex = createSprite(50,180,20,50);
      trex.addAnimation("running", trex_running);
       trex.addAnimation("collided", trex_collided);
        trex.scale = 0.7;
         ground = createSprite(200,displayHeight*0.5,400,20);
          ground.addImage("ground",groundImage);
           ground.x = ground.width /2;
            gameOver = createSprite(displayWidth-890,displayHeight*0.32);
             gameOver.addImage(gameOverImg);
              restart = createSprite(displayWidth-890,displayHeight*0.40);
               restart.addImage(restartImg);
                gameOver.scale = 0.7;
                 restart.scale = 0.7;
                  invisibleGround = createSprite(200,displayHeight*0.52,400,10);
                   invisibleGround.visible = false;
                    //create Obstacle and Cloud Groups obstaclesGroup = createGroup();
                     cloudsGroup = createGroup();
                     obstaclesGroup = createGroup();
                      trex.setCollider("rectangle",0,0,trex.width,trex.height);
                       trex.debug = false;
}
                       
function draw() {
  //trex.debug = true;
  background("blue");
  text("Score: "+ score,displayWidth-850,displayHeight*0.05); 
  if(gameState === PLAY){ 
    gameOver.visible = false; 
    restart.visible = false; 
    ground.velocityX = -(4 + 3* score/100)
     //scoring score = score + Math.round(getFrameRate()/60);
      if(score>0 && score%100 === 0){ 
        checkPointSound.play()
       } 
       if (ground.x < 0){ 
         ground.x = ground.width/2;
       }
  
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    // if(obstaclesGroup.isTouching(trex)){
    //     gameState = END;
    // }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  trex.collide(invisibleGround);

    if(mousePressedOver(restart)) {
      reset();
    }
  
  
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) { 
   var cloud = createSprite(displayWidth-100,displayHeight*0.80,40,10);
    cloud.y = Math.round(random(80,120));
  //write code here to spawn the clouds
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
  if (frameCount % 60 === 0){ 
    var obstacle = createSprite(displayWidth-100,displayHeight*0.48,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
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

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
}

