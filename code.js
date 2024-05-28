const PLAYER_ONE_SYMBOL = 'X'
const PLAYER_TWO_SYMBOL = 'O'

class TicTacToeGame{
    start(){
        // create an empty board
        this.board = [];
        var n = 9
        while (n--){
            this.board[n] = ""
        }
        // draw the board to the DOM
        this.drawBoard()
        // 
        this.currentPlayer = PLAYER_ONE_SYMBOL
    }

    drawBoard(){
        document.body.innerHTML = ""
        let gameBoard = document.createElement("div")
        gameBoard.id = 'gameBoard'
        gameBoard.classList.add('board')
        let myListener = this.handleCellClick.bind(this)
        gameBoard.addEventListener('click', myListener)

        this.board.forEach((cell, index) => {
            let cellElement = document.createElement("div")
            cellElement.id = index;
            cellElement.classList.add('square')
            gameBoard.appendChild(cellElement)

        })
        document.body.appendChild(gameBoard)
    }

    handleCellClick(event) {
        this.executeMove(event.target.id)
    }

    executeMove(index){
        if(this.board[index] == ""){
            this.board[index] = this.currentPlayer
            this.updateBoard(index);

            if (this.checkEndGameCondition()) {
                alert('Player' + this.currentPlayer + 'win the game') 
                this.start()
            }

            this.currentPlayer = (this.currentPlayer == PLAYER_ONE_SYMBOL) ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL

        }
        
    }

    updateBoard(index){
        let gameBoard = document.getElementById('gameBoard')
        let cellElements = gameBoard.childNodes;

        let cellElement = cellElements[index]
        if (cellElement.innerText != this.board[index]){
            cellElement.innerText = this.board[index]
        }
    }

    checkEndGameCondition(){
        // check columns
        for (let i = 0; i<3; i++){
            if(this.board[i] != ""){
                if ((this.board[i] == this.board[i+3]) 
                    && (this.board[i+6] == this.board[i])) 
                        return true
            }
        }
        // check rows
        for (let i = 0; i<7; i += 3){
            if(this.board[i]!=""){
                if ((this.board[i] == this.board[i+1]) 
                    && (this.board[i] == this.board[i+2])) 
                        return true
            }
        }
        // check diagonal
        if (this.board[0] != ""){
            if ((this.board[0] == this.board[4])&&(this.board[0]==this.board[8] ))
                return true
        } 

        if (this.board[2] != ""){
            if ((this.board[2] == this.board[4])&&(this.board[2]==this.board[6] ))
                return true
        } 

        return false
    }
}

const game = new TicTacToeGame()
game.start()