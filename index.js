//Alle constante elementen uit de htlm file met de combinaties die gemaakt om te winnen. 
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Array om de staat van elke cel bij te houden
let options = ["", "", "", "", "", "", "", "", ""];
// Current player ("X" begint)
let currentPlayer = "X";
// Variabele die aangeeft of het spel actief is of niet
let running = true;

initializeGame();

// Functie voor het initialiseren van het spel, hoe wordt het gespeeld
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer} is aan de beurt`;
    running = true;
}

// Event handler voor het klikken op een cel
function cellClicked(){
    const cellIndex = this.getAttribute("data-cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

// Functie voor het bijwerken van een cel met de huidige speler
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    changePlayer();
}

// Functie voor het wisselen van de huidige speler
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} is aan de beurt`;
}

// Functie voor het controleren op een winnaar of gelijkspel (online gezocht voor hulp) (if, else uit de les opdrachten)
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == currentPlayer && cellB == currentPlayer && cellC == currentPlayer){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} Heeft gewonnen!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Gelijk spel!`;
        running = false;
    }
}

// Functie voor het opnieuw starten van het spel
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer} is aan de beurt`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}



