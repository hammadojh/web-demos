// respond to play button 
// save players names 
// draw letters on the board 
// prevent duplicate cells input 
// switching turns 
// determain when someone wins
// terminate game when someone wins/draw
// reset the game 

// Variables 
const players = ["X", "O"]
let turn = 0

//respond to play button
document.querySelector('#settings button').addEventListener("click", function (event) {
    // player_1 = document.querySelector('#player_1').value
    // players[0] = player_1
    // player_2 = document.querySelector('#player_2').value
    // players[1] = player_2

    document.querySelectorAll("#settings input").forEach(function (v, i, p) {
        players[i] = v.value
    })
})

// add event listener
document.querySelector(".board").addEventListener("click", function (event) {
    cell = event.target

    // cell value
    if (cell.innerText == '') {
        cell.innerText = players[turn]
        turn = (turn + 1) % players.length

        //check winner
        checkwinner()

    }

    //label turn 
    turn_elemet = document.querySelector("#turn span")
    turn_elemet.innerText = players[turn]

});

function checkwinner() {
    // TODO:implement
    return false
}