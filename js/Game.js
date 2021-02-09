class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      background(formImg);
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("C1", car1Img);

    car2 = createSprite(300,200);
    car2.addImage("C2", car2Img);

    car3 = createSprite(500,200);
    car3.addImage("C3", car3Img);

    car4 = createSprite(700,200);
    car4.addImage("C4", car4Img);

    cars = [car1, car2, car3, car4];
    finish=false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("red");
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          fill("cyan");
          ellipse(x,y,60,60)
        }
       
        textSize(15);
        textAlign(CENTER);
        text(allPlayers[plr].name,x,y+70);
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && finish===false){
      player.distance +=10
      player.update();
    }
    if (player.distance>=5300&&finish===false){
      Player.updateFinishedPlayers();
      player.rank=finishedPlayers;
      player.update();
      finish=true;
    }

    drawSprites();
  }
  end(){
    camera.position.x=0
    camera.position.y=0;
    Player.getPlayerInfo();
    imageMode(CENTER);
    image(GM,0,-200,200,200);
    image(SM,-300,0,300,200);
    image(BM,300,0,200,200);
    textAlign(CENTER);
    textSize(25);
    fill('green');
    for(var i in allPlayers){
      if(allPlayers[i].rank===1){
        text("1st: "+allPlayers[i].name,0,-75);
      }
      else if(allPlayers[i].rank===2){
        text("2nd: "+allPlayers[i].name,-300,150);
      } else if(allPlayers[i].rank===3){
        text("3rd: "+allPlayers[i].name,300,150);
      } else{
        text("Honorable Mention: "+allPlayers[i].name,0,250);
      }
    }
  }
}
