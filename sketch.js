//creating global variables
var gameState = 0;
var player, playerCount, database;
var form, game;
var allPlayers;
var car1, car2, car3, car4, cars;
var carImage1, carImage2, carImage3, carImage4;
var groundImg, trackImg;

function preload(){
    //loading images
    carImage1 = loadImage("../images/car1.png");
    carImage2 = loadImage("../images/car2.png");
    carImage3 = loadImage("../images/car3.png");
    carImage4 = loadImage("../images/car4.png");
    trackImg = loadImage("../images/track.jpg");
    groundImg = loadImage("../images/ground.png");
}

function setup(){
    //configuring database
    database = firebase.database();
    //creating canvas according to display screen
    createCanvas(displayWidth - 20, displayHeight - 20);
    //creating a game object
    game = new Game();
    //getting the state of the game from database
    game.getState();
    //if game state is 0, calling start function of game class(if condition written inside function)
    game.start();
    // console.log(displayHeight*5)
}

function draw(){
    //if 4 players have logged in setting gameState to 1
    if(playerCount === 4){
        game.updateState(1);
    }

    //starting the game when gameState is 1
    if(gameState === 1){
        clear();
        game.play();
    }

    //endimg the game when gameState is 2
    if(gameState === 2){
        game.end();
        // game.updateState(2);
    }
}

// 
//var ball;
// var database, position;

// function setup(){
//     database = firebase.database();

//     createCanvas(500,500);

//     ball = createSprite(250,250,10,10);
//     ball.shapeColor = "red";

//     // saving position of baa/position in a variable
    // var ballPosition = database.ref('ball/position');
    // ballPosition.on("value", readPosition, showError);

// }

// function readPosition(data) {
//     position = data.val();
//     ball.x = position.x;
//     ball.y = position.y;
// }

// function writePosition(a,b){
//     database.ref('ball/position').set({
//         'x' : ball.x + a,
//         'y' : ball.y + b
//     });

//     /*
//     {'x': value,
//     y: value}
//     */
//     // ball.x = ball.x + a;
//     // ball.y = ball.y + b;
    
// }

// function showError() {
//     console.log("There is an error in fetching the data from database");
// }

// function draw(){
//     background("white");

    // if(position !== undefined) {
    //     if(keyDown(LEFT_ARROW)){
    //         writePosition(-1,0);
    //     }
    //     else if(keyDown(RIGHT_ARROW)){
    //         writePosition(1,0);
    //     }
    //     else if(keyDown(UP_ARROW)){
    //         writePosition(0,-1);
    //     }
    //     else if(keyDown(DOWN_ARROW)){
    //         writePosition(0,+1);
    //     }
    // }
    
//     drawSprites();
// }