const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const playerone = 'x';
const playertwo = 'O';
let playerTurn = playerone;
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

cells.forEach(cell=>{
    cell.addEventListener('click',playGame,{once: true});
});

function playGame(e){
    e.target.innerHTML = playerTurn;
    if (checkwin(playerTurn)) {
        updatStatus('wins' + playerTurn);
        return endGame();
    }else if (checkDraw()) {
        updatStatus('draw');
        return endGame();
    }
    updatStatus(playerTurn);
    /*playerTurn == playerone ?  playerTurn = playertwo : playerTurn = playerone;(ceci c'est la meme chose que le if du bas */
    if (playerTurn == playerone) {
        playerTurn = playertwo;
    }else{
        playerTurn = playerone;
    }
}

function checkwin(playerTurn) {
    return winningPatterns.some(combination =>{
        return combination.every(index =>{
            return cells[index].innerHTML == playerTurn;    
        });
    });
}

function checkDraw() {
    return [...cells].every(cell =>{
        return cell.innerHTML == playerone || cell.innerHTML == playertwo;
    });
}

function updatStatus(status) {
    let statustext;

    switch (status) {
        case 'x':
            statustext = 'Au tour de joueur 2 (O) ';
            break;
        case 'O':
            statustext = 'Au tour de joueur 1 (x) ';
            break;
        case 'winsx':
            statustext = 'le joueur 1 (x) a gagne';
            break;
        case 'winsO':
            statustext = 'le joueur 2 (O) a gagne ';
            break;
        case 'draw':
            statustext = 'match null ';
            break;
    }

    gameStatus.innerHTML = statustext;
    endGameStatus.innerHTML = statustext;
}

function endGame() {
    setTimeout(() =>(document.getElementById('gameEnd').style.display = "block"), 500);
}

function reloadGame() { 
    window.location.reload()
}