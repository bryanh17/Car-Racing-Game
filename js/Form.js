class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.button2 = createButton('Reset');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
    this.button2.position(50,50);
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 250, 0);
    this.title.style('fontSize','500%')

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.input.style('width','200px');
    this.input.style('height','30px');
    this.input.style('fontSize','150%')
    this.button.position(displayWidth/2 + 10, displayHeight/2);
    this.button.style('background-color', 'green')
    this.button.style('color','white');
    this.button.style('width','100px');
    this.button.style('height','30px');
    this.button.style('border-radius','30px');
    this.button.style('fontSize','20px');

    this.button2.position(displayWidth/2 + 25, displayHeight/2+50);
    this.button2.style('background-color','green');
    this.button2.style('color','white');
    this.button2.style('border-radius','30px');
    this.button2.style('width','70px');
    this.button2.style('height','20px');
    this.button2.style('fontSize','15px');


    this.button2.mousePressed(()=>{
      database.ref('/').update({
        gameState:0,
        playerCount:0,
        players:null,
        finishedPlayers:0
      })
    })



2
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 80, displayHeight/4);
      this.greeting.style('fontSize','40px');
      this.greeting.style('color','white');


    });

  }
}
