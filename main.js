
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

};

const gameFlow = {
    gameOver: false,

    input: function() {
        let lastInput = "O";
        let allStringsEmpty = gameBoard.board.every(item => item == '')
        const cellElement = document.querySelectorAll(".cell");
        
        if (allStringsEmpty) {
            cellElement.forEach(cell => {
            cell.addEventListener('click', function() {
                if(gameFlow.gameOver) return;

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