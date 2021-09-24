const countries = ['alemania', 'belgica', 'españa', 'francia', 'congo', 'sudafrica', 'argentina', 'peru', 'cuba', 'egipto', 'indonesia', 'australia', 'canada', 'colombia', 'italia', 'malta', 'turquia', 'portugal', 'grecia', 'mexico'];

let country = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    country = countries[Math.floor(Math.random() * countries.length)];
}

document.getElementById('maxWrong').innerHTML = maxWrong;

function generateButtons() {
    let buttonLetters = 'abcdefghijklmnñopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="buttonLetters"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonLetters;
  }

function guessedWord() {
    wordStatus = country.split('')
    .map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_ " )).join('');

    document.getElementById('output').innerHTML = wordStatus;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled',true);

    if (country.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkGameWon();    
    } else if (country.indexOf(chosenLetter) === -1){
        mistakes++;
        updateMistakes();
        checkGameLost();
    }
}

function checkGameWon() {
    if (wordStatus === country){
        document.getElementById('keyboard').innerHTML = `<h3 class="win">`+'Has ganado'+`</h3>`;
    }
}

function checkGameLost() {
    if (wordStatus != country && mistakes === maxWrong){
        document.getElementById('keyboard').innerHTML = `<h3 class="gameOver">`+ "GAME OVER" +`</h3>`;
        document.getElementById('output').innerHTML = `<h3>La respuesta era: ` + country.toUpperCase() + `</h3>`;
        setTimeout(gameOver, 1000);
    }    
}

function gameOver(){
    document.getElementById('hangmanPic').src = './img/HG_7.png';
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
    document.getElementById('hangmanPic').src = './img/HG_'+mistakes+'.png';
}

function resetGame() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').innerHTML = './img/HG_0.png';

    randomWord();
    guessedWord();
    generateButtons();
    updateMistakes();
}


randomWord();
generateButtons();
guessedWord();
