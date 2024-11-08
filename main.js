
const gameBoard = {
    board: ['', '', '', '', '', '', '', '', ''],
    winConditions: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ],
    winner: null,

    winnerCheck: function() {
        for (const condition of this.winConditions) {
            const [a, b, c] = condition;

            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
                console.log(`Winner: ${this.board[a]}`);
                return this.winner;
            }
        }
        console.log('No winner');
        return null;
    }
};

const players = {
    player1: null,
    player2: null,

    setUserName: function() {
        const player1Input = document.querySelector(".player1");
        const player2Input = document.querySelector(".player2");
        
        this.player1 = player1Input.value;
        this.player2 = player2Input.value;
    }
};

document.getElementById("submitNames").addEventListener("click", function() {
    players.setUserName();
    document.querySelector(".player1Display").textContent = `player1: ${players.player1}`;
    document.querySelector(".player2Display").textContent = `player2: ${players.player2}`;
})

const gameFlow = {
    gameOver: false,

    input: function() {
        let lastInput = "O";
        let allStringsEmpty = gameBoard.board.every(item => item == '')
        const cellElement = document.querySelectorAll(".cell");
        const reset = document.querySelector(".reset");

        reset.addEventListener('click', gameFlow.resetGame);
        
        if (allStringsEmpty) {
            cellElement.forEach(cell => {
            cell.addEventListener('click', function() {
                if(gameFlow.gameOver) return; // Stop input if game is over

                if (cell.textContent === '') { // Make sure cell is empty before changing it
                    if(lastInput === 'X') {
                        cell.textContent = "O";
                        lastInput = "O";
                    } else {
                        cell.textContent = "X";
                        lastInput = "X";
                    }

                    gameBoard.board = Array.from(cellElement).map(cell => cell.textContent); // map input to the board
                    gameFlow.tieCheck();
                }


            });
        })}
         
    },

    tieCheck: function() {
        let hasNoEmptyStrings = gameBoard.board.every(item => item !== '');
        let result = gameBoard.winnerCheck();

        if (result) {
          console.log("We have a winner");
          this.gameOver = true;
          displayController.displayWinner(gameBoard.winner);
        } else if (hasNoEmptyStrings && result === null) {
            console.log("tie");
            this.gameOver = true;
            displayController.displayWinner("It's a tie");
        } else {
            console.log("Game is ongoing")
        }
    },

    resetGame: function() {
        this.gameOver = false;
        gameBoard.board = ['', '', '', '', '', '', '', '',];

        const cellElement = document.querySelectorAll(".cell");
        cellElement.forEach(cell => cell.textContent = '');
    }
};


const displayController = {

   displayBoard: function() {
        const boardContainer = document.querySelector(".container")
        boardContainer.innerHTML = '';

        gameBoard.board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell; 
            cellElement.classList.add('cell'); 
            
            boardContainer.appendChild(cellElement);

        }); 
   },

   displayWinner: function(message) {
    const wrapper = document.querySelector(".wrapper")
    const winnerDisplay = document.createElement('div');
    winnerDisplay.classList.add("result");

    if (gameBoard.winner === null) {
        winnerDisplay.textContent = message;
    } else {
        winnerDisplay.textContent = `Winner: ${gameBoard.winner}`;
    }
    wrapper.prepend(winnerDisplay);
   }
};

displayController.displayBoard();
gameFlow.input();


