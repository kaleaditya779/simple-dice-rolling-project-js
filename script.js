
let play_now = document.getElementById("play-now-button")
let hidden_part = document.getElementById("row-upper-div");
let isPlaying = 0;

play_now.addEventListener("click", () => {
    play_now.outerHTML = '<h3 id="stop-now-button" class="game-button bgRad">Stop playing..</h3>'
    hidden_part.classList.remove("hidden");
    isPlaying = 1;
    play()
})

let stop_now = document.getElementById("stop-now-button");

stop_now.addEventListener("click", () => {
    // Come to initial stage..
    // I mean play button, make rest hidden, 
    stop_now.outerHTML = '<h3 id="play-now-button" class="game-button bgCyan">Let\'s Play...</h3>';
    hidden_part.classList.add("hidden");
    isPlaying = 0;
})


const red_dice_array = ["./dice_images/red-1.png", "./dice_images/red-2.png", "./dice_images/red-3.png", "./dice_images/red-4.png", "./dice_images/red-5.png", "./dice_images/red-6.png"];
const green_dice_array = ["./dice_images/green-1.png", "./dice_images/green-2.png", "./dice_images/green-3.png", "./dice_images/green-4.png", "./dice_images/green-5.png", "./dice_images/green-6.png"];


function play() {
    let dice1_red = document.getElementById("dice1")
    let dice2_green = document.getElementById("dice2")

    dice1_red.addEventListener("click", function evFun() {
        player_played("R");
    })

    dice2_green.addEventListener("click", function evFun() {
        player_played("G");
    })
}

function player_played(whoPlayed) {
    // Here we will have counts of red, green pressed..

    while (isPlaying == 1) {
        let greenCount = 0;
        let redCount = 0;
        if (whoPlayed == "G") {

            greenCount = Math.floor(Math.random() * green_dice_array.length);
            dice2_green.innerHTML = '<img src="' + green_dice_array[greenCount] + '"/>';
            greenCount = greenCount + 1;

            // now only R can play:
            dice2_green.removeEventListener("click", evFun)

        } else if (whoPlayed == "R") {

            redCount = Math.floor(Math.random() * red_dice_array.length);
            dice1_red.innerHTML = '<img src="' + red_dice_array[redCount] + '"/>';
            redCount = redCount + 1;

            // now only G can play
            dice1_red.removeEventListener("click", evFun)

        }

        // Now here we will wait till 5 seconds for another one to play..
        setTimeout(() => {
            if (greenCount != 0 && redCount != 0) {
                // compare counts and declare winner..
                if (greenCount > redCount) {
                    // winner: green
                    // append that result to DOM
                } else if (greenCount < redCount) {

                } else {
                    // Tie
                }
            } else {
                // stop the game
                stop_now.outerHTML = '<h3 id="play-now-button" class="game-button bgCyan">Let\'s Play...</h3>';
                hidden_part.classList.add("hidden");
                isPlaying = 0;
            }
        }, 5000);
    }
}