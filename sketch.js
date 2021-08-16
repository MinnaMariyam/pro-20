var forest,forestImage,grassWayImage,grassWay;
var girl,girlFell;
var girlImage,girlFellImage;
var boy,boyJump,boyFell;
var boyImage,boyJumpImage,boyFellImage;
var obstacle1,obstacle2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup;
var score;
var gameOverImage,restartImage;
var gameOver,restart;
var jumpSound;
var bloodImage,blood;
var bulletImage,bullet;



function preload(){
forestImage = loadImage("background.png");
girlImage = loadAnimation("girl running.png","girl running 2.png","girl running 3.png","girl running 4.png","girl running 5.png","girl running 6.png")
boyImage = loadAnimation("boy running.png","boy running 2.png","boy running 3.png","boy running 4.png","boy running 5.png","boy running 6.png")
grassWayImage = loadImage("grass.png");
obstacle1 = loadImage("snake.png");
obstacle2 = loadImage("stone.png");
girlFellImage = loadImage("girl fell down.png");
boyFellImage = loadImage("boy fell.png");
gameOverImage = loadImage("gameover.png");
restartImage = loadImage("restart.png");
boyJumpImage = loadImage("boy jumping.png");
jumpSound = loadSound("jump.mp3");
bulletImage = loadImage("bullet.png");
bloodImage = loadImage("blood.png");

}

function setup() {

createCanvas(600,600);
forest = createSprite(300,300);
forest.addImage(forestImage);
forest.scale = 3.35;
forest.velocityX = -5;


girl = createSprite(300,410);
girl.addAnimation("running",girlImage);
girl.addAnimation("fellDown",girlFellImage)
girl.scale = 0.8;

bullet = createSprite(150,410);
bullet.addImage(bulletImage);
bullet.scale = 0.2;
bullet.visible = false;

blood = createSprite(300,480);
blood.addImage(bloodImage);
blood.scale = 0.2;
blood.visible = false;



boy = createSprite(100,410);
boy.addAnimation("run",boyImage);
boy.addAnimation("jump",boyJumpImage);
 boy.scale = 2.3;

 
 girl.setCollider("circle",-30,20,48);
  
 gameOver = createSprite(300,200);
 gameOver.addImage(gameOverImage);
 gameOver.visible = false;

 restart = createSprite(300,250);
 restart.addImage(restartImage);
 restart.scale = 0.09;
 restart.visible = false;


invisibleforest = createSprite(600,490,1200,20);

obstaclesGroup = createGroup();

score = 0;



}

function draw() {
 background("white");


 
 if(gameState === PLAY){
    if(forest.x < 0){
        forest.x = width/2
     }

    

     score = score + Math.round(getFrameRate()/60);

     if(keyDown("space") && girl.y >= 362) {
         
        girl.velocityY = -12;

        jumpSound.play();

        
       
    }
    girl.velocityY = girl.velocityY + 0.5;

    
    
     obstacles();

     if(obstaclesGroup.isTouching(girl)){
       gameState = END;
     }

     

 }

 if(gameState === END){
  
  gameOver.visible = true;
  restart.visible = true;
  bullet.visible = true;
  bullet.velocityX = 5;

  if(bullet.isTouching(girl)){
    blood.visible = true;
    
    boy.velocityX = 8;
  }

  forest.velocityX = 0;

  girl.changeAnimation("fellDown",girlFellImage);
  girl.setCollider("circle",0,20,48);

  obstaclesGroup.setVelocityXEach(0);

  if(mousePressedOver(restart)){
   
    reset();
  
  }

  
  

  

  
  // boy.x = 200;
  // boy.changeAnimation("jump",boyJumpImage)
 
  
  

 }

 if(obstaclesGroup.isTouching(boy)){

   boy.velocityY = -12;
   jumpSound.play();
 }
 boy.velocityY = boy.velocityY + 0.5;


 boy.collide(invisibleforest);
 girl.collide(invisibleforest);

 

 drawSprites(); 
 
 
 text("Score: "+ score, 500,200);

 
}

function obstacles(){
    if (frameCount % 100 === 0){
        var obstacle = createSprite(405,470,100,100);
        obstacle.shapeColor = "#331100";
        obstacle.velocityX = -5;

         //generate random obstacles
         var rand = Math.round(random(1,6));
         switch(rand) {
           case 1: obstacle.addImage(obstacle1);
           obstacle.velocityX = -5;
           obstacle.setCollider("circle",-10,0,100);
                   break;
           case 2: obstacle.addImage(obstacle2);
           obstacle.velocityX = -5;
           obstacle.setCollider("circle",80,-40,100);
                break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         obstacle.scale = 0.3;
        //  obstacle.lifetime = 300;
        
        //add each obstacle to the group
         obstaclesGroup.add(obstacle);
      }


}

function reset(){
  
  gameState = PLAY;

  
  forest.velocityX = -5;

  
  
  restart.visible = false;
  gameOver.visible = false;

  obstaclesGroup.destroyEach();

  boy.x = 100;
  boy.velocityX = 0; 
  
  girl.changeAnimation("running",girlImage);

  blood.visible = false;
 
  score = 0;
  
}
