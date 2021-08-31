class Player{
    constructor(){
        //creating player's properties
        this.name = null;
        this.distance = 0;
        this.index = null;
        this.rank = null;
    }

    //updating the name and distance of each player in the database
    update(){
        var playerIndex ="players/player"+this.index;
        database.ref(playerIndex).set({
            "name" : this.name,
            "distance" : this.distance
        })
    }

    //updating playerCount in the database
    updateCount(count){
        database.ref("/").update({
            "playerCount" : count
        })
    }

    //getting the count and saving it in playerCount variable from the database
    getCount(){
        var playerCountRef = database.ref("playerCount")
        playerCountRef.on("value",function(data){
            playerCount = data.val();
        })
    }

    //creating a static function to get each player's information
    static getPlayerInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value",function(data){
            allPlayers = data.val();
        })
    }

    //getting the cars at end value from database
    getCarsAtEnd(){
        var carEndRef = database.ref("carsAtEnd");
        carEndRef.on("value",(data) => {
            this.rank = data.val();
        })
    }

    //creating a static function to update the rank of each player in the database
    static updateCarsAtEnd(rank){
        database.ref("/").update({
            "carsAtEnd" : rank
        })
    }
}


/*
{
    player1 : {
        name: Sudipta,
        dis
    }
}
*/