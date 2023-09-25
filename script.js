//modal container
var modal_container = document.getElementById('modal_container')
//button to close modal
var closeModal = document.querySelector('[data-modal="close"]')
//button to reset game from modal
var resetGameFromModal = document.querySelector('[data-modal="reset"]')
//button to reset game
var resetGame = document.querySelector('[data-modal="resetAll"]')
//modal container error
var modal_container_error = document.getElementById('modal_container_error')
//modal container error list "lastest games"full 
var modal_container_full = document.getElementById('modal_container_full')
//modal container initial 
var modal_container_welcome = document.getElementById('modal_container_welcome')
//button to close modal
var closeModalError = document.querySelector('[data-modal="closeError"]')
//button to close modal initial
var closeModalInitial = document.querySelector('[data-modal="closeModalInitial"]')
//button to reset modal error full and clear local storage
var clearReset = document.getElementById('clearReset')
//button flip the coin
var flipCoin = document.getElementById("flip");
//coin
var coin = document.getElementById('coin')
//buttons to choose (Head or Tail)
var coinFaces = document.querySelectorAll(".coinFace")
//show result coin
var Resultcoin = document.getElementById("print")
//button to player chooses
var btnChoose = document.getElementById('btnChooseStyle')
//show what player chooses
var chooseSide = document.getElementById("chooseSideCoin")
//count total rounds
var countTotal = document.getElementById("countTotal")
//show round winner
var roundWinner = document.getElementById("roundWinner")
//show final winner modal
var finalWinner = document.getElementById("finalWinner")
//show final winner
var finalWinnerScreen = document.getElementById("finalWinnerScreen")
//score player
var scores = document.querySelectorAll('score')
//variable to set playerChoose value
var playerChoose = null;
//random number (0 or 1)
let tossResult;
//list 
var list = document.getElementById('listGames')
//variable show storage
var showStorage;
//btn clear last games
var clear = document.getElementById('clear')
//previous rolls
var rolls = document.getElementById('rolls')
//previous winners
var prevWinners = document.getElementById('winners')
//background frontpage
var bg_frontpage = document.getElementById('bg_frontpage') 
//panel background subtitle 
var bg_subtitle = document.getElementById('subtitle')
//buttons to switch background and theme
var bgBtn1 = document.getElementById('bg_1')
var bgBtn2 = document.getElementById('bg_2')
var bgBtn3 = document.getElementById('bg_3')
//panel background change
var bgControl = document.getElementById('bgControl')
//show previous rolls 
var previousRolls = document.getElementById('printRolls')
//subtitle previous rolls ("previous rolls")
var span = document.getElementById('spanTxt')

//functions to switch backgrounds
function bgSwitch1(){
    bg_frontpage.setAttribute("class", "frontpage");
    previousRolls.setAttribute("class", "rolls_previousRolls");
    countTotal.setAttribute("class", "countTotal");
    chooseSide.setAttribute("class", "chooseSide");
    span.setAttribute("class", "blackTxt");
    bgControl.setAttribute("class", "bg_control")
    bg_subtitle.setAttribute("class", "subtitle");
    bgBtn1.setAttribute("class" , "whiteCover")
    bgBtn2.setAttribute("class" , "bg_btn")
    bgBtn3.setAttribute("class" , "bg_btn")
    btnChoose.setAttribute("class" , "btnChoose")
    
}

function bgSwitch2(){
    bg_frontpage.setAttribute("class", "frontpage white");
    bg_subtitle.setAttribute("class", "containWhite")
    span.setAttribute("class", "whiteTxt")
    chooseSide.setAttribute("class", " whiteTxt")
    bgControl.setAttribute("class", "bg_controlSwitch")
    countTotal.setAttribute("class", "countTotalWhite")
    bgBtn1.setAttribute("class" , "bg_btn")
    bgBtn2.setAttribute("class" , "whiteCover")
    bgBtn3.setAttribute("class" , "bg_btn")
    btnChoose.setAttribute("class" , "btnChoose")

}

