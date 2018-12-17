//sounds//
var winSound = new Audio("./assets/sounds/success.mp3");

var loseSound = new Audio("./assets/sounds/lose.mp3");

var guessSound = new Audio("./assets/sounds/guess.mp3");

var backgroundMusic = new Audio("./assets/sounds/try2.mp3");
/**********HELP - CANT GET THIS TO PLAY ************/
backgroundMusic.loop = true;



/****sounds****/

var guesses = 10;
var wins = 0;
var losses = 0;
var total = wins + losses;
var gameOver = false;

var words = ["alladin", "peter pan", "frozen", "lilo and stitch", "the lion king", "bambi", "cinderella", "the little mermaid", "robin hood", "pocahontas", "moana", "beauty and the beast", "mulan", "nightmare before christmas", "snow white", "the jungle book", "sleeping beauty", "alice in wonderland", "pinocchio", "dumbo"];             //must be all lowercase
var counter = 0;
var currentWord = words[counter];

var display = [];
var input;
var currentWordLength = currentWord.length;
var lettersGuessed = [];

document.addEventListener("keydown", guess);                        //listen for keypress

document.getElementById('guesses').innerHTML = guesses;             //write guesses to document to start

resetDisplay();                                                     //write display to start    

startGame();
//load sounds//
function startGame() {
    
    alert("Start guessing letters!");
    
}




/////////////*********************Write Display**********************///////////////////// */
function resetDisplay() {
    
    guesses = 10;
        document.getElementById('guesses').innerHTML = guesses;
        display = [];
        lettersGuessed = [];
        document.getElementById('letters').innerHTML = lettersGuessed;
        for (var i = 0; i < currentWordLength; i++) {
            if (currentWord[i] == ' ') {
                display.push("&nbsp;");
            } else {
                display.push("_");
            }
        }
        document.getElementById("display").innerHTML = display.join(" ");
        //display the word as _'s
}
/////////////////////////////////////////////////////////////////////////////////////////////
////*********************************************************************************************////////
function guess() {
    input = event.key;
    backgroundMusic.play();
    if (gameOver) {
        alert('The game is over.  Refresh the page to play again');
        return 0;
    }

    //keystroke not a letter? or not lowercase? ----> end///////////////////////
    if (input < 'a' || 'z' < input) {
        alert("guess a lowercase letter");
        return 0;
    }///////////////////////////////////////////////////////////////////////////
    
    //guessed already? ----> end***********************************************
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (input == lettersGuessed[i]) {
            alert("You already guessed that letter!");
            return 0;
        }
    }//************************************************************************
    
    //Does the letter exist in the word?
    var exists = false;
    if (currentWord.includes(input)) {
        /////if it's included, a bunch of stuff happens here.  if it is included, we need to know where so let's loop through currentWord, comparing each letter to input, and if we find it equals, assign input to display[i]
        for (var i = 0; i < currentWord.length; i++) {
            if (input == currentWord[i]) {
                display[i] = input;
            }
        }
    }else{
        guesses = guesses - 1;
    }
    lettersGuessed.push(input);
    //decrease guesses
    
    guessSound.play();
    //print everything back out to screen
    document.getElementById('guesses').innerHTML = guesses;
    document.getElementById('letters').innerHTML = lettersGuessed.join("  ").toUpperCase();
    document.getElementById('display').innerHTML = display.join(" ");


    //check to see if there are underscores and guesses left
    var underscores = display.join("").includes("_");
    if (underscores == true && guesses == 0) {
        loseSound.play();
        alert("You didn't get that one. It was " + currentWord.toUpperCase() + ".");
        losses = losses + 1;
        
        //update total
        total = wins + losses;
        //rewrite losses*************************************************???????????????***** need to put an element on page for losses
        if (total == words.length) {
            alert("The game is over.  Refresh the page to play again.");
            gameOver = true;
            return 0;
        }
        counter = counter + 1;
        currentWord = words[counter];
        currentWordLength = currentWord.length;

        //rewrite display and lettersGuessed arrays and guesses to 10**************************************************
        //display the word as _'s
        resetDisplay();
    } else if (underscores == false) {
        winSound.play();
        alert("You got that one!  It was " + currentWord.toUpperCase() + "!");
        wins = wins + 1;
        //update total
        total = wins + losses;
        //rewrite wins
        document.getElementById('wins').innerHTML = wins;
        if (total == words.length) {
            alert("The game is over.  Refresh the page to play again.");
            gameOver = true;
            return 0;
        }
        counter = counter + 1;
        currentWord = words[counter];
        currentWordLength = currentWord.length;

        //rewrite display and lettersGuessed arrays and guesses to 10**************************************************
        //display the word as _'s
        resetDisplay();
    }
    
}

