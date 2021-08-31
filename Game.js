class Game{
    constructor(){

    }

    //getting game's state from database
    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    //updating state to a certain value in our code when something happens and saving it in database
    updateState(state){
        database.ref("/").update({
            "gameState" : state
        });
    }

    //making start function async, because this is loaded at the start of the game and we can't run anything else until this hasný completely loaded
    async start(){
        //starting the game only when gameState is 0
        if(gameState === 0){
            //creating a new player object
            player = new Player();
            //reading the value of playerCount from database only once
            var playerCountRef = await database.ref("playerCount").once("value");
            //if it exists calling getCount and the game continues
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            //creating new form object
            form = new Form();
            form.display();
        }   
        //creating car sprites
        car1 = createSprite(200,200,30,30);
        car1.addImage(carImage1);
        car2 = createSprite(400,200,30,30);
        car2.addImage(carImage2);
        car3 = createSprite(600,200,30,30);
        car3.addImage(carImage3);
        car4 = createSprite(800,200,30,30);
        car4.addImage(carImage4);
        //adding car variable into cars array
        cars = [car1, car2, car3, car4];
    }

    play(){
        
        //hiding the form
        form.hideForm();
        // textSize(30);
        // text("Game Start",150,100);

        //calling static function for getting all player information and rank
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        //running this code only when allPlayers is not undefined
        if(allPlayers !== undefined){
            //adding background image
            background(groundImg);
            //adding track image according to display screen
            image(trackImg,10,-displayHeight*4,displayWidth-20, displayHeight*5);
            //creating x, y and index variables for later use
            var x  = 135;
            var index = 0;
            var y;

            //creating for loop for displaying each player
            //p in allPlayers means the current player
            for(var p in allPlayers){
                //incrementing x value by 200 for each player(distance between them)
                x = x + 200;
                //displaying y according to their distance travelled
                y = displayHeight - allPlayers[p].distance;
                //increasing index by 1 each time for loop is run to refer to different players
                index = index + 1;

                // if(p === "player" + player.index) {
                //     fill("red");
                // } else {
                //     fill("black");
                // }
                // display_position+= 20;
                // textSize(15);
                // text(allPlayers[p].name +" : " + allPlayers[p].distance, 150, display_position)

                //moving our car along with the car of the player on their browser
                if(index === player.index){
                    // cars[index-1].shapeColor="red";
                    camera.position.x= displayWidth/2;
                    camera.position.y = cars[index-1].y;

                    //marking the current player's car
                    fill("yellow");
                    strokeWeight(5);
                    ellipse(x,y,60,60);


                }

                //since index is the arrays's car index + 1, we are subtracting it here again so that we refer to the car in the array's position
                cars[index-1].x = x;
                cars[index-1].y = y;

                //increasing car's distance when up arrow is pressed
                if(keyDown(UP_ARROW)){
                    player.distance += 50;
                    player.update();
                }
                
                // code for when the player has reached the finish line
                if(player.distance>3750){
                    // making gameState 2
                    gameState = 2;
                    //increasing player rank by 1, because 1 person has reached the finish line
                    player.rank+= 1;
                    //updating the cars at end by the value of rank because that is anyways the same
                    Player.updateCarsAtEnd(player.rank);
                    
                    // text("Your rank is"+ player.rank);
                    console.log("your rank is"+ player.rank);
                }
                drawSprites();
            }

        }

    }

    end(){
        console.log("game end");
        // var y_value = 10;
        // for(var p in allPlayers){
        //     y_value+= 5;
        //     text();
        // }

        // if(player.distance === 3750){
        //     text(player.name + "is the winner");
        // }
    }
}