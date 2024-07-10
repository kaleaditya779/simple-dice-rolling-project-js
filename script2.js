
let theHiddenDiv = document.getElementById("theHiddenDiv");
let isPlaying = false;

function startTheGame() {
    let play_now_button = document.getElementById("play-now-button");
    play_now_button.addEventListener("click", playingTheGame)
}


function stopTheGame() {
    /* 1) player clicks stop button
    2) When 5 seconds passes, after 1st player plays..
    */
    // Here, make hiddenPart hidden again, stop button convert to play now
    let stop_now_button = document.getElementById("stop-now-button");
    stop_now_button.outerHTML = "<h3 id=\"play-now-button\" class=\"game-button bgCyan\">Let's Play...</h3>";
    theHiddenDiv.classList.add("hidden")
    isPlaying = false;

    startTheGame()
}

function playingTheGame() {
    // here remove hidden, convert play now button to stop now, add evnet listener to stop now button
    let play_now_button = document.getElementById("play-now-button");
    theHiddenDiv.classList.remove("hidden");
    play_now_button.outerHTML = "<h3 id=\"stop-now-button\" class=\"game-button bgRed\">Stop playing..</h3>";
    isPlaying = true;
    let stop_now_button = document.getElementById("stop-now-button");
    stop_now_button.addEventListener("click", stopTheGame);

    play();
}

const red_dice_array = ["./dice_images/red-1.png", "./dice_images/red-2.png", "./dice_images/red-3.png", "./dice_images/red-4.png", "./dice_images/red-5.png", "./dice_images/red-6.png"];
const green_dice_array = ["./dice_images/green-1.png", "./dice_images/green-2.png", "./dice_images/green-3.png", "./dice_images/green-4.png", "./dice_images/green-5.png", "./dice_images/green-6.png"];

function play() {
    let dice1_red = document.getElementById("dice1");
    let dice2_green = document.getElementById("dice2");

    dice1_red.addEventListener("click", funcRed);
    dice2_green.addEventListener("click", funcGreen);
}

function funcRed() {
    onePlayed("R")
}

function funcGreen() {
    onePlayed("G")
}

let redCount = 0
let greenCount = 0

function resetCounts() {
    redCount = 0;
    greenCount = 0;
}

function onePlayed(playerPlayed) {

    if (!isPlaying) return;

    let dice1_red = document.getElementById("dice1");
    let dice2_green = document.getElementById("dice2");


    if (playerPlayed == "R") {
        redCount = Math.floor(Math.random() * red_dice_array.length);
        dice1_red.innerHTML = '<img src="' + red_dice_array[redCount] + '"/>';

        dice2_green.addEventListener("click", funcGreen);
        dice1_red.removeEventListener("click", funcRed);
        redCount++;
    } else if (playerPlayed == "G") {
        greenCount = Math.floor(Math.random() * green_dice_array.length);
        dice2_green.innerHTML = '<img src="' + green_dice_array[greenCount] + '"/>';

        dice2_green.removeEventListener("click", funcGreen);
        dice1_red.addEventListener("click", funcRed);
        greenCount++;
    }

    // Now waiting for 5 seconds for other one to play, and display the result. Else quit the game
    let flag = 0;
    setTimeout(() => {
        if ((redCount != 0 && greenCount == 0) ||(redCount == 0 && greenCount != 0)) {
            resetCounts();
            stopTheGame();
            flag = 1;
        }
    }, 3000)
    if (redCount != 0 && greenCount != 0) {
        flag = 1;
        if (redCount > greenCount) {
            setTimeout(() => {
                alert("The player1 (Red) WON !!");
            }, 50)
            
            // resetCounts();
            // stopTheGame();
        } else if (redCount < greenCount) {
            setTimeout(() => {
                alert("The player2 (Green) WON !!");
            }, 50)
            
            // resetCounts();
            // stopTheGame()
        } else if (redCount == greenCount) {
            setTimeout(() => {
                alert("TIE !!")
            }, 50)
            
            // resetCounts();
            // stopTheGame()
        }
    }
    
        setTimeout(() => {
            if (flag == 0) {
                resetCounts()
                stopTheGame()
            }
            
        }, 3000)
    
    





}


startTheGame();