function bgSwitch3(){
    bg_frontpage.setAttribute("class", "frontpage dark");
    bgControl.setAttribute("class", "bg_controlSwitch")
    bg_subtitle.setAttribute("class", "containWhite");
    countTotal.setAttribute("class", "countTotalWhite");
    chooseSide.setAttribute("class", "whiteTxt");
    span.setAttribute("class", "whiteTxt");
    bgBtn1.setAttribute("class" , "bg_btn")
    bgBtn2.setAttribute("class" , "bg_btn")
    bgBtn3.setAttribute("class" , "whiteCover")
    btnChoose.setAttribute("class" , "btnChoose")

}
//counts 
var count_t = 0;
var count_p1 = 0;
var count_pc = 0;
var count_arr = 0;

//function click for button "flip"
function toss() {

    if (count_t == 4) {
        setTimeout(setWinner, 3000);
        setTimeout(GameWinner, 3000);
        setTimeout(openModal, 4000);
        setTimeout(saveResult, 3000);
        setTimeout(switchClass, 3000);
        coinAnimate();
        flipCoin.setAttribute('disabled', 'true')

    } else {
        stringLimit()
        setTimeout(enableBtn, 3000);
        flipCoin.setAttribute('disabled', 'true')
        coinAnimate();
        setTimeout(switchClass, 3000);
        setTimeout(setWinner, 3000);
    }
}

//function to enable button
function enableBtn(){
    flipCoin.removeAttribute('disabled');

}

//function to declare which player 1 clicks
coinFaces.forEach(face => {
    face.addEventListener('click', function (e) {
        playerChoose = e.target.value;
        if (playerChoose == 0) {
            chooseSide.innerHTML = "Player 1 choose HEAD";
        } else {
            chooseSide.innerHTML = "Player 1 choose TAIL";
        }
    });
})

//function to random number
function coinAnimate (){
    tossResult = Math.floor(Math.random() * 2);
    if (playerChoose == null) {
        openModalError();
        return false;
    }

    if (tossResult == 0) {
        coin.setAttribute("class", "resultCoin animate-heads");
    } 
    else {
        coin.setAttribute("class", "resultCoin animate-tails");
    } 
}

//function that removes class from animation
function switchClass(){
    coin.setAttribute("class", "resultCoin");

} 

//build an array to show the user the previous moves 
function sideCoin() {
    tossResult;
    if (playerChoose == null) {
        return false;
    }
    var resultRolls = [];
    resultRolls.push(tossResult);
    let set = resultRolls.splice(resultRolls.length - 5, resultRolls.length);
    renderRolls(set);
}

//function render(previous rolls)
function renderRolls(set) {
    set.forEach(roll => {
        rolls.innerHTML += `<div class="roll">
       <span><img src="assets/${roll}.png" class="imgCoin"></img></span> 
            </div>`   
    })
}

//function for count points 
function setWinner() {
    sideCoin(); //build an array to show the user the previous moves 
    if (playerChoose == null) {
        return false;
    }
    count_t++;
    countTotal.innerHTML = "Round " + count_t;

    if (playerChoose == tossResult) {
        count_p1++
        scorePlayer.innerHTML = "Score: " + count_p1;
        roundWinner.innerHTML = "Round " + count_t + ": Player1 Win"

    } else {
        count_pc++
        scoreComputer.innerHTML = "Score: " + count_pc;
        roundWinner.innerHTML = "Round " + count_t + ": Computer Win"
    }
}

//function for show who won game
function GameWinner() {
    if (count_p1 > count_pc) {
        finalWinner.innerHTML = "PLAYER 1 WIN THE GAME!"
        finalWinnerScreen.innerHTML = "PLAYER 1 WIN THE GAME"
    } else {
        finalWinner.innerHTML = "COMPUTER WIN THE GAME!"
        finalWinnerScreen.innerHTML = "COMPUTER WIN THE GAME"
    }
}

//function for open and close modal
function openModal() {
    modal_container.style.display = "flex";
    flipCoin.setAttribute('disabled', 'true')

}

closeModal.addEventListener('click', function () {
    modal_container.style.display = "none";

})

function modalInitial(){
    modal_container_welcome.style.display = "flex";
}

window.onload = (modalInitial);


closeModalError.addEventListener('click', function () {
    modal_container_error.style.display = "none";
    modal_container_welcome.style.display = "none";

})

