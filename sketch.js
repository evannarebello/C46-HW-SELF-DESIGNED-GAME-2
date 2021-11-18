var bg,bgImg;
var runner,runner_jumping,runner_running_right
var platform,platformImg
var laser,laserImg,lasersGroup;
var gameState = "play"
var platformsGroup;
var invisibleGround;
var coin,coinImg
var coinsGroup;
var score

function preload(){
 bgImg = loadImage("assets/bgI.png")
 runner_running_right = loadAnimation("assets/chr1.png","assets/chr2.png","assets/chr3.png","assets/chr4.png")
 runner_jumping = loadImage("assets/chr2.png")
 platformImg = loadImage("assets/platform.png")
 coinImg = loadAnimation("assets/coin1.png","assets/coin2.png","assets/coin3.png","assets/coin4.png","assets/coin5.png","assets/coin6.png")
 laserImg = loadImage("assets/laser2.png")
}

function setup(){
 createCanvas(800,500)

 bg = createSprite(400,250,800,500)
 bg.addImage("bg",bgImg)
 bg.scale = 0.6

 runner = createSprite(80,470,60,60)
 runner.addAnimation("runningRight",runner_running_right)
 runner.scale = 0.4
 runner.debug = true 
 runner.setCollider('rectangle',0,0,200,runner.height)

 

 invisibleGround = createSprite(20,480,1600,20)
 invisibleGround.visible = false
 
    
 /*platform = createSprite(80,350,60,60)
 platform.addImage("platform",platformImg)
 platform.scale = 0.6*/


 
 /*laser = createSprite(400,250,60,60)
 laser.addImage("laser",laserImg)
 laser.scale = 0.1*/
 
  platformsGroup = new Group()
  coinsGroup = new Group()
  lasersGroup = new Group()

 


}
function draw(){
 background(0)
 



 
 
  if(gameState==="play"){
    bg.velocityX = -2

    if(keyDown("space")){
      runner.velocityY = -10
    }
    runner.velocityY+=0.8 


    if(keyDown("right")){
      runner.x +=5
    }
    
    if(coinsGroup.isTouching(runner)){
      score +=1
    
    }

    text()
    drawSprites();
                                       
    if (bg.x < 200){
      bg.x = 800;
    }
   
    if(platformsGroup.isTouching(runner)){
      runner.velocityY = 0
      runner.collide(platformsGroup)
    }
    
    spawnCoins()
    spawnPlatforms()
  }
  


  runner.collide(invisibleGround)
  
  
  
 
}

function spawnPlatforms(){
  if(frameCount%100===0){
    platform = createSprite(800,350,60,60)
    //platform.y = Math.round(random(200,350))
    platform.addImage("platform",platformImg)
    platform.scale = 0.6
    platform.velocityX = -2
    platform.debug = true
    platform.setCollider('rectangle',0,0,80,40)

    platform.lifetime = 400

    runner.depth = platform.depth
    runner.depth+=1

    platformsGroup.add(platform)
  }
}

function spawnCoins(){
   if(frameCount%200===0){
   coin = createSprite(Math.round(random(200,600)),Math.round(random(200,340 )),40,40)
   //coin = createSprite(platform.height,platform.height,40,40)
   coin.addAnimation("coin",coinImg)
   coin.scale = 0.15
   coin.velocityX = -2
   coin.lifetime = 400

   coinsGroup.add(coin)
  }
}

