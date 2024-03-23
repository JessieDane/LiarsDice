"use strict"
//dices
//player dices
let dice1P = document.getElementById("dice1P");
let dice2P = document.getElementById("dice2P");
let dice3P = document.getElementById("dice3P");
let dice4P = document.getElementById("dice4P");
let dice5P = document.getElementById("dice5P");
//Cpu dices
let dice1Cpu = document.getElementById("dice1Cpu");
let dice2Cpu = document.getElementById("dice2Cpu");
let dice3Cpu = document.getElementById("dice3Cpu");
let dice4Cpu = document.getElementById("dice4Cpu");
let dice5Cpu = document.getElementById("dice5Cpu");
//dice arrays
let playerDice = [5];
let cpuDice = [5];
//who turn it is
let turnholder;
//betting
//currentbet
let currentBetQuantityDice = 0;
let currentBetNumDice = 0;
//new bet
let newBetQuantityDice;
let newBetNumDice;
let betOwner;
//call liar
let challenger;
//layout
//spans
let currentBetQuantitySpan = document.getElementById("currentBetquantity");
let currentBetNumSpan = document.getElementById("currentBetNum");
//buttons
let startGameBtn = document.getElementById("startGameButton");
let quitBtn = document.getElementById("quit");
let newBetBtn = document.getElementById("newBetButton");
let callLiarBtn = document.getElementById("callLiar");
//inputfields
let inputQuantity = document.getElementById("newBetQuantity");
let inputNum = document.getElementById("newBetNum");

//click events //need to find a way to toggle buttons, later
startGameBtn.onclick = setDiceFunction;     //button to throw dices
quitBtn.onclick = quitFunction;             //button to quit..
//while quantity and num = 0, button=disabled ??
newBetBtn.onclick = makingBetFunction; //button to make a bet
//under construction.
//callLiarBtn.onclick = callLiarFunction; //button to call liar


//functions
function setDiceFunction() {    //sets the dice of participants
    for (let i = 0; i < 4; i++) {
        playerDice.push(Math.floor(Math.random() * 6 + 1));
        cpuDice.push(Math.floor(Math.random() * 6 + 1));
    }
    console.log(playerDice + " player Array");
    console.log(cpuDice + " cpu Array");
    //sets innertext to display
    dice1P.innerText = playerDice[0];
    dice2P.innerText = playerDice[1];
    dice3P.innerText = playerDice[2];
    dice4P.innerText = playerDice[3];
    dice5P.innerText = playerDice[4];

    dice1Cpu.innerText = "?";
    dice2Cpu.innerText = "?";
    dice3Cpu.innerText = "?";
    dice4Cpu.innerText = "?";
    dice5Cpu.innerText = "?";
    //quick var testing
    //console.log(inputQuantity.value)
    //console.log(typeof())
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
    };
};

function quitFunction() { //quit button :)
    alert("lol, no.");
    console.log("user tried to leave..");
};
