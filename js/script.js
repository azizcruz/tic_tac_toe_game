var _c = 0; // Keeps track of the computers turn.
var _playerTurn = "X"; // Default player turn.
var _cupTurn = "O"; // Default computer turn.
var _turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"]; // Array to store the value to check later for a winner.
var _gameOn = true; // Keeps track of the game and players turn.

$(document).ready(function () {

    // Change player turn to X and computer to O.
    $("#turnX").on("click", function () {
        _playerTurn = "X";
        _cupTurn = "O";
        $("#turnX").addClass("taken");
        $("#turnO").removeClass("taken");
        $("#turnO").attr("disabled", "disabled");
    })

    $("#turnO").on("click", function () {
        _playerTurn = "O";
        _cupTurn = "X";
        $("#turnO").addClass("taken");
        $("#turnX").removeClass("taken");
        $("#turnX").attr("disabled", "disabled");
    })


    // Change the chosen cell to X or O.
    function playerTurn(turn, id) {
        var _cellTaken = $("#" + id).text();
        if (_cellTaken === "#") {
            _c++;
            _turns[id] = _playerTurn;
            $("#" + id).text(turn);
        }
        winCondition(_playerTurn, _turns, "player");
        if (_gameOn) {
            computersTurn();
            winCondition(_cupTurn, _turns, "computer");
        }
    }


    // What happens when you click a cell.
    $(".cell").on("click", function () {
        var _cellSlot = $(this).attr("id");
        playerTurn(_playerTurn, _cellSlot);
    })
})

// Reset the game.
function reset() {
    _turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
    $(".cell").text("#");
    _playerTurn = "X"; // Default player turn.
    _cupTurn = "O"; // Default computer turn.
    _gameOn = true;
    $(".cell").css("background-color", "#777");
    $("#reset").hide();
    $("#winner").text("Who wins ?");
}

// Computers turn.
function computersTurn() {
    var taken = false; // Used to break the loop. 
    while (taken === false && _c !== 5) {
        // Generate computers random turn.
        var computerMove = (Math.random() * 10).toFixed();
        var move = $("#" + computerMove).text();
        if (move === "#") {
            $("#" + computerMove).text(_cupTurn);
            taken = true;
            _turns[computerMove] = _cupTurn;
        }
    }
}

// Check If Draw.
function checkIfDraw(turns) {
    var count = 0;
    for (var i = 0; i < 9; i++) {
        if (_turns[i] === "#") {
            count++;
        }
    }

    if (count === 0) {
        alert("Game is draw");
        reset();
    }
}

// Reset game when reset is clicked.
$("#reset").on("click", function () {
    reset();
});

// Show Reset.
function showReset() {
    $("#reset").show();
}

// Check the conditions when the player wins.
//  0   1   2
//  3   4   5
//  6   7   8
//
function winCondition(_playerTurn, _turns, player) {
    if (_turns[0] === _playerTurn && _turns[1] === _playerTurn && _turns[2] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#0, #1, #2").css("background-color", "green");
        showReset();
    } else if (_turns[3] === _playerTurn && _turns[4] === _playerTurn && _turns[5] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#3, #4, #5").css("background-color", "green");
        showReset();
    } else if (_turns[6] === _playerTurn && _turns[7] === _playerTurn && _turns[8] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#6, #7, #8").css("background-color", "green");
        showReset();
    } else if (_turns[0] === _playerTurn && _turns[3] === _playerTurn && _turns[6] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#0, #3, #6").css("background-color", "green");
        showReset();
    } else if (_turns[1] === _playerTurn && _turns[4] === _playerTurn && _turns[7] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#1, #4, #7").css("background-color", "green");
        showReset();
    } else if (_turns[2] === _playerTurn && _turns[5] === _playerTurn && _turns[8] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#2, #5, #8").css("background-color", "green");
        showReset();
    } else if (_turns[0] === _playerTurn && _turns[4] === _playerTurn && _turns[8] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#0, #4, #8").css("background-color", "green");
        showReset();
    } else if (_turns[2] === _playerTurn && _turns[4] === _playerTurn && _turns[6] === _playerTurn) {
        _gameOn = false;
        $("#winner").text(player + " wins");
        $("#2, #4, #6").css("background-color", "green");
        showReset();
    } else {
        _gameOn = true;
        checkIfDraw(_turns);
    }
}
