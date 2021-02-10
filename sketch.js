
var person;
var bg,ground;
var doc,docImg;
var sick2, sick4, sick1, sick3;
var score=0;
var lives=2;
var gameState="start";
var chooseImg,chooseImg2;


function preload(){
  bg_Img=loadImage("corridor.png");
  playImg=loadImage("buttons/play.png")
  textImg=loadImage("buttons/text.png");
  resetImg=loadImage("buttons/reset.png")

  choseImg1=loadImage("doc2_1.png");
  choseImg2=loadImage("doc1.png")

  docImg1=loadAnimation("doc1.png")
  docImg=loadAnimation("doc1.png","doc2.png");
  doc2Img=loadAnimation("doc2_1.png");
  doc_ani=loadAnimation("doc2_1.png");

  sick2=loadImage("sick/sick2.png");
  sick3= loadImage("sick/sick 3.png");
  sick1 =loadImage("sick/sick1.png");
  sick4=loadImage("sick/sick4.png");

  vitImg=loadImage("vit.png");

  soapImg=loadImage("pointsImg/soap.png");
  maskImg=loadImage("pointsImg/mask.png");
  sanitizerImg=loadImage("pointsImg/sanitizer.png");
 
}

function setup() {
  createCanvas(1200,780);
  bg=createSprite(600,390,800,1200)
  bg.addImage(bg_Img);
  bg.scale=1.6;
  doc=createSprite(400,600,100,200);
  doc.scale=0.7;

  play=createSprite(600,390,100,100);
  play.addImage(playImg);
  text1=createSprite(600,200,40,40);
  text1.addImage(textImg);

  reset=createSprite(600,390,100,100);
  reset.addImage(resetImg);
  reset.visible=false;
  pointGroup=new Group();
  pointGroup2=new Group();
  sickGroup=new Group();
  sickGroup2=new Group();
  vitGroup=new Group();

  chooseImg=createSprite(300,400,100,100);
  chooseImg.addImage(choseImg1);
  chooseImg.scale=0.8;
  chooseImg2=createSprite(800,400,100,100);
  chooseImg2.addImage(choseImg2);

  chooseImg.visible=false;
  chooseImg2.visible=false;

  ground=createSprite(600,750,1200,10);
  ground.visible=false;
  doc.addAnimation("doctor",docImg);
  doc.addAnimation("doc",docImg1);

  doc.addAnimation("doctor2",doc_ani);
  doc.addAnimation("doc2",doc2Img);

  doc.setCollider("rectangle",0,0,180,400);
  edges=createEdgeSprites();

}
function draw() {
  background("#f8dc81");

  if(gameState==="start"){ 
      bg.visible=false;  
      doc.visible=false;

    if(mousePressedOver(play)){
        play.visible=false;
        text1.visible=false;
        chooseImg.visible=true;
        chooseImg2.visible=true;
      }
      if (mousePressedOver(chooseImg2)){
     //   doc.changeAnimation("doc",docImg);
        gameState="play";
        chooseImg.visible=false;
        chooseImg2.visible=false;
      }
      if (mousePressedOver(chooseImg)){
      //  doc.changeAnimation("doc",docImg);
        gameState="play2";
        chooseImg.visible=false;
        chooseImg2.visible=false;
      }
  }

 else if(gameState==="play" && lives>0){
  
     doc.changeAnimation("doctor",docImg);
  
     doc.visible=true;
     bg.visible=true;
    if(keyDown(RIGHT_ARROW) || doc.x===10 ){
        doc.x =doc.x+10 ;
      }
    if(keyDown(LEFT_ARROW)|| doc.x===1190){
     doc.x =doc.x-10 ;
    }
    if(keyDown(UP_ARROW) && doc.y>550 ){
      doc.velocityY =-20 ;
    }
    doc.velocityY= doc.velocityY +0.8;
     
    if(pointGroup.isTouching(doc)){
     score=score+1;
     pointGroup.destroyEach();
    }
    if(pointGroup2.isTouching(doc)){
      score=score+1;
      pointGroup2.destroyEach();
     }

    if( sickGroup.isTouching(doc)){
      lives=lives-1;
      console.log(lives);
      sickGroup.destroyEach();
    }

    if( sickGroup2.isTouching(doc)){
      lives=lives-1;
      console.log(lives);
      sickGroup2.destroyEach();
    }
    if(lives===0){
      gameState="end";
      doc.changeAnimation("doc",docImg1);
    }
    sickPerson2();
    sickPerson();
    points();
    points2();
    powerups();
    console.log(gameState);
  }

  else if(gameState==="play2" && lives>0){
    doc.visible=true;
    bg.visible=true;
    doc.changeAnimation("doctor2",doc_ani);
    doc.scale=0.8;

   if(keyDown(RIGHT_ARROW) || doc.x===10 ){
       doc.x =doc.x+10 ;
     }
   if(keyDown(LEFT_ARROW)|| doc.x===1190){
    doc.x =doc.x-10 ;
   }
   if(keyDown(UP_ARROW) && doc.y>550 ){
     doc.velocityY =-20 ;
   }
   doc.velocityY= doc.velocityY +0.8;
    
   if(pointGroup.isTouching(doc)){
    score=score+1;
    pointGroup.destroyEach();
   }
   if(pointGroup2.isTouching(doc)){
     score=score+1;
     pointGroup2.destroyEach();
    }

   if( sickGroup.isTouching(doc)){
     lives=lives-1;
     console.log(lives);
     sickGroup.destroyEach();
   }

   if( sickGroup2.isTouching(doc)){
     lives=lives-1;
     console.log(lives);
     sickGroup2.destroyEach();
   }
   if(lives===0){
     gameState="end";
     doc.changeAnimation("doc2",doc2Img);
   }
   sickPerson2();
   sickPerson();
   points();
   points2();
   powerups();
   console.log(gameState);
 }

  else if(gameState==="end"){
     sickGroup.setVelocityYEach(0);
     sickGroup2.setVelocityYEach(0);
     pointGroup.setVelocityYEach(0);
     pointGroup2.setVelocityYEach(0);
     sickGroup.setLifetimeEach(-1);
     sickGroup2.setLifetimeEach(-1);
     pointGroup.setLifetimeEach(-1);
     pointGroup2.setLifetimeEach(-1);

     console.log("end");

     reset.visible=true;

  }

  drawSprites();
  doc.collide(ground);
}

