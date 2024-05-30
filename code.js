const PLAYER_ONE_SYMBOL = 'X'
const PLAYER_TWO_SYMBOL = 'O'
const VS_AI = 1
const VS_FRIEND = 2

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
        this.mode = VS_AI
    }

    reset(){
        this.board = []
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
        let main = document.getElementById('main')
        main.innerHTML = ""
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
        main.appendChild(gameBoard)
    }

    handleCellClick(event) {
        if (this.mode == VS_FRIEND){
            this.executeMove(event.target.id)
        }
        else{
            if(this.executeMove(event.target.id))
                if (!this.checkEndGameCondition())
                    this.moveRandom()
        }
    }

    executeMove(index){
        if(this.board[index] == ""){
            this.board[index] = this.currentPlayer
            this.updateBoard(index);

            if (this.checkEndGameCondition()) {
                alert('Player' + this.currentPlayer + 'win the game') 
                // this.start()
            }

            this.currentPlayer = (this.currentPlayer == PLAYER_ONE_SYMBOL) ? PLAYER_TWO_SYMBOL : PLAYER_ONE_SYMBOL
            return true
        }
        return false
    }

    updateBoard(index){
        let gameBoard = document.getElementById('gameBoard')
        let cellElements = gameBoard.childNodes;

        let cellElement = cellElements[index]
        if (cellElement.innerText != this.board[index]){
            cellElement.innerText = this.board[index]
            if (cellElement.innerText == PLAYER_ONE_SYMBOL)
                cellElement.classList.add('xcolor')
            else 
                cellElement.classList.add('ocolor')
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

        if (this.board.every((e) => e!="")){
            alert('DRAW!')
            // this.start()
        }
        return false
    }

    changeMode(mode){
        if (mode != this.mode){
            this.mode = mode
            this.updateButton(mode)
            this.reset()
        }

    }

    updateButton(mode){
        btn1 = document.getElementById('btn1')
        btn2 = document.getElementById('btn2')
        if(mode == VS_AI){
            btn1.classList.add('active')
            btn2.classList.remove('active')
        }
        else{
            btn1.classList.remove('active')
            btn2.classList.add('active')
        }
    }
    
    moveRandom(){
        let list = []
        this.board.forEach((e, index) => {if (e == "") list.push(index)})
        console.log(list)
        let rand_index = ~~(Math.random()*list.length)
        console.log(rand_index)

        this.executeMove(list[rand_index])
    }
}

const game = new TicTacToeGame()
game.start()

btn1 = document.getElementById('btn1')
btn2 = document.getElementById('btn2')
btn1.addEventListener('click', () => game.changeMode(VS_AI))
btn2.addEventListener('click', () => game.changeMode(VS_FRIEND))
