"use strict"
//dices
//spans
let currentBetQuantitySpan = document.getElementById("currentBetquantity");
let currentBetNumSpan = document.getElementById("currentBetNum");
//player dices spans
let dice1P = document.getElementById("dice1P");
let dice2P = document.getElementById("dice2P");
let dice3P = document.getElementById("dice3P");
let dice4P = document.getElementById("dice4P");
let dice5P = document.getElementById("dice5P");
//Cpu dices spans
let dice1Cpu = document.getElementById("dice1Cpu");
let dice2Cpu = document.getElementById("dice2Cpu");
let dice3Cpu = document.getElementById("dice3Cpu");
let dice4Cpu = document.getElementById("dice4Cpu");
let dice5Cpu = document.getElementById("dice5Cpu");
//dice array
let tableArray = [];//length = amount of players * 5
//who turn it is ( relates to decision making phase)
let turnholder = 1;
//betting
//currentbet
let currentBetQuantityDice = 0;
let currentBetNumDice = 0;
//new bet
let newBetQuantityDice;
let newBetNumDice;
let betOwner;
//call liar
let challengeCounter = 0; // counts how many dices match
let challenger;
//layout
//buttons
let startRoundBtn = document.getElementById("startGameButton");
let quitBtn = document.getElementById("quit");
let newBetBtn = document.getElementById("newBetButton");
let callLiarBtn = document.getElementById("callLiar");
//inputfields
let inputQuantity = document.getElementById("newBetQuantity");
let inputNum = document.getElementById("newBetNum");


//currently looking for a way to implement cpu behavior --------------------------======

//click events //need to find a way to toggle buttons, later
startRoundBtn.onclick = setDiceFunction;     //button to throw dices
quitBtn.onclick = quitFunction;             //button to quit..
//while quantity and num = 0, button=disabled ??
newBetBtn.onclick = makingBetFunction; //button to make a bet
// 
callLiarBtn.onclick = callLiarFunction; //button to call liar

//functions
function setDiceFunction() {    //sets the dice into an array
    tableArray.length = 0;       // to clean tablearray
    
    for (let i = 0; i <= 9; i++) { //i < (amount players * 5)
        tableArray.push(Math.floor(Math.random() * 6 + 1));

    }
    //sets innertext to display
    dice1P.innerText = tableArray[0];
    dice2P.innerText = tableArray[1];
    dice3P.innerText = tableArray[2];
    dice4P.innerText = tableArray[3];
    dice5P.innerText = tableArray[4];
    
    dice1Cpu.innerText = "?";
    dice2Cpu.innerText = "?";
    dice3Cpu.innerText = "?";
    dice4Cpu.innerText = "?";
    dice5Cpu.innerText = "?";
    //quick var testing
    console.log(tableArray + " Array");
    console.log(tableArray.length + " array length");
};

function makingBetFunction() { //tries to make a bet
    if (parseInt(inputQuantity.value) >= 1 && parseInt(inputNum.value) >= 1 ) {
        newBetQuantityDice = parseInt(inputQuantity.value);
        newBetNumDice = parseInt(inputNum.value);
        betOwner = 0 //player needs a toggle for liar function 
        if (newBetNumDice > currentBetNumDice ) {  // name ruleset = Reset
            currentBetQuantityDice = newBetQuantityDice;
            currentBetNumDice = newBetNumDice;
            currentBetQuantitySpan.innerText = currentBetQuantityDice+"x";
            currentBetNumSpan.innerText = currentBetNumDice+"'s";
        };
    } else {
        alert("invalid entry, Agent Smith. please try again");
    }
};

    //challengeCounter
function callLiarFunction() {
    // all cards are shown
    // manual adjustment
    dice1Cpu.innerText = tableArray[5];
    dice2Cpu.innerText = tableArray[6];
    dice3Cpu.innerText = tableArray[7];
    dice4Cpu.innerText = tableArray[8];
    dice5Cpu.innerText = tableArray[9];
    /* using the for loop already there, to create spans to diplay on the screen 
      and have their numbers show, highlighting the ones that match*/ 
    for ( let element of tableArray ) { //made variable to iterate over array 
        if (element === currentBetNumDice){
            challengeCounter++; // challenge counter ++ when a num is a match
        };
    };
    if ( challengeCounter < currentBetQuantityDice ) { // to check if the bet is good or not
        console.log("betholder loses"); // betholder wins the round challenger -1 dice
    } else  if (challengeCounter === currentBetQuantityDice) {
        console.log("dead on"); // betholder wins, challenger -2 dice
    } else {
        console.log("challenger wins"); //challenger wins, betholder -1 dice
    };
    
    console.log(challengeCounter + " challengecounter");
    tableArray.length = 0;
    console.log(tableArray.length + " tablearray length");
};

function quitFunction() { //quit button :)
    alert("lol, no.");
    console.log("user tried to leave..");
};
