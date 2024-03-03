// Constanst: players 
const players = ["X", "O"]

// Variables: turn, winner, model
let turn = 0; // let vs var vs const 
let winner = null;

// Listen for clickin on the board
document.querySelector('.board').addEventListener('click', function (event) {
    // Respond to click event
    handleClick(event.target);
    // Change title
    changeTitle();
    // Check winner
    checkWinner();
})

// Functions: setup game, handleClick, checkWinner, changeTurn, changeTitle

function setup() {

    // change names 
    const player_1 = document.querySelector('#player_1').value
    const player_2 = document.querySelector('#player_2').value
    players[0] = player_1
    players[1] = player_2

    // clear the board
    document.querySelectorAll('.cell').forEach(function (e, k, p) {
        e.innerText = ''
    })

}


function handleClick(cell) {
    if (cell.innerText == '') {
        cell.innerText = players[turn];
        changeTurn();
    }
}

function changeTurn() {
    turn = (turn + 1) % players.length;
}

function changeTitle() {
    if (winner) {
        document.querySelector('#title').innerHTML = `${winner} wins!`;
    } else {
        document.querySelector('#turn').innerHTML = `${players[turn]}`;
    }
}

function checkWinner() {
    // TODO:Implement
    return false
}