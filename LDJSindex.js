"use strict"
//Index 
//  variables.
//  click events.
//  game phase functions.
//  other functions.
//  function pathways.
//  process descriptions.
//  game explanation.
//function list
//  to be made
//  
//
// let createSpan = document.createElement("span"); //move to forloop//markfordelete
//dice array
let tableArray = [];//length = amount of players * 5 //the array to hold all dices
let tableArrayLengthVar = 9;    //relates to setting up tabledices and dice displays
//
//random dice throw
let randomDice;     // random number generator            
//sets amount of points for winning condition
let playerPoints = 4;
let cpuPoints = 4;
//
let turnholder = 1; // relates to decision making 
let gamePhase = 1;  // relates to buttons.disable
//betting
//currentbet
let currentBetQuantityDice = 0; //quantity value of the placed bet
let currentBetNumDice = 0;      //dice value of the placed bet
//new bet
let newBetQuantityDice;         //quantity value of proposed bet
let newBetNumDice;              //dice value of proposed bet
let betholder;                  //relates to determining the victor
//call liar
let challengeCounter = 0; // counts how many dices match
let challenger; // is the one who initiates call liar.
//layout
//player span cpntainer
let playerDiceContainer = document.getElementById("playerDice");
//Cpu span container
let cpuDiceContainer = document.getElementById("cpuDice");
//buttons
let startRoundBtn = document.getElementById("startGameButton"); 
let quitBtn = document.getElementById("quit");                  
let newBetBtn = document.getElementById("newBetButton");        
let callLiarBtn = document.getElementById("callLiar");
//inputfields
let inputQuantity = document.getElementById("newBetQuantity");
let inputNum = document.getElementById("newBetNum");
//spans
let currentBetQuantitySpan = document.getElementById("currentBetquantity"); 
let currentBetNumSpan = document.getElementById("currentBetNum");           
// forloop variables
// i = set tableArray
// j = set player dice cards
// k = set cpu dice cards
// l = show cpu dice during callLiarFunction
//
//on clicks
startRoundBtn.onclick = setDiceFunction;    //button to throw dices
quitBtn.onclick = quitFunction;             //button to quit..
newBetBtn.onclick = makingBetFunction;      //button to make a bet
callLiarBtn.onclick = callLiarFunction;     //button to call liar
//
// gameflow functions
function setDiceFunction() {    //sets the dice into an array
    gamePhase = 1;              //button toggle
    tableArray.length = 0;      // to clean tablearray

      
    for (let i = 0; i <= tableArrayLengthVar; i++) { //i < (amount players * 5)
        tableArray.push(Math.floor(Math.random() * 6 + 1));
    }
   
    for (let j = 0; j <= playerPoints; j++) {   //for loop to create dices to display appropriate to player points
        let createSpan = document.createElement("span");
        createSpan.classList.add("diceP");
        playerDiceContainer.appendChild(createSpan);
        createSpan.innerText = tableArray[`${j}`];
    };
        
    for (let k = 0; k <= cpuPoints; k++) {      //for loop to create dices to display appropriate to cpu points
        let createSpan = document.createElement("span");
        createSpan.classList.add("diceCpu");
        cpuDiceContainer.appendChild(createSpan);
        createSpan.innerText = "?";
    }
          
    gamePhase = 2;                  //button toggle
    if (gamePhase === 2){
        startRoundBtn.disabled = true;
        newBetBtn.disabled = false;
        inputQuantity.disabled = false;
        inputNum.disabled = false;
    }
    console.log(tableArray);
    console.log( "set board");        // markfordelete
};
//
function makingBetFunction() {      //tries to make a bet
    if (parseInt(inputQuantity.value) >= 1 && parseInt(inputNum.value) >= 1 ) {
        newBetQuantityDice = parseInt(inputQuantity.value);
        newBetNumDice = parseInt(inputNum.value);
        if (newBetNumDice > currentBetNumDice && newBetNumDice <= 6) {  // name ruleset = Reset
            currentBetQuantityDice = newBetQuantityDice;
            currentBetNumDice = newBetNumDice;
            currentBetQuantitySpan.innerText = currentBetQuantityDice+"x";
            currentBetNumSpan.innerText = currentBetNumDice+"'s";
            
            betholder = 1;  
            turnholder = 0; // because now the other has to make a decision
            console.log(turnholder + " turnholder");
        };
    } else {
        alert("invalid entry, Agent Smith. please try again");
    };
    if (gamePhase === 3) {
        newBetBtn.disabled = true;
        callLiarBtn.disabled = true;
    };
    cpuBehavior();
};
//
function cpuBehavior() { // decision is 1/3 to call liar
    console.log("cpu decides next move");
    if (turnholder === 0) { // if it is not, it will exit function and let player do things
        randomDiceThrow();  // random dice throw generator
        if( randomDice % 3 === 0 ) { // to decide cpu choices
            console.log("call liar function");
            callLiarFunction();     
        } else {
            console.log("make bet");
            cpuNewBet();
        }
    };
};
//
function callLiarFunction() { // will conclude the round
    newBetBtn.disabled = true;
    callLiarBtn.disabled = true;
    // all cards are shown
    for (let l = 0; l <= cpuPoints; l++) { 
        cpuDiceContainer.removeChild(cpuDiceContainer.children[0]);
        let createSpan = document.createElement("span");
        createSpan.classList.add("diceCpu");
        cpuDiceContainer.appendChild(createSpan);
        createSpan.innerText = tableArray[`${tableArrayLengthVar - l}`]; //displays the dice value from tableArray
    };
        //using the for loop already here, to create spans to diplay on the screen 
        //and have their numbers show, highlighting the ones that match
        //not completed!!!
    for ( let element of tableArray ) { //made variable to iterate over array 
        if (element === currentBetNumDice) {
            challengeCounter++; // challenge counter ++ when a num is a match
        };
    };
//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////

    if ( challengeCounter < currentBetQuantityDice ) { // to check if the bet is good or not
        console.log("betholder loses"); // betholder loses the round challenger -1 dice
        startRoundBtn.disabled = false;
        tableArrayLengthVar = tableArrayLengthVar - 1;
        if ( betholder=1) {
            //document.getElementById("playerdice").lastChild.remove; // doesn't work yet
        };
        console.log(tableArray)
    } else  if (challengeCounter === currentBetQuantityDice) {
        console.log("dead on"); // betholder wins, challenger -2 dice
        startRoundBtn.disabled = false;
        tableArrayLengthVar = tableArrayLengthVar - 2;
        if ( betholder=0) {
            for (let j = 0; j <= 1; j++ ) { 
                //document.getElementById("playerdice").lastChild.remove; // doesn't work yet
            };
        };
    } else {
        console.log("challenger wins"); //challenger wins, betholder -1 dice
        startRoundBtn.disabled = false;
        tableArrayLengthVar = tableArrayLengthVar - 1;
        if ( betholder = 0) {
            //document.getElementById("playerdice").lastChild.remove; // doesn't work yet
        };
    };
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////  
    if(playerPoints !== 0 && cpuPoints !== 0) {
        //playerDiceContainer.removeChild(playerDiceContainer.children); // to remove dices to make place for new
        //cpuDiceContainer.removeChild(cpuDiceContainer.children);       // to remove dices to make place for new
        // above is not functional yet
        gamePhase = 1;
        tableArray.length = 0; //erases current array to prepare for next round
        setDiceFunction();
    } else if (cpuPoints === 0) {
        alert("player won the game!");
    } else if (playerPoints === 0) {
        alert("player lost the game!");
    };
};
//
function cpuNewBet() { //how cpu determines a bet // to be improved !
    gamePhase = 3;  //button disable toggle
    randomDiceThrow();
    newBetQuantityDice = randomDice;
    newBetNumDice = newBetNumDice + 1;
    
    if (newBetNumDice > currentBetNumDice && newBetNumDice <= 6) {  // name ruleset = Reset
        currentBetQuantityDice = newBetQuantityDice;
        currentBetNumDice = newBetNumDice;
        currentBetQuantitySpan.innerText = currentBetQuantityDice+"x";
        currentBetNumSpan.innerText = currentBetNumDice+"'s";
    } else {
        retryBetFunction;
         
    }
    turnholder = 1; // because now the player has to make a decision
    console.log(turnholder + " turnholder");
    if (gamePhase === 3) {      
        newBetBtn.disabled = false;
        callLiarBtn.disabled = false;
    };
};
// other functions
// retrybet
function retryBetFunction() {
    console.log("cpu has to try rolling again");
    cpuNewBet;
};
// quit function 
function quitFunction() { //quit button :)
    alert("no.");
    console.log("user tried to leave..");
};
//
function randomDiceThrow() {    // a dice throw can be divided in 2, 3, or 6 parts. 
    randomDice = Math.floor(Math.random() * 6 + 1);
    console.log(randomDice + " random dice");
};
//
// function pathways
/*this describes chain of functions ( fa => fb )

*/
// process explanations
/* turn holder
    helps to keep the functions apropriately.
*/
/* bet holder
    serves as a way to help correctly pull a dice out of view from player.
    cpu doesn't matter, so you need to know who made that bet.
    if player made the bet, the bet holder = 1
*/
/*gamePhase.
    game phase is a variable to help me toggle the buttons in various stages.
    --
    phase 1, table get's 10 dice throws, clickround is active, rest is off.
    phase 2, a bet needs to be placed, newbetbtn is active, rest is off.
    phase 3, placing new bet OR call liar to previous bet. newbetbtn and call liar is active, rest is off.
    phase 4, theoretical, but call liar iniates and the round will come to a conclusion, and will loop back to phase 1. 
    -= no need to insert phase 4 =-
*/
/* game explanation.
    each player gets 5 dices, and a cup.
    the cups with the dices are set upside down so nobody but the 
    player can peek.
    the dices are not to be touched or moved after they are set.
    
    now the first gets to make a bet how many of a certain d6 face there 
    are, across all dices on the table.
    let's say a bet is made for 3x 2's.
    
    next player gets to either make a new bet, overriding the previous,
    but there are rules to this.
    the easiest is, new bet must be a higher quantity of the same dice value, 
    or any value of a higher dice value.
    the player can also choose to call the current betholder a liar.
    if so, a test will be made to conclude the call.
    there are 3 outcomes.
    1- there are 4x 2's on the table so that make atleast 2x 2's so betholder 
    wins, challenger loses 1 dice.
    2- there are 3x 2's on the table and that makes a dead on, so betholder
    wins, challenger loses 2 dices.
    3- there is 1x 2's on the table so the current betholder loses.
    betholder loses 1 dice.

    when somebody loses a dice, that means they get 1 dice less in their cup.
    game is concluded when the last player remains.
*/





