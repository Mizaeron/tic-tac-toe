
const gameBoard = {
    board: ['O', 'O', 'X', 'X', 'O', '', 'X', 'X', '0'],
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

const players = {

};

const gameFlow = {
    firstInput: function(index, remove, item) {
        gameBoard.board.splice(index, remove, item);
    },

    tieCheck: function() {
        let hasNoEmptyStrings = gameBoard.board.every(item => item !== '');

        return hasNoEmptyStrings ? (console.log("It's a tie"), true) : (console.log("Game is ongoing"), false);
    }
};

console.log(gameBoard.board);

gameBoard.winnerCheck();
gameFlow.tieCheck();