function sickPerson(){
  if(frameCount%200===0){
     sick_person=createSprite(Math.round(random(100,600)),-10,30,30);
    
      var rand=Math.round(random(1,4));
      switch(rand){
        case 1: sick_person.addImage(sick1);
        break;
        case 2:  sick_person.addImage(sick2);
        break;
        case 3:  sick_person.addImage(sick3);
        break;
        case 4:  sick_person.addImage(sick4);
        break;
        default :break;
      }

      sick_person.velocityY=9;
      sick_person.scale=0.5;
      sick_person.lifetime=150;
      sickGroup.add(sick_person);
  }
}

function sickPerson2(){
  if(frameCount%130===0){
     sick_person2=createSprite(Math.round(random(600,1100)),-10,30,30);
    
      var rand=Math.round(random(1,4));
      switch(rand){
        case 1: sick_person2.addImage(sick1);
        break;
        case 2:  sick_person2.addImage(sick2);
        break;
        case 3:  sick_person2.addImage(sick3);
        break;
        case 4:  sick_person2.addImage(sick4);
        break;
        default :break;
      }

      sick_person2.velocityY=9;
      sick_person2.scale=0.5;
      sick_person2.lifetime=150;
      sickGroup2.add(sick_person2);
  }
}

function points(){
  
  if(frameCount%85===0){
     pointSprite=createSprite(Math.round(random(100,1100)),-100,30,30);
     var rand=Math.round(random(1,3));
     switch(rand){
       case 1: pointSprite.addImage(soapImg);
               pointSprite.scale=0.4;
               pointSprite.setCollider("rectangle",0,0,100,100)
       break;
       case 2: pointSprite.addImage(sanitizerImg);
               pointSprite.setCollider("rectangle",0,0,200,200)
               pointSprite.scale=0.3;
       break;
       case 3: pointSprite.addImage(maskImg);
               pointSprite.setCollider("rectangle",0,0,50,100);
               pointSprite.scale=0.3;
       break;
       default :break;
     }
    pointSprite.velocityY=11;
    pointSprite.debug=true;
 //   pointSprite.scale=0.5;
    pointSprite.lifetime=150;
    pointGroup.add(pointSprite);

    }
}

function points2(){
  
  if(frameCount%210===0){
     pointSprite2=createSprite(Math.round(random(100,1100)),-100,30,30);
     var rand=Math.round(random(1,3));
     switch(rand){
       case 1: pointSprite2.addImage(soapImg);
               pointSprite2.scale=0.4;
               pointSprite2.setCollider("rectangle",0,0,100,100)
       break;
       case 2: pointSprite2.addImage(sanitizerImg);
               pointSprite2.setCollider("rectangle",0,0,200,200)
               pointSprite2.scale=0.3;
       break;
       case 3: pointSprite2.addImage(maskImg);
               pointSprite2.setCollider("rectangle",0,0,50,100);
               pointSprite2.scale=0.3;
       break;
       default :break;
     }
    pointSprite2.velocityY=11;
    pointSprite2.debug=true;
 //   pointSprite.scale=0.5;
    pointSprite2.lifetime=150;
    pointGroup2.add(pointSprite2);

    }
}

function powerups(){
  
  if(frameCount%180===0){
    vit=createSprite(Math.round(random(100,1100)),random(100,600),30,30);
    vit.debug=true;
    vit.addImage(vitImg);
    vit.scale=0.5;
    vit.lifetime=50;
    vitGroup.add(vit);
    }
}
function reset(){

  
}

  


