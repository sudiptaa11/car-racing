class Form{
    constructor(){
        //creating properties so it can be accessed anywhere in the code
        this.input = createInput("Name");
        this.button = createButton("Play");
        this.greeting = createElement("h3")
        this.title = createElement('h2');
        this.resetButton = createButton("Reset");
    }

    /* 
    "this" refers to the object which is calling the function
    mousePressed function should refer to the button element and not the object that is calling display()
    Arrow function: it ensures that "this" remians bound to the form object
    */
    
    //displaying the form by giving each element its position
    display(){

        this.title.html("Car Racing Game");
        this.title.position(displayWidth/2 - 70,10);

        this.input.position(displayWidth/2 - 40,displayHeight/2 - 50);

        this.button.position(displayWidth/2 - 40,displayHeight/2 - 10);

        this.resetButton.position(10,10);

        //Resetting the game
        this.resetButton.mousePressed(()=>{
            player.updateCount(0);
            game.updateState(0);
            player.updateCarsAtEnd(0);
        })
        //this.button should refer to the html button element
        //hiding input boxes and displaying the player's name
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();

            player.name = this.input.value()
            this.greeting.html("Hi! " + player.name);
            this.greeting.position(displayWidth/2 - 40, displayHeight/2 - 20);

            //increasing playerCount by 1 
            playerCount+= 1;
            player.index = playerCount;

            //updating the playerCount and name
            player.updateCount(playerCount);
            player.update();

        })
    }

    //creating a function to hide title ond greeting for later use
    hideForm(){
        this.title.hide();
        this.greeting.hide();
    }
}