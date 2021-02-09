var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var finishedPlayers;

var rankImg;

var car1Img, car2Img, car3Img, car4Img;

var GM,SM,BM;

var trackImg;

var formImg;

var finish = false;

var cars, car1, car2, car3, car4;

function preload(){
  
  car1Img = loadImage("images/car1.png");
  car2Img = loadImage("images/car2.png");
  car3Img = loadImage("images/car3.png");
  car4Img = loadImage("images/car4.png");

  trackImg = loadImage("images/track.jpg");
  formImg = loadImage("images/bg.png");

  GM = loadImage("images/GM.png");
  SM = loadImage("images/SM.png");
  BM = loadImage("images/BM.png");

  rankImg = loadImage("images/rankBG.jpg");

}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (finishedPlayers===4){
    game.update(2);
  }
  if (gameState===2){
    background(rankImg);
    endElement = createElement('h1');
    endElement.html("Game Over");
    endElement.position(displayWidth/2-50,10);
    game.end();
  }
}
