
const gameBoard = {
    board: ['O', 'O', 'X', 'X', 'X', 'X', 'X', 'X', '0'],
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
        let result = gameBoard.winnerCheck();

        if (hasNoEmptyStrings && result === null) {
            console.log("tie");
        } else if (hasNoEmptyStrings) {
            console.log("No empty strings");
        } else {
            console.log("Game is ongoing")
        }
    }
};

console.log(gameBoard.board);

gameFlow.tieCheck();
