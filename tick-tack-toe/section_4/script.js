// Varaibles 

const players = ["X", "O"]
let turn = 0

// listen to board clicks
let board = document.querySelector(".board")

// Respond to cell clicks 
board.addEventListener("click", function (e) {

    // get the target element
    const cell = e.target

    // check if there is a letter or not 
    if (cell.innerText == '') {
        cell.innerText = players[turn]
        turn = (turn + 1) % players.length
        document.querySelector("#turn span").innerText = players[turn]
        checkWinningState();
    }
})

// Respond to Play button
document.querySelector("#settings button").addEventListener("click", function (e) {

    // read input values
    document.querySelectorAll("#settings input").forEach(function (element, i, parent) {
        players[i] = element.value
    })

    // change turn label
    document.querySelector("#turn span").innerText = players[turn]
})

function checkWinningState() {
    // TODO:check winning
    cells = document.querySelectorAll(".cell")
    cells.forEach(function (e, i) {})
    return false
}