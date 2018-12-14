
var guesses = 10;
var wins = 0;
var losses = 0;
var total = wins + losses;
var gameOver = false;

var words = ["fleetwood mac", "cat", "mouse", "moose"];             //must be all lowercase
var counter = 0;
var currentWord = words[counter];

var display = [];
var input;
var currentWordLength = currentWord.length;
var lettersGuessed = [];
document.addEventListener("keydown", guess);

document.getElementById('guesses').innerHTML = guesses;             //write guesses to document to start

//display the word as _'s
for (var i = 0; i < currentWordLength; i++) {
    if (currentWord[i] == ' ') {
        display.push("&nbsp;");
    } else {
        display.push("_");
    }
}
document.getElementById("display").innerHTML = display.join(" ");
//display the word as _'s




////*********************************************************************************************////////
function guess() {
    input = event.key;
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
    }
    lettersGuessed.push(input);
    //decrease guesses
    guesses = guesses - 1;
    //print everything back out to screen
    document.getElementById('guesses').innerHTML = guesses;
    document.getElementById('letters').innerHTML = lettersGuessed;
    document.getElementById('display').innerHTML = display.join(" ");


    //check to see if there are underscores and guesses left
    var underscores = display.join("").includes("_");
    if (underscores == true && guesses == 0) {
        alert("You didn't get that one.");
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
    } else if (underscores == false) {
        alert("You got that one!");
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
}
