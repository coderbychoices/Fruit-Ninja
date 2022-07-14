var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage;
var knifeSound;
var alien;
var alienImage;
var fruit1;
var fruit1Image;
var fruit2;
var fruit2Image;
var fruit3;
var fruit3Image;
var fruit4;
var fruit4Image;
var gameover;
var gameoverImage;
var gameoverSound;

function preload(){
  
  //loading the animations and images
  knifeImage = loadImage("knife.png");
  alienImage = loadAnimation("alien1.png","alien2.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");
  
  gameoverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwoosh.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  
  fruitGroup=createGroup();
  alienGroup=createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    aliens();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+1;
      gameoverSound.play()
    }
   else
     {
    // Go to end state if knife touching enemy
    if(alienGroup.isTouching(knife)){
      gameState=END;
      knifeSound.play( )
      
      fruitGroup.destroyEach();
      alienGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      alienGroup.setVelocityXEach(0);
      
 //change the position of sword to gameover and reset its position
      knife.addImage(gameoverImage);
      knife.x=200;
      knife.y=200;
    }
     }
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function aliens(){
  if(World.frameCount%200===0){
    alien=createSprite(600,200,20,20);
    alien.addAnimation("moving",alienImage);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-8;
    alien.setLifetime=50;
    alien.velocityX=-(8+(score/10));
    
    alienGroup.add(alien);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position=Math.round(random(1,2));
    fruit=createSprite(600,200,20,20);
    if(position==1){
      fruit.x=600;
      fruit.velocityX=-(5+(score/4));
    
    }
    else if(position==2){
      fruit.x=0;
      fruit.velocityX=(5+(score/4));
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r == 2) {
      fruit.addImage(fruit2Image);
    } else if (r == 3) {
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
