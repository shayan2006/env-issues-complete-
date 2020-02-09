var gamestate = "marine"
var b1,b2,b3,b4,b5,b6,b7,b8;
var hunter,b12;
var bird,h1,egdes,bullet,bulletShoot = true;
var birdDie;
var bsound,bgsound;
var score = 0;
var bg,bgimg;
var f1,f2,f3,f4,f5,f6,fishGroup,fishfish
var elephant,monkey,monkey2,woodCutter;
var fire1,fire2,fireGroup;
var wood1,woodGroup
var burning;
var waves;
var cuttingT;
var sadSound;
var birdC;

function preload(){
  fishfish=loadImage("imageedit_1_6707533500.png")
 b1 =loadAnimation("imageedit_1_3094278262.png",
 "imageedit_1_8267895522.png",
 "imageedit_2_5400486280.png",
 "imageedit_2_7878072299.png",
 "imageedit_2_8848784644.png",
 "imageedit_2_9161853774.png",
 "imageedit_3_3245469046.png",
 "imageedit_4_8259477976.png");
 h1 =loadImage("imageedit_1_4929864270.png");
 b12 = loadImage("bullet.png")
fire1=loadAnimation("f1.png","f2.png")
wood1=loadImage("imageedit_1_4853727134.png")

 birdDie = loadImage("imageedit_4_8259477976.png");
 bsound = loadSound("gun-gunshot-01.mp3");
 waves = loadSound("SEASHORE.mp3");
 cuttingT = loadSound("cutting trees.mp3");
 burning = loadSound("Fire_Burning-JaBa-810606813.mp3");
 sadSound = loadSound("Sad_Emotional_Flute_Instrumental_Ringtone_😢_Downl.mp3");
 bgsound = loadSound("salamisound-1755562-birds-chirping-songbirds-in.mp3");
 birdC = loadSound("bird chirp 3t.mp3");
 f1 = loadImage("fish 1.jpeg");
 f2 = loadImage("fish 2.jpeg");
 f3 = loadImage("fish 3.jpeg");
 f4 = loadImage("fish 4.jpeg");
 f5 = loadImage("fish 5.jpeg");
 f6 = loadImage("fish 6.jpeg");
 elephant = loadImage("sad elphant.jpeg");
 monkey = loadImage("sad monkey.jpeg");
 monkey2 = loadImage("sad monkey 2.jpeg");
 woodCutter = loadImage("wood cutter.jpeg");
 bgimg=loadImage("forest run.jpg")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  fishGroup=createGroup();
  woodGroup=createGroup();
  fireGroup=createGroup();
 bird = createSprite(width-20, 200, 50, 50);
 bird.addAnimation("bb1",b1);

  bird.scale = 0.5;
  //bird.debug = true;
 hunter = createSprite(width-50,height-50,50,50);
 hunter.addImage("h11",h1);
 hunter.visible=false;
 hunter.scale=0.2
 hunter.velocityX = -10;
  //hunter.debug = true;
 bullet = createSprite(400,350,10,10);
 bullet.addImage("b13",b12);
  //bullet.debug = true;
bullet.setCollider("rectangle",0,0,10,10);
bullet.visible=false
  edges = createEdgeSprites()
 
}

function draw() {
  background(bgimg);
   bird.collide(edges)
   if(keyDown("left"))
   {
     bird.velocityX=-3
     
   }
   if(keyDown("right"))
   {
     bird.velocityX=3;
   }
    //hunter.scale = 0.2;
    if(gamestate === "marine")
    {
        waves.play();
        bg = "polluted water.jpeg";
        bgimg = loadImage(bg);
        marineLife();
        if((gamestate === "marine") &&frameCount===200)
        {
          gamestate = "deforestation"
          bg ="deforestated jungle.jpeg"
          bgimg=loadImage(bg)
          fishGroup.setVisibleEach(false)
          bird.visible=true
          frameCount=0;
        }
  }


  if(gamestate === "deforestation"){
    waves.stop();
     cuttingT.play();
    if(frameCount%20===0)
    {
      woods=createSprite(random(50,800),390,10,10)
      woods.addImage("w1111",wood1)
      woods.scale=0.5
      woods.velocityY=-10
      woodGroup.add(woods)
      if(woodGroup.isTouching(bird))
      {
        birdC.play();
        gamestate="end"
      }
    }

    if(frameCount===200)
    {
      gamestate="junglefire"
      bg ="jungle fire.jpg"
      frameCount=0;
      bgimg=loadImage(bg)
      woodGroup.setVisibleEach(false)
    }
  }


  if(gamestate === "junglefire"){
    cuttingT.stop();
    burning.play();

    if(frameCount%20===0)
    {
      fire2=createSprite(random(50,800),390,10,10)
      fire2.addAnimation("a111",fire1)
      fire2.velocityY=-10
      fireGroup.add(fire2)
      if(fireGroup.isTouching(bird))
      {
        birdC.play();
        gamestate="end"
      }
    }
    if(frameCount===200)
    {
      gamestate="hunterstate"
      fireGroup.setVisibleEach(false)
      bg="forest run.jpg"
      bgimg=loadImage(bg)

    }

  }

  if(gamestate==="hunterstate")
  { 
    burning.stop();
    bgsound.play();
    hunter.visible=true
    bullet.visible=true
   // score = frameCount/6
    bullet.x = hunter.x;
    bullet.velocityY = Math.round(random(-5,-10));
    if(hunter.x < 50){
      hunter.velocityX = 10;
    }
    if(hunter.x > 750){
      hunter.velocityX = -10;
    }
   if(keyDown("left")){
     bird.velocityX = -4;
   }
   if(keyDown("right")){
     bird.velocityX = 4;
   }
   bird.collide(edges);
     
   if(bullet.y <0){
     bullet.x = hunter.x;
     bullet.y = 350;
     bullet.velocityY = 0;
     //bulletShoot = true;
   }
   if(bullet.isTouching(bird)){
     bird.addImage("bb1",birdDie);
     bird.velocityY = bird.velocityY + 1;
     bgsound.stop();
     birdC.play();
     sadSound.play();
   }

  }
   if(gamestate==="end")
   {
    bird.addImage("bb1",birdDie);
    bird.velocityY = bird.velocityY + 1;
    bird.velocityX=0;

   }
  drawSprites();
}
function keyPressed(){
 if(keyCode === 32 ){
 bird.velocityY = -2;
  bird.velocityX = -2;  
  }
  
}
function keyReleased(){
 if(keyCode === 32){
  bird.velocityY = bird.velocityY + 1;
 }
}
function marineLife(){
  if(frameCount%60 === 0){
    var r1 = Math.round(random(1,6))
    var fish = createSprite(width,height-random(50,100),10,10)
    fish.velocityX=-10
    fish.scale=0.5
    fish.addImage("fish1",fishfish)
    fishGroup.add(fish)
  }
}