closeModalInitial.addEventListener('click', function () {
    modal_container_welcome.style.display = "none";

})

function openModalError() {
    modal_container_error.style.display = "flex";

}

function openModalFull() {
    modal_container_full.style.display = "flex";

}

clearReset.addEventListener('click', function () {
    modal_container_full.style.display = "none";

})

//function reset game 
function resetGameAll() {
    rolls.innerHTML = ""
    finalWinner.innerHTML = "";
    finalWinnerScreen.innerHTML = "";
    roundWinner.innerHTML = "";
    scorePlayer.innerHTML = "Score: 0";
    scoreComputer.innerHTML = "Score: 0";
    countTotal.innerHTML = "";
    Resultcoin.innerHTML = "";
    chooseSide.innerHTML = "";
    flipCoin.removeAttribute('disabled');
    rolls.innerHTML = "";
    playerChoose = null;
    count_p1 = 0;
    count_pc = 0;
    count_t = 0;
    coin.setAttribute("class", "resultCoin animate-heads-reset")

}

//function reset game from modal
function resetFromModal() {
    rolls.innerHTML = ""
    finalWinner.innerHTML = "";
    finalWinnerScreen.innerHTML = "";
    roundWinner.innerHTML = "";
    scorePlayer.innerHTML = "Score: 0";
    scoreComputer.innerHTML = "Score: 0";
    countTotal.innerHTML = "";
    Resultcoin.innerHTML = "";
    chooseSide.innerHTML = "";
    flipCoin.removeAttribute('disabled');
    modal_container.style.display = "none";
    playerChoose = null;
    count_p1 = 0;
    count_pc = 0;
    count_t = 0;
    coin.setAttribute("class", "resultCoin animate-heads-reset")

}

//clean local storage
clear.addEventListener('click', function () {
    localStorage.clear();
    list.innerHTML = "";
    count_arr = 0;
    flipCoin.removeAttribute('disabled');

})

//clean and reset list and game
clearReset.addEventListener('click', function(){
    localStorage.clear();
    list.innerHTML = "";
    count_arr = 0;
    resetFromModal();

})

//event clicks
flipCoin.addEventListener('click', toss);
resetGameFromModal.addEventListener('click', resetFromModal);
resetGame.addEventListener('click', resetGameAll);
bgBtn1.addEventListener('click', bgSwitch1);
bgBtn2.addEventListener('click', bgSwitch2);
bgBtn3.addEventListener('click', bgSwitch3);

//save results (localStorage)
function saveResult() {
    //vamos buscar o storage se houver
    let resultsFromStorage = localStorage.getItem('result');

    var result = {};
    count_p1 > count_pc ? (result["winner"] = "Player1") : (result["winner"] = "Computer");
    result["playerScore"] = count_p1;
    result["computerScore"] = count_pc;

    var string = JSON.stringify([result]);
    // senao houver resultados no storage
    let temporaryStorage
    
    if (!resultsFromStorage) {
        localStorage.setItem("result", string);
    } else {
        temporaryStorage = JSON.parse(resultsFromStorage);
        temporaryStorage.push(result);
        localStorage.setItem('result', JSON.stringify(temporaryStorage))
        render(temporaryStorage); 

        count_arr++;
    }
}
//limit list strings
function stringLimit(){
    if(count_arr > 4){
        flipCoin.setAttribute('disabled', 'true')
        openModalFull();
    }
}
//function render list
function render(t) {
    list.innerHTML = ""
    t.forEach(game => {
        list.innerHTML += `<div class="game">
        <span><img src="assets/${game.winner}.png" class="imgRoll"></img> Winner: ${game.winner} | Player Score: ${game.playerScore} vs Computer Score: ${game.computerScore} </span>
            </div>`
    })
}
//render if "t == null" show on screen
function renderInitial(t){
    if(t == null){
        temporaryStorage.push(result)
        list.innerHTML = ""
        t.forEach(game => {
        list.innerHTML += `<div class="game">
        <span><img src="assets/${game.winner}.png" class="imgRoll"></img> Winner: ${game.winner} | Player Score: ${game.playerScore} vs Computer Score: ${game.computerScore} </span>
            </div>`
    }
        )}
}  