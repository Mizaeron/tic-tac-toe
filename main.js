
const gameBoard = {
    board: ['', '', '', '', '', '', '', '', ''],
    winConditions: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ],
    winnerCheck: function() {
        for (const condition of this.winConditions) {
            const [a, b, c] = condition;

            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                console.log(`Winner: ${this.board[a]}`);
                return this.board[a];
            }
        }
        console.log('No winner');
        return null;
    }

};

gameBoard.winnerCheck();

const players = {

};

const gameFlow = {
    firstInput: function() {
        gameBoard.board.splice(3, 0, "X");
    }
};

gameFlow.firstInput();