var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var sTime=0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 300);

  monkey = createSprite(100,250,20,50);
  monkey.addAnimation("running", monkey_running);
  

  monkey.scale = 0.1;
  
  ground = createSprite(300,290,1200,20);
  ground.velocityX=-3;
  ground.shapeColor="darkgreen";
  //ground.addImage("ground",groundImage);
  obstacleGroup=new Group();
  FoodGroup=new Group();
  
  score = 0;
}


function draw() {
  background("skyblue");
  
  stroke(0);
  textSize(20);
  fill(0);
  text("Score: " + score, 500, 50);
  
  sTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: " + sTime, 50, 50);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
  if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+1;
    }
  
  monkey.collide(ground);
  spawnObstacles();
  spawnBananas();
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,265,10,40);
   obstacle.velocityX = -3;
   
      obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}







